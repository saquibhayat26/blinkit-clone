import Mongoose from "mongoose";
import { CategoryType } from "src/config/type.js";

const CategorySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = Mongoose.model<CategoryType>("Category", CategorySchema);

export default Category;
