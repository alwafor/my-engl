import {prismaClient} from '../../../../prisma/prismaInstance'

export default async function getAllDictionaries() {
  return await prismaClient.dictionary.findMany()
}