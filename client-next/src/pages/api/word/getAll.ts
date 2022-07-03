import {NextApiRequest, NextApiResponse} from 'next'
import {prismaClient} from '../../../../prisma/prismaInstance'

export default async function getAllWords(req: NextApiRequest, res: NextApiResponse) {
  const allWords = await prismaClient.word.findMany({
    include: {
      translations: true
    }
  })
  return res.status(200).json(allWords)
}