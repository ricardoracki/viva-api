import { FastifyRegister } from "fastify";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequestError } from "../error/errors";

export const signRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/signup",
    {
      schema: {
        summary: "Sign up",
        tags: ["sign"],
        operationId: "signUp",
        body: z.object({
          name: z.string(),
          phoneNumber: z.string(),
          password: z.string(),
        }),
        resposne: {
          201: null,
        },
      },
    },
    async (request, reply) => {
      const { name, password, phoneNumber } = request.body;

      return reply.status(201).send();
    }
  );
};
