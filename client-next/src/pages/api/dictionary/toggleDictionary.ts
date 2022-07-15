import {NextApiRequest, NextApiResponse} from 'next'
import z from 'zod'
import {prismaClient} from '../../../../prisma/prismaInstance'

export default async function toggleDictionary(req: NextApiRequest, res: NextApiResponse) {
  const validationSchema = z.object({
    dictionaryId: z.number()
  })

  const validationOutput = validationSchema.safeParse(req.body)

  if (!validationOutput.success) {
    return res.status(400).json(`Invalid dictionary id has been sent!`)
  } else {
    const {dictionaryId} = validationOutput.data

    const searchedDictionary = await prismaClient.dictionary.findFirst({
      where: {
        id: dictionaryId
      }
    })

    if (!searchedDictionary) {
      return res.status(400).json(`Error! Dictionary with sent id does not exist!`)
    }

    await prismaClient.dictionary.update({
      where: {
        id: dictionaryId
      },
      data: {
        choosed: !searchedDictionary.choosed
      }
    })

    return res.status(200).json(`Success! Dictionary has been toggled!`)
  }
}