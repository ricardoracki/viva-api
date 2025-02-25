import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { BadRequestError } from "./errors";

export const errorHandler = (
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Erros de validação do zod
  if (error.code == "FST_ERR_VALIDATION") {
    return reply.status(400).send({ message: error.message });
  }
  // Erros lancados manualmente
  if (error instanceof BadRequestError) {
    return reply.status(400).send({ message: error.message });
  }

  reply.status(500).send({ message: "Internal server error" });
};
