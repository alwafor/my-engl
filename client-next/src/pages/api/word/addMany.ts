import {NextApiRequest, NextApiResponse} from 'next'
import {z} from 'zod'

export default async function addManyWords(req: NextApiRequest, res: NextApiResponse) {
  const words = req.body

  const validationSchema = z.object({
      word: z.string(),
      translationsString: z.string()
    }
  ).array()

  const validationResult = validationSchema.safeParse(words)

  if(!validationResult.success) {
    res.status(400).json('Error! Wrong data! Message: ' + validationResult.error)
  } else {
    res.status(200).json(validationResult.data)
  }
}