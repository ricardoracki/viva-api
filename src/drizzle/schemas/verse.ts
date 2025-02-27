import { integer, text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { book } from "./book";

export const verse = pgTable("verse", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  bookId: uuid("book_id").references(() => book.id),
});
