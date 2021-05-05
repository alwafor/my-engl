import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { useKey } from "../../common/Utils/customHooks";
import SingleWord from "./SingleWord";

interface Props {
   setIsWordSelectorOpened: Function;
   setChoosedWordsIds: Function;
   allWords: any;
   choosedWordsIds: Array<number>;
}

export default function WordsSelector({
   setIsWordSelectorOpened,
   allWords,
   setChoosedWordsIds,
   choosedWordsIds,
}: Props): ReactElement {
   const handleEscape = () => {
      setIsWordSelectorOpened(false);
   };
   useKey("Escape", handleEscape);

   const toggleWordId = useCallback((id: number) => {
      if (!choosedWordsIds.includes(id)) {
         setChoosedWordsIds((prevState: any) => [...prevState, id]);
      } else {
         setChoosedWordsIds(choosedWordsIds.filter((inId) => inId !== id));
      }
   }, []);

   console.log("Choosed words ids: ", choosedWordsIds);
   return (
      <div className="words_selector_wrapper">
         <div className="words_selector">
            <div className="words_selector_title">
               Выберите слова, которые попадут в словарь:
            </div>
            <div className="words_wrapper">
               {allWords.map((item: any) => {
                  return (
                     <SingleWord
                        toggleWordId={toggleWordId}
                        key={item.id}
                        word={item.word}
                        id={+item.id}
                     />
                  );
               })}
            </div>
            <button
               className="btn_words_selector_confirm"
               onClick={handleEscape}
            >
               Подтвердить
            </button>
         </div>
      </div>
   );
}
