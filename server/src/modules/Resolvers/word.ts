import { randomTo } from "../../utils/randoms";
import { Word } from "../../entity/Word";
import {
   Arg,
   Field,
   InputType,
   Query,
   Resolver,
   Int,
   Mutation,
} from "type-graphql";
import { getManager } from "typeorm";
import { Translation } from "../../entity/Translation";

@Resolver()
export class WordResolver {
   @Query(() => Word, { nullable: true })
   async getWord(@Arg("word") word: string): Promise<Word | undefined> {
      const foundWord = await Word.findOne({ where: { word } });
      if (!foundWord) return undefined;
      return foundWord;
   }

   @Query(() => [Word])
   async getRandomWords(@Arg("count", (type) => Int) count): Promise<Word[]> {
      let words = await Word.createQueryBuilder("word")
         .innerJoinAndSelect("word.translations", "translations")
         .getMany();
      console.log(words);
      const randomWordsIndicies = randomTo(count, words.length);
      if (!randomWordsIndicies.length)
         throw new Error("Error! Count of words and capacity are wrong!");
      console.log("WORDS:", words);
      words = words.filter((item, i) => randomWordsIndicies.includes(i));
      console.log(randomWordsIndicies, words);
      return words;
   }

   @Query(() => Int)
   async getWordsCount(): Promise<number> {
      return (await Word.find({})).length;
   }

   @Query(() => [Word])
   async getAllWords(): Promise<Word[]> {
      return await Word.createQueryBuilder("word")
         .leftJoinAndSelect("word.translations", "translation")
         .getMany();
   }

   @Mutation(() => Boolean)
   async addWord(
      @Arg("word") word: string,
      @Arg("translation") translation: string
   ): Promise<Boolean> {
      try {
         const translations: string[] = translation
            .split(",")
            .map((item) => item.trim().toLowerCase());

         //Проверка, существует ли данное слово в базе
         const wordCheck = await Word.find({ where: { word } });
         if (wordCheck.length) throw new Error("This word is already exists!");

         //Если такого слова нет, формируем его
         let newWord = new Word();
         newWord.word = word.toLowerCase();
         newWord.translations = [];

         //Проверка на существование похожих переводов
         for (let i = 0; i < translations.length; ++i) {
            const translation = await Translation.createQueryBuilder(
               "translation"
            )
               .select()
               .where("translation.word = :trans_word", {
                  trans_word: translations[i],
               })
               .getOne();
            //Если перевод существует, даём перевод слову
            if (translation) {
               newWord.translations.push(translation);
            }
            //Иначе создаём этот перевод и даём слову
            else {
               const newTranslation = Translation.create({
                  word: translations[i],
               });
               newWord.translations.push(newTranslation);
               await Translation.save(newTranslation);
            }
         }
         Word.save(newWord);
      } catch (e) {
         console.log(e);
         return false;
      }
      return true;
   }

   @Mutation(() => Boolean)
   async addWords(@Arg("words") words: string): Promise<Boolean> {
      try {
         let allWordsString = words;
         //Формируем массивы слов и переводов
         let wordsToAdd = [],
            translations: string[][] = [];

         allWordsString
            .split("\n")
            .map((item) => item.trim())
            .map((item) =>
               item
                  .split("-")
                  .map((item2) => item2.trim().toLowerCase())
                  .forEach((item, i) => {
                     if (i % 2 == 0) {
                        wordsToAdd.push(item);
                        return;
                     }
                     const transWords = item
                        .split(",")
                        .map((item2) => item2.trim());
                     const transWordsWithoutRepeat = [];
                     for(let i = 0; i < transWords.length; ++i) {
                        if(!transWordsWithoutRepeat.includes(transWords[i]))
                           transWordsWithoutRepeat.push(transWords[i]);
                     }
                     console.log("TRANSLATIONS: ", transWordsWithoutRepeat);
                     translations.push(transWordsWithoutRepeat);
                  })
            );
         //Формируем объект, ключи которого - слова, а значения - массив переводов
         const allWords: Record<string, string[]> = {};
         wordsToAdd.forEach((item, i) => {
            allWords[item] = translations[i];
         });
         //Идём циклом по всем словам и их переводам
         Object.entries(allWords).forEach(async ([word, trans]) => {
            //Если слово существует, далее работаем с ним. Иначе создаём новое слово.
            let wordObj = await Word.findOne({ where: { word: word } });
            if (!wordObj) {
               const newWord = Word.create({ word: word });
               wordObj = newWord;
            }

            //Проверяем, существуют ли переводы этого слова. Если есть, присваиваем их слову. Если нет, создаём, затем присваиваем.
            wordObj.translations = wordObj.translations
               ? wordObj.translations
               : [];
            for (const item of trans) {
               const transObj = await Translation.findOne({
                  where: { word: item },
               });
               if (transObj) {
                  wordObj.translations.push(transObj);
               } else {
                  const newTranslation = Translation.create({ word: item });
                  await Translation.save(newTranslation);
                  wordObj.translations.push(newTranslation);
               }
            }

            //Сохраняем слово
            await Word.save(wordObj);
         });
      } catch (e) {
         console.log("ERROR: ", e);
         return false;
      }

      return true;
   }
}
