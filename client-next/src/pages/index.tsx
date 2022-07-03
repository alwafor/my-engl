import {useState} from 'react'
import useFetch from '@/hooks/useFetch'
import WordsWrapper from '@/components/pages/index/WordsWrapper'
import {prismaClient} from '../../prisma/prismaInstance'
import {IWord} from '../../prisma/prismaTypes'

enum ESelectMode {
  ALL_WORDS = 'Все слова',
  DICT_WORDS = 'Слова из выбранных словарей'
}

interface IProps {
  wordsCount: number
}

export default function Home({wordsCount}: IProps) {

  const [counter, setCounter] = useState(1)
  const [selectMode, setSelectMode] = useState<ESelectMode>(ESelectMode.ALL_WORDS)
  const [notification, setNotification] = useState<null | string>(null)

  const {data: words, isLoading, error, run: runGetWordsFetch} = useFetch<IWord[]>({
    url: '/api/word/getAll',
    method: 'GET',
    runInitial: false
  })

  const changeChooseMode = (e: any) => {
    setSelectMode(e.target.value)
    setCounter(1)
  }

  const showNotification = (text: string) => {
    if(notification !== text) {
      setNotification(text)
    }
    setTimeout(() => setNotification(''), 3000)
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

  if(isLoading) showNotification('Загрузка...')
  if(error) showNotification(`Произошка ошибка! Сообщение ошибки: ${error}`)
  if(words) showNotification('')

  return <div>
    <div className="main_randWords">
      <h2 className="title">Случайные английские слова</h2>
      <div className="title_desc">
        Вы можете задать количество слов из вашего словаря, которые будут
        выбраны случайно. Вам необходимо будет перевести каждое слово.
      </div>
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
      <button className="btn_get_words" onClick={() => runGetWordsFetch()}>
        Получить слова
      </button>
      <WordsWrapper words={words || []}/>
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