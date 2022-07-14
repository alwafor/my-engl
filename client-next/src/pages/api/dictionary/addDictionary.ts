import {NextApiRequest, NextApiResponse} from 'next'
import {z} from 'zod'
import {prismaClient} from '../../../../prisma/prismaInstance'

export default async function addDictionary(req: NextApiRequest, res: NextApiResponse) {
  const validationSchema = z.object({
    name: z.string(),
    wordsIds: z.number().array(),
    difficulty: z.number()
  })

  const validationOutput = validationSchema.safeParse(req.body)

  if (!validationOutput.success) {
    return res.status(400).json(`Error! ${validationOutput.error}`)
  } else {
    const {name, wordsIds, difficulty} = validationOutput.data

    const dictionary = await prismaClient.dictionary.create({
      data: {
        name,
        words: {
          connect: wordsIds.map(id => ({id}))
        },
        difficulty,
        choosed: false,
        wordsCount: wordsIds.length
      }
    })

    return res.status(201).json(`Dictionary has been successfully created!`)
  }
}