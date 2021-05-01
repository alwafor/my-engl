import { useQuery, useLazyQuery } from "@apollo/client";
import React, { ReactElement, useState } from "react";
import { GET_RANDOM_WORDS } from "../../common/Graphql/query";
import { Words } from "../../common/Types/types";
import OneWord from "./OneWord";

export default function WordsWrapper({ getRandomWords }: Words): ReactElement {
   const [checkAllWords, setCheckAllWords] = useState(false);
   console.log(getRandomWords);
   if (getRandomWords && !getRandomWords!.length) return <></>;

   return (
      <>
         <div className="words_wrapper">
            {getRandomWords?.map((item) => {
               return (
                  <OneWord
                     key={item.word}
                     word={{ word: item.word, translations: item.translations }}
                     check={checkAllWords}
                  />
               );
            })}
         </div>
         {getRandomWords ? (
            <button
               className="btn_enter_all"
               onClick={() => setCheckAllWords(true)}
            >
               Ввести все
            </button>
         ) : (
            ""
         )}
      </>
   );
}
