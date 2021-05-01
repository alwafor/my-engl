import { randomTo } from './../utils/randoms';
import { Word } from "./../entity/Word";
import { getConnection } from "typeorm";
interface IGetWord {
   word: string;
}
interface IGetRandomWords {
   count: number
}
interface IGetWordsCount {
   count: number
}
///WITH SINGLE CONNECTION
export const getWord = async (data: IGetWord) => {
   const connection = getConnection();
   const wordRepo = connection.getRepository(Word);
   const result = await wordRepo.find({ where: { word: data.word } });
   await connection.close();
   if (!result.length) throw new Error("This word doesn't exists!");
   return result[0];
};
export const getRandomWords = async (data: IGetRandomWords) => {
   const connection = getConnection();
   // const words = await connection.manager.createQueryBuilder(Word, 'word').limit(data.count).leftJoinAndSelect("word.translations", "translation").getMany();
   let words = await connection.manager.createQueryBuilder(Word,'word').innerJoinAndSelect('word.translations','translations').getMany();
   const randomWordsIndicies = randomTo(data.count, words.length);
   if(!randomWordsIndicies.length) throw new Error("Error! Count of words and capacity are wrong!");
   console.log("WORDS:",words)
   words = words.filter((item,i) => randomWordsIndicies.includes(i));
   console.log(randomWordsIndicies,words)
   return words;
};
export const getWordsCount = async (data: IGetWordsCount) => {
   const connection = getConnection();
   const wordsRepo = await connection.getRepository(Word);
   const allWords = await wordsRepo.find();
   return allWords.length;
}
export const getAllWords = async () => {
   const connection = getConnection();
   const wordsRepo = await connection.getRepository(Word);
   const allWords = await wordsRepo.createQueryBuilder("words").leftJoinAndSelect("words.translations", "translation").getMany();
   // console.log(allWords);
   return allWords
}