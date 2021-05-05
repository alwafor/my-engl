import { useLazyQuery, useQuery } from "@apollo/client";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { GET_RANDOM_WORDS, GET_WORDS, GET_WORDS_COUNT } from "../../common/Graphql/query";
import { Words } from "../../common/Types/types";
import WordsWrapper from "./WordsWrapper";

interface Props {}

const ALL_WORDS = "Все слова",
   DICT_WORDS = "Слова из выбранных словарей";

type TWordsMode = typeof ALL_WORDS | typeof DICT_WORDS;

export default function RandWords({}: Props): ReactElement {
   const {
      loading: loading1,
      error: error1,
      data: wordsCount,
      refetch: refetchCount,
   } = useQuery(GET_WORDS_COUNT, { fetchPolicy: "no-cache" });
   const [selectMode, setSelectMode] = useState<TWordsMode>(ALL_WORDS);

   const [counter, setCounter] = useState(1);
   const [notificationText, setNotificationText] = useState("");
   let [doQuery, { loading, error, data }] = useLazyQuery<Words>(
      GET_WORDS,
      { fetchPolicy: "no-cache" }
   );
   if (loading || loading1) return <></>;
   if (error1) {
      console.log(error1);
      return <div>Error1!</div>;
   }

   console.log("WORDS COUNT: ", wordsCount);
   const getData = () => {
      console.log(counter);
      data = undefined;
      doQuery({ variables: { type: selectMode, count: counter } });
   };

   const changeCounter = (e: any) => {
      let inputNumber = +e.target.value;
      let words_count: number;
      if (selectMode === ALL_WORDS) {
         words_count = wordsCount.getWordsCount[0];
      } else {
         words_count = wordsCount.getWordsCount[1];
      }

      if (inputNumber > words_count) {
         setCounter(words_count);
         showNotification(
            "Ошибка! Вы выбрали максимальное количество доступных слов!"
         );
      } else if (inputNumber < 1) {
         setCounter(1);
         showNotification("Ошибка! Нельзя выбрать меньше одного слова!");
      } else {
         setCounter(inputNumber);
      }
   };

   const showNotification = (text: string) => {
      setNotificationText(text);
      setTimeout(() => setNotificationText(""), 3000);
   };

   const changeChooseMode = (e: any) => {
      setSelectMode(e.target.value);
      setCounter(1);
   };

   console.log("DATA: ", data);

   return (
      <div className="main_randWords">
         <h2 className="title">Случайные английские слова</h2>
         <div className="title_desc">
            Вы можете задать количество слов из вашего словаря, которые будут
            выбраны случайно. Вам необходимо будет перевести каждое слово.
         </div>
         <div className="hint">Режим подбора слов:</div>
         <select value={selectMode} onChange={changeChooseMode}>
            <option value={ALL_WORDS}>{ALL_WORDS}</option>
            <option value={DICT_WORDS}>{DICT_WORDS}</option>
         </select>
         <div className="hint">Кол-во слов:</div>
         <div className="count_picker">
            <input type="number" value={counter} onChange={changeCounter} />
         </div>
         {notificationText ? (
            <p className="notification">{notificationText}</p>
         ) : (
            ""
         )}
         <button className="btn_get_words" onClick={getData}>
            Получить слова
         </button>
         <WordsWrapper getWords={data?.getWords} />
      </div>
   );
}
