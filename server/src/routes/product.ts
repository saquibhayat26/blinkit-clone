import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getProductsByCategoryId } from "../controllers/product/product.js";
import { getAllCategories } from "../controllers/product/category.js";

export const categoryRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get("/categories", getAllCategories);
};

export const productRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get("/product/:categoryId", getProductsByCategoryId);
};
