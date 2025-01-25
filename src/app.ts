import fastify from "fastify";
import router from "./router";
import 'dotenv/config'
import { clerkPlugin } from "@clerk/fastify";

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development")
});

// Clerk
server.register(clerkPlugin);

// Middleware: Router
server.register(router);

export default server;
