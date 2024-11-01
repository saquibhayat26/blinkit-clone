import Mongoose from "mongoose";
import { ProductType } from "src/config/type.js";

const ProductSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  quantity: {
    type: String,
    required: true,
  },
  category: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = Mongoose.model<ProductType>("Product", ProductSchema);

export default Product;
