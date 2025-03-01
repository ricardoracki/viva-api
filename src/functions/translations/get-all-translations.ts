import { db } from '../../database/prisma'

export async function getAllTranslations() {
  const result = await db.book.findMany({
    distinct: ['translation'],
    select: {
      translation: true,
    },
  })

  const count = result?.length || 0

  return { translations: result.map((a) => a.translation), count }
}
