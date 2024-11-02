import { Product } from "../../models/index.js";

export const getProductsByCategoryId = async (req: any, reply: any) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId })
      .select("-category")
      .exec();
    return reply.send({ products: products });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
