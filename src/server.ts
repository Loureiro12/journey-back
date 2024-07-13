import fastify from 'fastify';
import cors from '@fastify/cors';
import { createTrips } from './routes/create-trip';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrips } from './routes/confirm-trip';

const app = fastify();

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrips)
app.register(confirmTrips)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
});