import app from "./app";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.listen({ port: FASTIFY_PORT });

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
