import aa from '../resources/aa.json'
import { db } from '../src/database/prisma'
import nvi from '../resources/nvi.json'

async function createNVI() {
  for (let i = 0; i < nvi.length; i++) {
    const { chapters, name, abbrev } = nvi[i]

    const book = await db.book.create({
      data: {
        name,
        abbrev,
        testament: i < 39 ? 'old' : 'new',
        translation: 'nvi',
      },
    })

    for (let j = 0; j < chapters.length; j++) {
      for (let k = 0; k < chapters[j].length; k++) {
        await db.verse.create({
          data: {
            content: chapters[j][k],
            index: k + 1,
            bookId: book.id,
            chapter: j + 1,
          },
        })
      }
    }
  }
}

async function createAA() {
  for (let i = 0; i < aa.length; i++) {
    const { chapters, name, abbrev } = aa[i]

    const book = await db.book.create({
      data: {
        name,
        abbrev,
        testament: i < 39 ? 'old' : 'new',
        translation: 'aa',
      },
    })

    for (let j = 0; j < chapters.length; j++) {
      for (let k = 0; k < chapters[j].length; k++) {
        await db.verse.create({
          data: {
            content: chapters[j][k],
            index: k + 1,
            bookId: book.id,
            chapter: j + 1,
          },
        })
      }
    }
  }
}

const seed = async () => {
  // await createNVI()
  await createAA()
}

seed().then(() => {
  db.$disconnect()
})
