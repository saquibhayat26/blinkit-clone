import fastify from "fastify";
import {
  fetchUser,
  generateRefreshToken,
  loginCustomer,
  loginDeliveryPartner,
} from "./../controllers/auth/auth.js";
import { verifyToken } from "./../middleware/auth.js";
import { updateUser } from "../controllers/tracking/user.js";

export const authRoutes = async (
  fastify: fastify.FastifyInstance,
  options: fastify.FastifyPluginOptions
) => {
  fastify.post("/customer/login", loginCustomer);
  fastify.post("/delivery/login", loginDeliveryPartner);
  fastify.post("/refresh-token", generateRefreshToken);
  fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
  fastify.patch("/user", { preHandler: [verifyToken] }, updateUser);
};
