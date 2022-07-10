import React, {useRef, useState} from 'react'
import {useMutation} from 'react-query'

import AddWordsHead from '@/components/pages/add-words/head'
import AddWordsSection from '@/components/pages/add-words/section'
import {regWordSentence} from '@/utils/strings/regExps'
import {MSG} from '@/components/pages/add-words/enumMSG'
import {IMutationAddWord, IMutationAddWords} from '@/core/backend/word'

export default function AddWords() {

  const [message, setMessage] = useState<MSG>(MSG.EMPTY)
  const [inputText, setInputText] = useState('')
  const [textareaText, setTextareaText] = useState('')

  const messageTimeout = useRef<NodeJS.Timeout | null>(null)

  const addWord = useMutation((word: IMutationAddWord) => fetch('/api/word/addOne', {
    method: 'POST',
    body: JSON.stringify(word),
    headers: {'Content-Type': 'application/json'}
  }))

  const addWords = useMutation((wordsData: IMutationAddWords) => fetch('/api/word/addMany', {
    method: 'POST',
    body: JSON.stringify(wordsData),
    headers: {'Content-type': 'application/json'}
  }))

  const showMessage = (message: MSG, hideDelayMs: number = 5000) => {
    setMessage(message)
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current)
    }
    messageTimeout.current = setTimeout(() => setMessage(MSG.EMPTY), hideDelayMs)
  }

  const sendWordToServer = () => {
    if (!regWordSentence.test(inputText)) {
      showMessage(MSG.INCORRECT_INPUT_WORD, 5000)
      return
    }
    const [word, translationsString] = inputText.split(/-(.*)/s)
    addWord.mutate({word, translationsString})
    setInputText('')
    // todo check if server returns an error on word addition
    showMessage(MSG.SUCCESS_WORD, 5000)
  }

  const sendWordsToServer = () => {
    if (!textareaText && !textareaText.includes('-')) {
      showMessage(MSG.INCORRECT_INPUT_WORDS, 5000)
      return
    }

    const wordsData: IMutationAddWords = textareaText.trim().split(/\n+\s*/).map(fullWordData => {
      const [word, translationsString] = fullWordData.split(/-(.*)/s)
      return {word, translationsString}
    })
    addWords.mutate(wordsData)

    setTextareaText('')
    showMessage(MSG.SUCCESS_WORDS, 5000)
  }

  const messageGenerate = (text: string, good: boolean = true) => {
    return <div className={'message ' + (good ? '' : ' bad')}>{text}</div>
  }

  return (
    <div className="add_words">
      <AddWordsHead/>
      <AddWordsSection buttonText={'Инструкция'}>
        <div className="text">
          Вы можете добавлять слова с помощью секции ниже. Для этого
          необходимо ввести в поле ввода текст следующего вида:
          <p>слово_на_английском1 - перевод1,перевод2,перевод3</p>
          <p>слово_на_английском2 - перевод4,перевод5,перевод6</p>
        </div>
      </AddWordsSection>

      <AddWordsSection buttonText={'Добавление слова'}>
        <>
          <input
            type="text"
            value={inputText}
            onChange={(e: any) => setInputText(e.target.value)}
          />

          {message === MSG.INCORRECT_INPUT_WORD && messageGenerate(MSG.INCORRECT_INPUT_WORD, false)}
          {message === MSG.SUCCESS_WORD && messageGenerate(MSG.SUCCESS_WORD)}

          <button className="btn_add_words" onClick={sendWordToServer}>
            Добавить слово
          </button>
        </>
      </AddWordsSection>

      <AddWordsSection buttonText={'Добавление слов'}>
        <>
          <textarea
            className="words_area"
            value={textareaText}
            onChange={(e: any) => {
              setTextareaText(e.target.value)
            }}
          />

          {message === MSG.INCORRECT_INPUT_WORDS && messageGenerate(MSG.INCORRECT_INPUT_WORDS, false)}
          {message === MSG.SUCCESS_WORDS && messageGenerate(MSG.SUCCESS_WORDS)}

          <button className="btn_add_words" onClick={sendWordsToServer}>
            Добавить слова
          </button>
        </>
      </AddWordsSection>

      {/*<AddDict/>*/}
    </div>
  )
}