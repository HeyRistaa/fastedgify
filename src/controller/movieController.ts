import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getMoviesByName, getMoviesByActorName } from "../db/queries/movie";
import type { Movie } from "../db/types/db-types";
import z from "zod";

export default async function movieController(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      response: {
        200: z.array(z.object({
          title: z.string(),
          actors: z.array(z.object({
            name: z.string()
          }))
        })),
        404: z.object({
          message: z.string()
        })
      },
      querystring: z.object({
        name: z.string().optional(),
        actor: z.string().optional()
      }),
    },
  }, async function (
    request: FastifyRequest,
    reply: FastifyReply
  ) { 
    const query = request.query as { name: string, actor: string };
    const movieName = query.name;
    const actorName = query.actor;
  
    let movies: Movie[] | null = movieName ? await getMoviesByName(movieName) : actorName ? await getMoviesByActorName(actorName) : [];
    
    if (movies === null) {
      reply.status(404).send({ message: "No movies found" });
      return;
    }
    
    reply.send(movies);
  })
}
