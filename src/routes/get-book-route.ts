import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getBooks } from '../functions/books/get-books'
import z from 'zod'

export const bookRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/books/:translation',
    {
      schema: {
        summary: 'Get a book list',
        tags: ['book'],
        params: z.object({
          translation: z.string(),
        }),
        querystring: z.object({
          id: z.string().optional(),
          q: z.string().optional(),
          testament: z.enum(['old', 'new']).optional(),
        }),

        response: {
          200: z.object({
            books: z.array(
              z.object({
                name: z.string(),
                abbrev: z.string(),
                id: z.string(),
                testament: z.enum(['old', 'new']),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getBooks(request.query, request.params.translation)

      return reply.send(result)
    }
  )
}
