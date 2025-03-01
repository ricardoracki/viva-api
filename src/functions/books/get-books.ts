import { Testament } from '@prisma/client'
import { db } from '../../database/prisma'

type GetBooksParams = {
  id?: string
  q?: string
  testament?: Testament
}
export async function getBooks(
  { id, q, testament }: GetBooksParams,
  translation: string
) {
  const result = await db.book.findMany({
    where: {
      translation,
      id,
      testament,
      OR: q
        ? [
            {
              name: {
                mode: 'insensitive',
                contains: q,
              },
            },
            {
              abbrev: {
                mode: 'insensitive',
                contains: q,
              },
            },
          ]
        : undefined,
    },
  })

  return { books: result }
}
