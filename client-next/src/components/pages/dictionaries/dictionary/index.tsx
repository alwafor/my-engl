import React from 'react'
import {IDictionary} from '../../../../../prisma/prismaTypes'
import {useMutation, useQueryClient} from 'react-query'

interface IProps {
  dictionary: IDictionary
}

export default function Dictionary({dictionary}: IProps) {
  const queryClient = useQueryClient()

  const mutationToggleDict = useMutation((data: { dictionaryId: number }) => fetch('/api/dictionary/toggleDictionary', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['dictionaries'])
    }
  })

  const selectDictionary = () => {
    if(!mutationToggleDict.isLoading) {
      mutationToggleDict.mutate({dictionaryId: dictionary.id})
    }
  }

  console.log('Chosen',dictionary.choosed)

  return <div className={'dict ' + (dictionary.choosed ? 'selected' : '')} onClick={selectDictionary}>
    <div className="dict_left">
      <div className="dict_title">{dictionary.name}</div>
      <div className="dict_desc">
        Словарь, который подойдёт начинающим.
      </div>
    </div>
    <div className="dict_right">
      <div className="dict_difficulty">
        Сложность: <span>{dictionary.difficulty}/10</span>
      </div>
      <div className="dict_type">Тип: Словарный</div>
      <div className="dict_words_count">
        Количество слов: {dictionary.wordsCount}
      </div>
      <div className="dict_selected">Выбран: {dictionary.choosed ? '✓' : 'X'}</div>
    </div>
  </div>
};