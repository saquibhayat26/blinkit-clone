import { Category } from "../../models/index.js";

export const getAllCategories = async (req: any, reply: any) => {
  try {
    const categories = await Category.find();
    return reply.send({ categories: categories });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
