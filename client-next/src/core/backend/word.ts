import {prismaClient} from '../../../prisma/prismaInstance'
import {Prisma} from '@prisma/client'

export interface IMutationAddWord {
  translationsString: string,
  word: string
}

export const addWord = async (word: string, translationsString: string) => {

  word = word.toLowerCase()

  const translations = translationsString
    .split(',')
    .map(tr => tr.trim().toLowerCase())

  // check if this word already exists
  const wordSearch = await prismaClient.word.findFirst({where: {word}})
  if(wordSearch) return {isError: true, errorMessage: `Word '${word}' is already exist!`}

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

  return {isError: false, data: wordDb}
}