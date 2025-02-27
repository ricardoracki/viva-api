import { db } from "../../drizzle/client";
import { book } from "../../drizzle/schemas/book";
import { Book } from "../../types/book";

type CreateBookParams = Omit<Book, "id">;

export function createBook(data: CreateBookParams) {
  return db.insert(book).values(data).returning({
    id: book.id,
    name: book.name,
    abbrev: book.abbrev,
    translation: book.translation,
    testament: book.testament,
  });
}
