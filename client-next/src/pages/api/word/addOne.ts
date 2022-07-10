import {NextApiRequest, NextApiResponse} from 'next'
import {addWord, IMutationAddWord} from '@/core/backend/word'

export default async function addOneWord(req: NextApiRequest, res: NextApiResponse) {
  let {translationsString, word}: Partial<IMutationAddWord> = req.body

  if (req.method !== 'POST') {
    return res.json('Error! POST method expected!')
  }

  if (!translationsString || !word) {
    return res.status(400).json({error: 'No translations or word in req.body!'})
  }

  const result = await addWord(word, translationsString)
  // return result
  res.status(200).json(result)
}