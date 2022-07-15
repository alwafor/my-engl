import React from 'react'
import {useQuery} from 'react-query'
import {IDictionary} from '../../../prisma/prismaTypes'
import Dictionary from '@/components/pages/dictionaries/dictionary'

export default function DictionariesPage() {
  const {
    data: dictionaries,
    isLoading,
    error
  } = useQuery(['dictionaries'], (): Promise<IDictionary[]> =>
    fetch('/api/dictionary/getAll').then(data => data.json()))

  if (isLoading) return <div>Loading</div>

  if (error) console.error(error)

  return (
    <div className="dictionaries">
      <h2 className="title">Словари</h2>
      <div className="title_desc">
        В этом разделе вы можете выбрать предпочитаемые словари, из которых
        будет происходить выборка слов
      </div>
      <div className="dicts_wrapper">
        {dictionaries!.map((item) => {
          return <Dictionary dictionary={item}/>
        })}
      </div>
    </div>
  )
};