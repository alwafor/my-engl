import {useEffect, useRef, useState} from 'react'
import WordsWrapper from '@/components/pages/home/words-wrapper'
import {prismaClient} from '../../prisma/prismaInstance'
import {useQuery} from 'react-query'
import {IWord} from '../../prisma/prismaTypes'

enum ESelectMode {
  ALL_WORDS = 'Все слова',
  DICT_WORDS = 'Слова из выбранных словарей'
}

interface IProps {
  wordsCount: number
}


export default function Home({wordsCount}: IProps) {

  const [counter, setCounter] = useState(0)
  const [selectMode, setSelectMode] = useState<ESelectMode>(ESelectMode.ALL_WORDS)
  const [notification, setNotification] = useState<null | string>(null)
  const [counterForFetch, setCounterForFetch] = useState(0)
  const [words, setWords] = useState<IWord[] | null>(null)

  const {
    isLoading,
    isError,
    error
  } = useQuery([`words${counterForFetch}`], () => fetch(`/api/word/getAll?take=${counter}`).then(data => data.json()), {
    enabled: counterForFetch !== 0,
    cacheTime: Infinity,
    onSuccess: (data) => {
      setWords(data)
    }
  })

  useEffect(() => {
    if (isError) showNotification(`Произошка ошибка! Сообщение ошибки: ${error}`)
    else if (isLoading) showNotification('Загрузка...')
    else if (!isLoading) showNotification('')
  }, [isLoading, error])

  const notificationResetTimer = useRef<NodeJS.Timer | null>(null)

  const changeChooseMode = (e: any) => {
    setSelectMode(e.target.value)
    setCounter(1)
  }

  const showNotification = (text: string, resetDelay = 3000) => {
    if (notification !== text) {
      setNotification(text)
      if (notificationResetTimer.current !== null) {
        clearTimeout(notificationResetTimer.current)
        notificationResetTimer.current = setTimeout(() => setNotification(''), resetDelay)
      }
    }
  }

  const changeCounter = (e: any) => {
    let inputNumber = +e.target.value

    // todo implement two variations of words count
    // if (selectMode === ALL_WORDS) {
    //   words_count = wordsCount.getWordsCount[0]
    // } else {
    //   words_count = wordsCount.getWordsCount[1]
    // }

    if (inputNumber > wordsCount) {
      setCounter(wordsCount)
      showNotification(
        'Ошибка! Вы выбрали максимальное количество доступных слов!'
      )
    } else if (inputNumber < 1) {
      setCounter(1)
      showNotification('Ошибка! Нельзя выбрать меньше одного слова!')
    } else {
      setCounter(inputNumber)
    }
  }

  return <div>
    <div className="main_randWords">
      <h2 className="title">Случайные английские слова</h2>
      <div className="title_desc">
        Вы можете задать количество слов из вашего словаря, которые будут
        выбраны случайно. Вам необходимо будет перевести каждое слово.
      </div>

      {wordsCount > 0
        ? <>
          <div className="hint">Режим подбора слов:</div>
          <select value={selectMode} onChange={changeChooseMode}>
            <option value={ESelectMode.ALL_WORDS}>{ESelectMode.ALL_WORDS}</option>
            <option value={ESelectMode.DICT_WORDS}>{ESelectMode.DICT_WORDS}</option>
          </select>
          <div className="hint">Кол-во слов:</div>
          <div className="count_picker">
            <input type="number" value={counter} onChange={changeCounter}/>
          </div>
          {notification ? (
            <p className="notification">{notification}</p>
          ) : (
            ''
          )}
          <button className="btn_get_words" onClick={() => setCounterForFetch(counter)}>
            Получить слова
          </button>
          <WordsWrapper words={words || []}/>
        </>
        : 'Вы не добавили ни одного слова! Перейдите в раздел "Добавить слова"'}

    </div>
  </div>
}

export async function getServerSideProps() {
  const wordsCount = await prismaClient.word.count()
  return {
    props: {
      wordsCount
    }
  }
}