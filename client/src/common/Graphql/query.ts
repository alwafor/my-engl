import { gql } from '@apollo/client';
export const GET_RANDOM_WORDS = gql`
   query GetWords($count: Int!){
      getRandomWords(count: $count) {
         word,
         translations {
           word
         }
       }
   }
`;
export const GET_WORDS_COUNT = gql`
   query {
      getWordsCount
   }
`;
export const GET_ALL_WORDS = gql`
   query {
      getAllWords {
         word,
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
   query{
      getAllDictionaries {
         id,
         name,
         difficulty,
         choosed,
         wordsCount
      }
   }
`;