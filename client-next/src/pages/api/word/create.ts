import {NextApiRequest, NextApiResponse} from 'next'
import {prismaClient} from '../../../../prisma/prismaInstance'
import {Prisma} from '@prisma/client'

export default async function createWord(req: NextApiRequest, res: NextApiResponse) {
  let {translationsString, word}: { translationsString?: string, word?: string } = req.body

  if (req.method !== 'POST') {
    return res.json('Error! POST method expected!')
  }

  if (!translationsString || !word) {
    return res.status(400).json({error: 'No translations or word in req.body!'})
  }

  word = word.toLowerCase()

  const translations = translationsString
    .split(',')
    .map(tr => tr.trim().toLowerCase())

  // check if this word already exists
  const wordSearch = await prismaClient.word.findFirst({where: {word}})
  if(wordSearch) return res.status(400).json({error: `Word '${word}' is already exist!`})

  // create translations arrays
  let translationsIdsToConnectTo: {id: number}[] = []
  let translationsToCreate: Prisma.TranslationCreateInput[] = []

  // check if similar translations exist
  for(let translation of translations) {
    const translationDb = await prismaClient.translation.findFirst({where: {translation}})
    if(translationDb) {
      translationsIdsToConnectTo.push({id: translationDb.id})
    }
    else {
      translationsToCreate.push({translation})
    }
  }

  // create a new word
  const wordDb = await prismaClient.word.create({
    data: {
      word: word.toLowerCase(),
      translations: {
        create: translationsToCreate,
        connect: translationsIdsToConnectTo
      }
    }
  })

  // return result
  res.status(200).json(wordDb)
}