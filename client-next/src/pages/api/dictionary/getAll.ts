import {prismaClient} from '../../../../prisma/prismaInstance'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function getAllDictionaries(req: NextApiRequest, res: NextApiResponse) {
  const allDictionaries = await prismaClient.dictionary.findMany()
  return res.status(200).json(allDictionaries)
}