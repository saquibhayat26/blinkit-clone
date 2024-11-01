import "dotenv/config";
import fastifySession from "@fastify/session";
// import bcrypt from "bcryptjs";
import ConnectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/index.js";

const MongoDBStore = ConnectMongoDBSession(fastifySession as any);

export const URI = process.env.MONGO_URI as string;
export const PORT = (process.env.PORT as unknown as number) ?? 3000;
export const PRODUCTION = process.env.NODE_ENV === "production";
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD as string;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;

// session store
export const sessionStore = new MongoDBStore({
  uri: URI,
  collection: "sessions",
});

// check for any errors
sessionStore.on("error", function (error) {
  console.log(error);
});

// authenticate the admin
export const authenticateAdmin = async (email: string, password: string) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid Credentials");
    }
    // const isPasswordValid = await bcrypt.compare(password, admin.password);
    // if (!isPasswordValid) {
    //   return Promise.reject(new Error("Invalid Credentials"));
    // }
    return Promise.resolve({ email: email, password: password });
  } catch (error) {
    console.error("Error authenticating admin:", error);
    throw error;
  }
};
