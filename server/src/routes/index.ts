import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.js";
import { categoryRoutes, productRoutes } from "./product.js";

const prefix = "/api";

export const registerRoutes = async (fastify: FastifyInstance) => {
  await fastify.register(authRoutes, { prefix });
  await fastify.register(categoryRoutes, { prefix });
  await fastify.register(productRoutes, { prefix });
};
