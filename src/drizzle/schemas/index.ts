import { relations } from "drizzle-orm";
import { book } from "./book";
import { verse } from "./verse";

const verseRelations = relations(verse, ({ one }) => ({
  book: one(book, {
    fields: [verse.id],
    references: [book.id],
  }),
}));

const bookRelations = relations(book, ({ many }) => ({
  verses: many(verse),
}));

export const schemas = {
  verse,
  book,
  verseRelations,
  bookRelations,
};
