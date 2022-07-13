import {prismaClient} from '../../../prisma/prismaInstance'
import {Prisma} from '@prisma/client'
import {IWord} from '../../../prisma/prismaTypes'

export interface IMutationAddWord {
  translationsString: string,
  word: string
}

export type IMutationAddWords = IMutationAddWord[]

interface IAddWordResultSuccess {
  isError: false
  data: IWord
}

interface IAddWordResultError {
  isError: true
  errorMessage: string
}

export const addWord = async (word: string, translationsString: string): Promise<IAddWordResultSuccess | IAddWordResultError> => {
  try {
    word = word.toLowerCase()

    const translations = translationsString
      .split(',')
      .map(tr => tr.trim().toLowerCase())

    // check if this word already exists, if it is, we're working with this word
    const searchedWord = await prismaClient.word.findFirst({where: {word}})

    // create translations arrays
    let translationsIdsToConnectTo: { id: number }[] = []
    let translationsToCreate: Prisma.TranslationCreateInput[] = []

    // check if similar translations exist
    for (let translation of translations) {
      const translationDb = await prismaClient.translation.findFirst({where: {translation}})
      if (translationDb) {
        translationsIdsToConnectTo.push({id: translationDb.id})
      } else {
        translationsToCreate.push({translation})
      }
    }

    // create a new word if searchedWord is null, otherwise add translations to searchedWord
    if (!searchedWord) {
      const wordDb = await prismaClient.word.create({
        data: {
          word: word.toLowerCase(),
          translations: {
            create: translationsToCreate,
            connect: translationsIdsToConnectTo
          }
        },
        select: {
          id: true,
          word: true,
          translations: true
        }
      })
      return {isError: false, data: wordDb}

    } else {
      const savedWord = await prismaClient.word.update({
        where: {
          id: searchedWord.id
        },
        data: {
          translations: {
            create: translationsToCreate,
            connect: translationsIdsToConnectTo
          }
        },
        select: {
          id: true,
          word: true,
          translations: true
        }
      })

      return {isError: false, data: savedWord}
    }
  } catch (e) {
    return {isError: true, errorMessage: (e as Error).message}
  }
}