import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().default("postgres://localhost:5432/drizzle"),
});

export const env = schema.parse(process.env);
