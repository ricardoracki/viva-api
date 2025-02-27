import { FastifyRegister } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createBook } from "../functions/books/create-book";
import { getBooks } from "../functions/books/get-books";

export const signRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/books/:translation",
    {
      schema: {
        summary: "Get a book",
        tags: ["book"],
        params: z.object({
          translation: z.string(),
        }),
        querystring: z.object({
          id: z.string().optional(),
          q: z.string().optional(),
        }),

        response: {
          200: {
            books: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                abbrev: z.string(),
                translation: z.string(),
                testament: z.enum(["old", "new"]),
              })
            ),
          },
        },
      },
    },
    async (request, reply) => {
      const result = await getBooks(request.query, request.params.translation);

      return reply.send({ books: result });
    }
  );

  app.post(
    "/books",
    {
      schema: {
        summary: "Create a book",
        tags: ["book"],
        body: z.object({
          name: z.string(),
          abbrev: z.string(),
          translation: z.string(),
          testament: z.enum(["old", "new"]),
        }),
        resposne: {
          201: null,
        },
      },
    },
    async (request, reply) => {
      const result = await createBook(request.body);

      return reply.status(201).send(result);
    }
  );
};
