import {NextApiRequest, NextApiResponse} from 'next'
import {z} from 'zod'
import {addWord} from '@/core/backend/word'

export default async function addManyWords(req: NextApiRequest, res: NextApiResponse) {
  const reqWordsData = req.body

  const wordsValidationSchema = z.object({
      word: z.string(),
      translationsString: z.string()
    }
  ).array()

  const validationResult = wordsValidationSchema.safeParse(reqWordsData)

  if (!validationResult.success) {
    res.status(400).json('Error! Wrong data! Message: ' + validationResult.error)
  } else {
    const wordsData = validationResult.data
    let errors: string[] = []

    // check if some of these words already exists
    for (const {word, translationsString} of wordsData) {
      const addWordResult = await addWord(word, translationsString)

      if (addWordResult.isError) {
        errors.push(addWordResult.errorMessage)
      }
    }

    let responseMessage = errors.length
      ? `Words creation finished, but there were some errors: ${errors.join(', ')}`
      : 'Words creation has been finished!'

    return res.status(201).json(responseMessage)
  }
}