import fastify from "fastify";
import { authRoutes } from "./auth.js";

const prefix = "/api";

export const registerRoutes = async (fastify: fastify.FastifyInstance) => {
  fastify.register(authRoutes, { prefix: prefix });
};
