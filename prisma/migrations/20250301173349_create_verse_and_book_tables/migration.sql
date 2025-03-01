-- CreateEnum
CREATE TYPE "Testament" AS ENUM ('old', 'new');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "testament" "Testament" NOT NULL,
    "abbrev" TEXT NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "chapter" INTEGER NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
