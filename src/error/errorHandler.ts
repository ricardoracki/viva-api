import type { FastifyReply, FastifyRequest } from 'fastify'

import { BadRequestError } from './errors'

export const errorHandler = (
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Erros de validação do zod
  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({ message: error.message })
  }
  // Erros lancados manualmente
  if (error instanceof BadRequestError) {
    return reply.status(400).send({ message: error.message })
  }

  console.log(error)
  reply.status(500).send({ message: 'Internal server error' })
}
