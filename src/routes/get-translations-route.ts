import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllTranslations } from '../functions/translations/get-all-translations'
import z from 'zod'

export const translationsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/translations',
    {
      schema: {
        summary: 'Get all translations available!',
        tags: ['translations'],

        response: {
          200: z.object({
            translations: z.array(z.string()),
            count: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getAllTranslations()

      return reply.send(result)
    }
  )
}
