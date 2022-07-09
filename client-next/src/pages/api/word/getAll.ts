import {NextApiRequest, NextApiResponse} from 'next'
import {prismaClient} from '../../../../prisma/prismaInstance'

/**
 * Get words from the whole database, dictionaries are not considered
 */
export default async function getAllWords(req: NextApiRequest, res: NextApiResponse) {
  const take = Number.parseInt(String(req.query.take)) || undefined

  const words = await prismaClient.word.findMany({
    include: {
      translations: true
    },
    take: take
  })

  return res.status(200).json(words)
}