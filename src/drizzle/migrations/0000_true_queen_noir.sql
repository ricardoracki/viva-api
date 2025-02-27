CREATE TYPE "public"."testament" AS ENUM('old', 'new');--> statement-breakpoint
CREATE TABLE "verse" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"chapter" integer NOT NULL,
	"verse" integer NOT NULL,
	"book_id" uuid
);
--> statement-breakpoint
ALTER TABLE "verse" ADD CONSTRAINT "verse_book_id_verse_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."verse"("id") ON DELETE no action ON UPDATE no action;