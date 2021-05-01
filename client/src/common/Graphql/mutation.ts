import { gql } from "@apollo/client";
export const ADD_WORD = gql`
   mutation A($word: String!, $translation: String!) {
      addWord(word: $word, translation: $translation)
   }
`;
export const ADD_WORDS = gql`
   mutation ADD($words: String!) {
      addWords(words: $words)
   }
`;
export const ADD_DICT = gql`
   mutation ADD($wordsIds: [Int!]!, $name: String!, $difficulty: Int!) {
      addDictionary(wordsIds: $wordsIds, name: $name, difficulty: $difficulty)
   }
`;
export const TOGGLE_DICT = gql`
   mutation TOGGLE($id: ID!, $state: Boolean!) {
      toggleDictionary(id: $id, state: $state)
}
`;
