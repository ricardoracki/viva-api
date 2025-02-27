import { integer, text } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const testamentEnum = pgEnum("testament", ["old", "new"]);

export const book = pgTable("verse", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  abbrev: text("abbrev").notNull(),
  translation: text("translation").notNull(),
  testament: testamentEnum("testament"),
});
