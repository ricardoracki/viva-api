import { BadRequestError } from '../../error/errors'
import { db } from '../../database/prisma'

type GetVersesParams = {
  book?: string
  q?: string
  id?: string
  chapter?: number
  index?: number
  start?: number
  stop?: number
  page?: number
  perpage?: number
  find?: string
}
export async function getVerses(
  {
    book,
    q,
    id,
    chapter,
    start,
    stop,
    index,
    find,
    perpage = 10,
    page = 1,
  }: GetVersesParams,
  translation: string
) {
  const pattern = /^([a-zA-Z\s]+)\s(\d+):(\d+)(?:-(\d+))?$/
  if (!find && !book && !id && !q)
    throw new BadRequestError('Book or findQuery is required')

  if (q) {
    const match = q.match(pattern)
    if (!match)
      throw new BadRequestError(
        'Invalid query format! Use (bookName) (chapter):(start)[-(end)]'
      )
    if (!match?.[4]) {
      index = Number(match?.[3])
    } else {
      start = Number(match?.[3])
      stop = match?.[4] ? Number(match?.[4]) : undefined
    }

    book = match?.[1]
    chapter = Number(match?.[2])
  }

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
          book: {
            translation,
            OR: book
              ? [
                  { name: { contains: book, mode: 'insensitive' } },
                  { abbrev: { contains: book, mode: 'insensitive' } },
                ]
              : undefined,
          },
        },
        skip: (page - 1) * perpage,
        take: perpage,
      }),
      await db.verse.count({
        where: {
          content: { contains: find, mode: 'insensitive' },
          book: {
            translation,
            OR: book
              ? [
                  { name: { contains: book, mode: 'insensitive' } },
                  { abbrev: { contains: book, mode: 'insensitive' } },
                ]
              : undefined,
          },
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
    indexQuery = {
      gte: start,
      lte: stop,
    }
  }

  if (index) {
    indexQuery = index
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
