import { PgUUID } from "drizzle-orm/pg-core";
import { db } from "../../drizzle/client";
import { book } from "../../drizzle/schemas/book";
import { and, eq, ilike, or } from "drizzle-orm";

type GetBooksParams = {
  id?: string;
  q?: string;
};
export async function getBooks({ id, q }: GetBooksParams, translation: string) {
  if (id) {
    return db
      .select()
      .from(book)
      .where(and(eq(book.id, id), eq(book.translation, translation)));
  } else if (q) {
    return db
      .select()
      .from(book)
      .where(
        and(
          eq(book.translation, translation),
          or(
            ilike(book.name, q),
            ilike(book.abbrev, q),
            ilike(book.testament, q)
          )
        )
      );
  }

  return db.select().from(book).where(eq(book.translation, translation));
}
