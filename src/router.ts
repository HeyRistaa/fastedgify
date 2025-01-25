import { FastifyInstance } from "fastify";
import {
  indexController,
  actorController,
  movieController,
  userController
} from "./controller";

import cors from '@fastify/cors';

export default async function router(fastify: FastifyInstance) {
  //TODO: Set cors
  fastify.register(cors, {
  })
  
  const routes = [
    { controller: userController, prefix: "/api/v1/user" },
    { controller: movieController, prefix: "/api/v1/movie" },
    { controller: actorController, prefix: "/api/v1/actor" },
    { controller: indexController, prefix: "/" }
  ];

  for (const { controller, prefix } of routes) {
    fastify.register(controller, { prefix });
  }
}
