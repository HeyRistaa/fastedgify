import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { addActor } from "../db/queries/actor";
import z from "zod";

export default async function actorController(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      response: {
        200: z.object({
          id: z.string().uuid(),
        }),
        404: z.object({
          message: z.string()
        })
      },
      body: z.object({
        name: z.string()
      })
    },
  }, async function (
    request: FastifyRequest,
    reply: FastifyReply
  ) { 
    const query = request.body as { name: string };
    const actor = await addActor(query.name);

    if (actor === null) {
      reply.status(404).send({ message: "No actor added" });
      return;
    }
    
    reply.send(actor);
  })
}
