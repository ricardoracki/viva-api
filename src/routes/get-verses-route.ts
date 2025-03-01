import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getVerses } from '../functions/verses/get-verses'
import z from 'zod'

export const verseRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/verses/:translation',
    {
      schema: {
        summary: 'Get a verse list',
        description: 'Query format: ?q=(abbrev) chapter:start-end',
        tags: ['verse'],
        params: z.object({
          translation: z.string(),
        }),
        querystring: z.object({
          book: z.string().optional(),
          chapter: z.coerce.number().optional(),
          start: z.coerce.number().optional(),
          stop: z.coerce.number().optional(),
          amount: z.coerce.number().optional(),
          page: z.coerce.number().optional(),
          perpage: z.coerce.number().optional(),
          find: z.string().optional(),
          id: z.string().optional(),
        }),

        response: {
          200: z.object({
            count: z.number(),
            pages: z.number(),
            page: z.number(),
            verses: z.array(
              z.object({
                id: z.string(),
                content: z.string(),
                index: z.number(),
                chapter: z.number(),
                book: z.object({
                  id: z.string(),
                  name: z.string(),
                  abbrev: z.string(),
                }),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getVerses(request.query, request.params.translation)

      return reply.send(result)
    }
  )
}
