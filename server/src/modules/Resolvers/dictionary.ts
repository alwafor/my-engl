import { Word } from "./../../entity/Word";
import { Arg, Int, Mutation, Resolver, ID, Query } from "type-graphql";
import { Dictionary } from "../../entity/Dictionary";

@Resolver()
export class DictionaryResolver {
   @Query(() => [Dictionary])
   async getAllDictionaries(): Promise<Dictionary[]> {
      return await Dictionary.find({});
   }

   @Mutation(() => Boolean)
   async addDictionary(
      @Arg("name") name: string,
      @Arg("wordsIds", (type) => [Int]) wordsIds: number[],
      @Arg("difficulty", (type) => Int) difficulty: number
   ): Promise<Boolean> {
      //Find words that matches ids
      const foundWords: Word[] = [];
      for (let id of wordsIds) {
         const foundWord = await Word.findOne({ where: { id } });
         console.log("FOUND WORD NAME: ", foundWord.word);
         foundWords.push(foundWord);
      }
      const newDict = await Dictionary.create({
         name,
         difficulty,
         choosed: false,
         wordsCount: wordsIds.length,
      });
      newDict.words = Promise.resolve(foundWords);
      await newDict.save();
      return true;
   }

   @Mutation(() => Boolean)
   async toggleDictionary(
      @Arg("id", (type) => ID) id: number,
      @Arg("state") state: Boolean
   ): Promise<Boolean> {
      const foundDict = await Dictionary.findOne({ where: { id } });
      foundDict.choosed = state;
      await Dictionary.save(foundDict);
      return true;
   }
}
