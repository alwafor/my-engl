import { useMutation } from "@apollo/client";
import React, { ReactElement, useState } from "react";
import { ADD_WORD, ADD_WORDS } from "../../common/Graphql/mutation";
import AddDict from "./AddDict";

interface Props {}

const MSG_ERROR_EMPTY = "";
const MSG_INCORRECT_INPUT_WORD = "Ошибка! Ввод некорректный!";
const MSG_INCORRECT_INPUT_WORDS = "Ошибка! Ввод слов некорректный";
const MSG_ERROR_WORD = "Слово не было добавлено!";
const MSG_ERROR_WORDS = "Слова не были добавлены!";
const MSG_SUCCESS_WORD = "Слово было успешно добавлено!";
const MSG_SUCCESS_WORDS = "Слова были успешно добавлены!";
const MSG_SUCCESS_DICT = "Словарь был успешно добавлен!";

type messageType =
   | typeof MSG_ERROR_EMPTY
   | typeof MSG_INCORRECT_INPUT_WORD
   | typeof MSG_INCORRECT_INPUT_WORDS
   | typeof MSG_ERROR_WORD
   | typeof MSG_ERROR_WORDS
   | typeof MSG_SUCCESS_WORD
   | typeof MSG_SUCCESS_WORDS

export default function AddWords({}: Props): ReactElement {
   const [addWord, responseWord] = useMutation(ADD_WORD);
   const [addWords, responseWords] = useMutation(ADD_WORDS);

   const [opened1, setOpened1] = useState(false);
   const [opened2, setOpened2] = useState(false);
   const [opened3, setOpened3] = useState(false);

   const [message, setMessage] = useState<messageType>("");
   const [inputText, setInputText] = useState("");
   const [textareaText, setTextareaText] = useState("");
   const [timeoutId, setTimeoutId] = useState(0);

   const sendWordToServer = () => {
      if (!inputText && !inputText.includes("-")) {
         setMessage(MSG_INCORRECT_INPUT_WORD);
         setMessageEmpty(5000);
         return;
      }
      let [word, translation] = inputText.split("-").map((item) => item.trim());
      addWord({ variables: { word, translation } });
      setInputText("");
      setMessage(MSG_SUCCESS_WORD);
      setMessageEmpty(5000);
   };

   const sendWordsToServer = () => {
      if (!textareaText && !textareaText.includes("-")) {
         setMessage(MSG_INCORRECT_INPUT_WORDS);
         setMessageEmpty(5000);
         return;
      }
      addWords({ variables: { words: textareaText } });
      setTextareaText("");
      setMessage(MSG_SUCCESS_WORDS);
      setMessageEmpty(5000);
   };

   const messageGenerate = (text: string, good: boolean = true) => {
      return <div className={"message " + (good ? "" : " bad")}>{text}</div>;
   };

   const setMessageEmpty = (delay: number) => {
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
         setMessage("");
      }, delay);
      setTimeoutId(+id);
   };

   console.log(responseWord);
   return (
      <div className="add_words">
         <h2 className="title">Добавление новых слов</h2>
         <div className="title_desc">
            В этом разделе вы можете добавить новые слова и фразы для
            дальнейшего изучения
         </div>
         <section className={opened1 ? "block hide" : "block"}>
            <button className="btn_enter" onClick={() => setOpened1(!opened1)}>
               Инструкция
            </button>
            <div className="text">
               Вы можете добавлять слова с помощью секции ниже. Для этого
               необходимо ввести в поле ввода текст следующего вида:
               <p>слово_на_английском1 - перевод1,перевод2,перевод3</p>
               <p>слово_на_английском2 - перевод4,перевод5,перевод6</p>
            </div>
         </section>

         <section className={opened2 ? "block hide" : "block"}>
            <button className="btn_enter" onClick={() => setOpened2(!opened2)}>
               Добавление слова
            </button>
            <input
               type="text"
               value={inputText}
               onChange={(e: any) => setInputText(e.target.value)}
            />
            {message === MSG_INCORRECT_INPUT_WORD
               ? messageGenerate(MSG_INCORRECT_INPUT_WORD, false)
               : ""}
            {message === MSG_SUCCESS_WORD
               ? messageGenerate(MSG_SUCCESS_WORD)
               : ""}

            <button className="btn_add_words" onClick={sendWordToServer}>
               Добавить слово
            </button>
         </section>

         <section className={opened3 ? "block hide" : "block"}>
            <button className="btn_enter" onClick={() => setOpened3(!opened3)}>
               Добавление слов
            </button>
            <textarea
               className="words_area"
               value={textareaText}
               onChange={(e: any) => {
                  setTextareaText(e.target.value);
               }}
            ></textarea>
            {message === MSG_INCORRECT_INPUT_WORDS
               ? messageGenerate(MSG_INCORRECT_INPUT_WORDS, false)
               : ""}
            {message === MSG_SUCCESS_WORDS
               ? messageGenerate(MSG_SUCCESS_WORDS)
               : ""}
            <button className="btn_add_words" onClick={sendWordsToServer}>
               Добавить слова
            </button>
         </section>

         <AddDict />
      </div>
   );
}
