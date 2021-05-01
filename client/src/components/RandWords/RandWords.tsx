import { useLazyQuery, useQuery } from "@apollo/client";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import { GET_RANDOM_WORDS, GET_WORDS_COUNT } from "../../common/Graphql/query";
import { Words } from "../../common/Types/types";
import WordsWrapper from "./WordsWrapper";

interface Props {}

export default function RandWords({}: Props): ReactElement {
   const {
      loading: loading1,
      error: error1,
      data: data1,
   } = useQuery(GET_WORDS_COUNT, { fetchPolicy: "no-cache" });
   const [counter, setCounter] = useState(1);
   const [notificationText, setNotificationText] = useState("");
   let [doQuery, { loading, error, data }] = useLazyQuery<Words>(
      GET_RANDOM_WORDS,
      { fetchPolicy: "no-cache" }
   );
   if (loading || loading1) return <></>;
   if (error1) return <div>Error1!</div>;

   let wordsCount = data1.getWordsCount;
   const getData = () => {
      console.log(counter);
      data = undefined;
      doQuery({ variables: { count: counter } });
   };

   const changeCounter = (e: any) => {
      let inputNumber = +e.target.value;
      if (inputNumber > wordsCount) {
         setCounter(wordsCount);
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
   
   console.log("DATA: ", data);

   return (
      <div className="main_randWords">
         <h2 className="title">Случайные английские слова</h2>
         <div className="title_desc">
            Вы можете задать количество слов из вашего словаря, которые будут
            выбраны случайно. Вам необходимо будет перевести каждое слово.
         </div>
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
         <WordsWrapper getRandomWords={data?.getRandomWords} />
      </div>
   );
}
