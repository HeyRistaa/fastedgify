// Create user controller with clerk
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import 'dotenv/config'
import { clerkClient as clerk, WebhookEvent } from "@clerk/fastify";
import z from "zod";
import { Webhook } from "svix";
import { addUser } from "../db/queries/user";

type User = {
  firstName: string,
  lastName: string,
  emailAddress: string,
  password: string
}

// TODO: Add clerk
export default async function userController(fastify: FastifyInstance) {
  // Create new user
  fastify.post('/', {
    schema: {
      body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        emailAddress: z.string().email(),
        password: z.string()
      }),
      response: {
        201: z.object({
          user: z.any()
        }),
        400: z.object({
          error: z.string()
        })
      }
    }
  }, async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { firstName, lastName, emailAddress, password } = request.body as User;
      
      const isUserExist = await clerk.users.getUserList({
        emailAddress: [emailAddress]
      })

      if (isUserExist.data.length > 0) {
        reply.status(400).send({ error: "User already exists" });
        return;
      }
      
      const user = await clerk.users.createUser({
        firstName,
        lastName,
        emailAddress: [emailAddress],
        password,
      });

      if (!user) {
        reply.status(400).send({ error: "Failed to create user" });
        return;
      }

      const newUser = await addUser(emailAddress, firstName, lastName, user.id, password);

      if (!newUser) {
        reply.status(400).send({ error: "Failed to add user to database" });
        return;
      }
      
      reply.status(201).send({ user });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  })

  // Get user by email
  fastify.get('/email/:email', {
    schema: {
      params: z.object({
        email: z.string().email()
      }),
      response: {
        200: z.object({
          user: z.any()
        }),
        400: z.object({
          error: z.string()
        }),
        404: z.object({
          error: z.string() 
        })
      }
    }
  }, async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = request.params as { email: string };
      
      const users = await clerk.users.getUserList({
        emailAddress: [email]
      });

      if (users.data.length === 0) {
        reply.status(404).send({ error: "User not found" });
        return;
      }

      reply.status(200).send({ user: users.data[0] });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  })

  // Clerk webhook
  fastify.post('/webhook', {
    config: {
      raw: {
        body: true
      }
    }
  }, async function(request: FastifyRequest, reply: FastifyReply) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      reply.status(500).send({ error: "Webhook secret is not set" });
      return;
    }

    const header = request.headers;
    const payload = request.body;

    const svix_id = header['svix-id'];
    const svix_timestamp = header['svix-timestamp'];
    const svix_signature = header['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      reply.status(400).send({ error: "Webhook request missing svix headers" });
      return;
    }

    console.log('xd');
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    try {
      evt = wh.verify(JSON.stringify(payload), {
        "svix-id": svix_id as string,
        "svix-timestamp": svix_timestamp as string,
        "svix-signature": svix_signature as string
      }) as WebhookEvent
    } catch (err) {
      reply.status(403).send({ error: "Failed to verify webhook signature" });
      return;
    }

    if (evt) {
      const eventType = evt.type;
      const { id } = evt.data;

      if (eventType === "user.created") {
        console.log(`User created: ${id}, ADD TO DATABASE!!!`);
      }
    }
  })
}
