import { FastifyRequest, FastifyReply } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import app from "../src/app";

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

export default async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit('request', req, res);
}
