import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { bookRoutes } from './routes/get-book-route'
import { env } from './env'
import { errorHandler } from './error/errorHandler'
import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { translationsRoutes } from './routes/get-translations-route'
import { verseRoutes } from './routes/get-verses-route'

const app = fastify({})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Viva API',
      version: '0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(bookRoutes)
app.register(verseRoutes)
app.register(translationsRoutes)

app.listen({ port: env.PORT }, (error) => {
  if (error) {
    console.log(error)
  }

  console.log(`Server listening at port ${env.PORT}`)
})
