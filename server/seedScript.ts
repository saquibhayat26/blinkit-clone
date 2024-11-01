import "dotenv/config";
import Mongoose from "mongoose";

import { categories, products } from "./seedData.js";

import { Admin, Category, Product } from "./src/models/index.js";

async function seedDatabase() {
  try {
    await Mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryDocs = await Category.insertMany(categories);
    const categoryMap = categoryDocs.reduce<Record<string, string>>(
      (map, category) => {
        map[category.name] = category._id.toString();
        return map;
      },
      {}
    );
    const productWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));
    await Product.insertMany(productWithCategoryIds);
    console.log("Database seeded successfully ✅");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    Mongoose.connection.close();
  }
}

seedDatabase();

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

export const createDummyAdminUser = async () => {
  try {
    const admin = await Admin.findOne({ email: DEFAULT_ADMIN.email });
    if (!admin) {
      // const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
      const adminUser = new Admin({
        name: "Admin",
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password,
        role: "Admin",
        isActivated: true,
      });
      await adminUser.save();
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};
