import React, {useEffect, useState} from 'react'
import {IWord} from '../../../../prisma/prismaTypes'

interface Props {
  word: IWord
  check: boolean
}

export default function OneWord({
                                  word: {word, translations},
                                  check,
                                }: Props) {

  const [translationInput, setTranslationInput] = useState("");
  const [wordState, setWordState] = useState("normal");

  useEffect(() => {
    if (check) {
      checkTranslation(translationInput);
    }
  }, [check]);

  const checkTranslation = (e: any) => {
    let translation = translationInput.toLowerCase();
    let translationExists = translations.some(
      (item: any) => item.word === translation
    );
    if (translationExists) {
      setWordState("right");
    } else {
      setWordState("wrong");
    }
  };

  const getAllTranslations = () => {
    return translations.map((item: any) => item.word).join(", ");
  };
  return (
    <div className={"word" + ` ${wordState}`}>
      <div className="word_title">{word}</div>
      {wordState === "normal" ? (
        <>
          <p className="word_desc">Введите перевод:</p>
          <input
            className="word_input"
            type="text"
            value={translationInput}
            onChange={(e: any) => setTranslationInput(e.target.value)}
          />
          <button className="btn_try" onClick={checkTranslation}>
            Ввод
          </button>
        </>
      ) : wordState === "wrong" ? (
        <p className="word_desc small">
          Правильный перевод: {getAllTranslations()}
        </p>
      ) : (
        <p className="word_desc large">✓</p>
      )}
    </div>
  );
}
