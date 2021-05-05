import { gql } from "@apollo/client";
export const GET_RANDOM_WORDS = gql`
   query GetWords($count: Int!) {
      getRandomWords(count: $count) {
         word
         translations {
            word
         }
      }
   }
`;
export const GET_WORDS_FROM_SELECTED_DICTS = gql`
   query GetWords($count: Int!) {
      getWordsFromSelectedDicts(count: $count) {
         word
         translations {
            word
         }
      }
   }
`;
export const GET_ALL_WORDS_COUNT = gql`
   query {
      getWordsCount
   }
`;
export const GET_WORDS_COUNT_FROM_SELECTED_DICTS = gql`
   query {
      getDictsWordsCount
   }
`;

export const GET_ALL_WORDS = gql`
   query {
      getAllWords {
         word
         translations {
            word
         }
      }
   }
`;
export const GET_ALL_WORDS_WITHOUT_TRANS = gql`
   query {
      getAllWords {
         word
      }
   }
`;
export const GET_ALL_WORDS_ID_NOTRANS = gql`
   query {
      getAllWords {
         id
         word
      }
   }
`;
export const GET_ALL_DICTIONARIES = gql`
   query {
      getAllDictionaries {
         id
         name
         difficulty
         choosed
         wordsCount
      }
   }
`;
export const GET_WORDS_COUNT = gql`
   query {
      getWordsCount
   }
`;
export const GET_WORDS = gql`
   query GET($type: String!, $count: Int!){
      getWords(type: $type, count: $count) {
         word,
         translations {
            word
         }
      }
   }
`;