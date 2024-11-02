import jwt from "jsonwebtoken";
import { ACCESS_T } from "../config/config.js";

export const verifyToken = async (req: any, reply: any) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ message: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    const decodeToken = jwt.verify(token, ACCESS_T);

    req.user = decodeToken;
    return true;
  } catch (error) {
    return reply.status(403).send({ message: "Invalid or expired Token" });
  }
};
