import React, {useRef, useState} from 'react'
import useFetch from '@/hooks/useFetch'
import AddDict from '@/components/pages/add-words/add-dict'
import AddWordsHead from '@/components/pages/add-words/head'
import AddWordsSection from '@/components/pages/add-words/section'
import {regWordSentence} from '@/utils/strings/regExps'
import {MSG} from '@/components/pages/add-words/enumMSG'

export default function AddWords() {

  const [message, setMessage] = useState<MSG>(MSG.EMPTY)
  const [inputText, setInputText] = useState('')
  const [textareaText, setTextareaText] = useState('')

  const messageTimeout = useRef<NodeJS.Timeout | null>(null)

  const {data: wordFromServer, error: errorAddWord, isLoading: isLoadingWord, run: runAddWord} = useFetch({
    url: '/api/word/addOne',
    method: 'POST',
    runInitial: false
  })

  const {data: wordsFromServer, error: errorAddWords, isLoading: isLoadingWords, run: runAddWords} = useFetch({
    url: '/api/word/addWords',
    method: 'POST',
    runInitial: false
  })

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
    const [word, translationsString] = inputText.split('-')
    runAddWord({word, translationsString}).then(res => console.log(res))
    setInputText('')
    // todo check if server returns an error on word addition
    showMessage(MSG.SUCCESS_WORD, 5000)
  }

  const sendWordsToServer = () => {
    if (!textareaText && !textareaText.includes('-')) {
      showMessage(MSG.INCORRECT_INPUT_WORDS, 5000)
      return
    }
    // todo implement a few words addition
    // runAddWords({variables: {words: textareaText}})
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