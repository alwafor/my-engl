import { getConnection } from "typeorm";
import { Word } from "./../entity/Word";
import { Translation } from "./../entity/Translation";
import { Dictionary } from "../entity/Dictionary";

interface IAddWord {
   word: string;
   translation: string;
}
interface IAddWords {
   words: string;
}
interface IAddDictionary {
   name: string
}
//ДОБАВЛЕНИЕ СЛОВА В БАЗУ ДАННЫХ
export const addWord = async (data: IAddWord) => {
   const connection = getConnection();
   const translations: string[] = data.translation
      .split(",")
      .map((item) => item.trim().toLowerCase());

   //Проверка, существует ли данное слово в базе
   const wordsRepo = connection.getRepository(Word);
   const wordCheck = await wordsRepo.find({ where: { word: data.word } });
   if (wordCheck.length) throw new Error("This word is already exists!");

   //Если такого слова нет, формируем его
   let word = new Word();
   word.word = data.word;
   word.translations = [];

   //Проверка на существование похожих переводов
   const translationsRepo = connection.getRepository(Translation);
   for (let i = 0; i < translations.length; ++i) {
      const translation = await translationsRepo
         .createQueryBuilder("translation")
         .select()
         .where("translation.word = :trans_word", {
            trans_word: translations[i],
         })
         .getOne();
      //Если перевод существует, даём перевод слову
      if (translation) {
         word.translations.push(translation);
      }
      //Иначе создаём этот перевод и даём слову
      else {
         const newTranslation = translationsRepo.create();
         newTranslation.word = translations[i];
         word.translations.push(newTranslation);
         await translationsRepo.save(newTranslation);
      }
   }
   wordsRepo.save(word);

   return "Okay!";
};
//ДОБАВЛЕНИЕ НЕСКОЛЬКИХ СЛОВ В БАЗУ ДАННЫХ
export const addWords = async (data: IAddWords) => {
   const connection = getConnection();
   const wordsRepo = connection.getRepository(Word);
   const translationsRepo = connection.getRepository(Translation);
   let allWordsString = data.words;
   //Формируем массивы слов и переводов
   let words = [],
      translations: string[][] = [];

   allWordsString
      .split("\n")
      .map((item) => item.trim())
      .map((item) =>
         item
            .split("-")
            .map((item2) => item2.trim())
            .forEach((item, i) => {
               if (i % 2 == 0) {
                  words.push(item);
                  return;
               }
               translations.push(item.split(",").map((item2) => item2.trim().toLowerCase()));
            })
      );
   //Формируем объект, ключи которого - слова, а значения - массив переводов
   const allWords: Record<string, string[]> = {};
   words.forEach((item, i) => {
      allWords[item] = translations[i];
   });
   //Идём циклом по всем словам и их переводам
   Object.entries(allWords).forEach(async ([word, trans]) => {
      //Если слово существует, далее работаем с ним. Иначе создаём новое слово.
      let wordObj = await wordsRepo.findOne({ where: { word: word } });
      if (!wordObj) {
         const newWord = wordsRepo.create({ word: word });
         wordObj = newWord;
      }

      //Проверяем, существуют ли переводы этого слова. Если есть, присваиваем их слову. Если нет, создаём, затем присваиваем.
      wordObj.translations = wordObj.translations ? wordObj.translations : [];
      for (const item of trans) {
         const transObj = await translationsRepo.findOne({
            where: { word: item },
         });
         if (transObj) {
            wordObj.translations.push(transObj);
         } else {
            const newTranslation = translationsRepo.create({ word: item });
            await translationsRepo.save(newTranslation);
            wordObj.translations.push(newTranslation);
         }
      }

      //Сохраняем слово
      await wordsRepo.save(wordObj);
   });
   return "Okay!";
};
//СОЗДАНИЕ НОВОГО СЛОВАРЯ
export const addDictionary = async(data:IAddDictionary) => {
   const connection = getConnection();
   const manager = connection.manager;
   const newDict = await manager.create(Dictionary,{name:data.name});
   await manager.save(newDict);
   return `Dictionary with name ${newDict.name} was successfully saved!`
}
