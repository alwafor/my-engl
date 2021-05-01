import { buildSchema } from 'graphql';
export const schema = buildSchema(`
   type Query {
      getWord(word: String): Word,
      getWordsInfo: String
      getRandomWords(count: Int): [Word]
      getWordsCount: Int
      getAllWords: [Word]
   }
   type Mutation {
      addWord(word: String, translation: String) : String
      addWords(words: String): String
      addDictionary(name: String) : String
   }
   type Word {
      word: String,
      translations: [Translation]
   }
   type Translation {
      id: Int,
      word: String
   }
`);