import {NextApiRequest, NextApiResponse} from 'next'
import {prismaClient} from '../../../../prisma/prismaInstance'

/**
 * Get words from the whole database, dictionaries are not considered
 */
export default async function getAllWords(req: NextApiRequest, res: NextApiResponse) {
  const count = Number.parseInt(String(req.query.count)) || undefined

  const words = await prismaClient.word.findMany({
    include: {
      translations: true
    },
    take: count
  })

  return res.status(200).json(words)
}