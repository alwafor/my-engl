import React, {useState} from 'react'
import OneWord from '../one-word'
import {IWord} from '../../../../../prisma/prismaTypes'

interface IProps {
  words: IWord[]
}

export default function WordsWrapper({words}: IProps) {
  const [checkAllWords, setCheckAllWords] = useState(false);

  if (!words || !words.length) return null;

  return (
    <>
      <div className="words_wrapper">
        {words?.map((word) => {
          return (
            <OneWord
              key={word.word}
              word={word}
              check={checkAllWords}
            />
          );
        })}
      </div>
      {words ? (
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
