import { BadRequestError } from '../../error/errors'
import { db } from '../../database/prisma'

type GetVersesParams = {
  book?: string
  id?: string
  chapter?: number
  start?: number
  stop?: number
  page?: number
  perpage?: number
  find?: string
}
export async function getVerses(
  {
    book,
    id,
    chapter,
    start,
    stop,
    find,
    perpage = 10,
    page = 1,
  }: GetVersesParams,
  translation: string
) {
  if (!find && !book && !id)
    throw new BadRequestError('Book or findQuery is required')

  // Query by id
  if (id) {
    const verse = await db.verse.findMany({
      include: {
        book: true,
      },
      where: {
        id,
      },
    })

    return { verses: verse, count: 1, pages: 1, page: 1 }
  }

  // query by search
  if (find) {
    const [versesBySearch, countBySearch] = await Promise.all([
      await db.verse.findMany({
        include: {
          book: true,
        },
        where: {
          content: { contains: find, mode: 'insensitive' },
        },
        skip: (page - 1) * perpage,
        take: perpage,
      }),
      await db.verse.count({
        where: {
          content: { contains: find, mode: 'insensitive' },
        },
      }),
    ])

    return {
      verses: versesBySearch,
      count: countBySearch,
      pages: Math.ceil(countBySearch / perpage),
      page,
    }
  }

  // Query for range
  let indexQuery = undefined

  if (start) {
    if (stop) {
      indexQuery = {
        gte: start,
        lte: stop,
      }
    } else {
      indexQuery = start
    }
  }

  const [verses, count] = await Promise.all([
    await db.verse.findMany({
      include: {
        book: true,
      },
      orderBy: {
        index: 'asc',
      },
      take: perpage,
      skip: (page - 1) * perpage,
      where: {
        chapter,
        index: indexQuery,
        book: {
          translation,
          OR: [
            { name: { contains: book, mode: 'insensitive' } },
            { abbrev: { contains: book, mode: 'insensitive' } },
          ],
        },
      },
    }),
    await db.verse.count({
      where: {
        chapter,
        index: indexQuery,
        book: {
          translation,
          OR: [
            { name: { contains: book, mode: 'insensitive' } },
            { abbrev: { contains: book, mode: 'insensitive' } },
          ],
        },
      },
    }),
  ])

  const pages = Math.ceil(count / perpage)

  return { verses, count, pages, page }
}
