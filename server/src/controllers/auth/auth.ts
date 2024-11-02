import jwt, { JwtPayload } from "jsonwebtoken";
import { Customer, DeliveryPartner } from "./../../models/index.js";
import {
  ACCESS_T,
  ACCESS_T_EXPIRY,
  REFRESH_T,
  REFRESH_T_EXPIRY,
} from "./../../config/config.js";
import { error } from "console";

const generateToken = (user: any) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    ACCESS_T,
    { expiresIn: ACCESS_T_EXPIRY }
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    REFRESH_T,
    { expiresIn: REFRESH_T_EXPIRY }
  );

  return { accessToken, refreshToken };
};

export const loginCustomer = async (req: any, reply: any) => {
  try {
    const { phone } = req.body;
    let customer = await Customer.findOne({ phone });
    if (!customer) {
      // create a new customer
      customer = new Customer({ phone, role: "Customer", isActivated: true });
      await customer.save();
    }
    const { accessToken, refreshToken } = generateToken(customer);

    return reply.status(200).send({
      message: customer ? "Login Successful" : "Customer created and logged in",
      accessToken,
      refreshToken,
      customer,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const loginDeliveryPartner = async (req: any, reply: any) => {
  try {
    const { email, password } = req.body;
    let deliveryPartner = await DeliveryPartner.findOne({ email });
    if (!deliveryPartner) {
      return reply
        .status(404)
        .send({ message: "Delivery Partner not found", error });
    }
    const isPasswordValid = password === deliveryPartner.password;
    if (!isPasswordValid) {
      return reply.status(400).send({ message: "Invalid Credentials", error });
    }

    const { accessToken, refreshToken } = generateToken(deliveryPartner);

    return reply.status(200).send({
      message: "Login Successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const generateRefreshToken = async (req: any, reply: any) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return reply.status(401).send({ message: "Refresh token required" });
  }
  const refToken = refreshToken;
  try {
    const decodeToken = jwt.verify(refToken, REFRESH_T) as JwtPayload;
    let user;
    if (decodeToken.role === "Customer") {
      user = await Customer.findById(decodeToken.userId);
    } else if (decodeToken.role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(decodeToken.userId);
    } else {
      return reply.status(403).send({ message: "Invalid Role" });
    }

    if (!user) {
      return reply.status(404).send({ message: "Invalid User" });
    }
    const { accessToken, refreshToken } = generateToken(user);
    return reply.status(200).send({
      message: "Token Refresh Successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return reply.status(403).send({ message: "Invalid or expired Token" });
  }
};

export const fetchUser = async (req: any, reply: any) => {
  try {
    const { userId, role } = req.user;
    let user;
    if (role === "Customer") {
      user = await Customer.findById(userId);
    } else if (role === "DeliveryPartner") {
      user = await DeliveryPartner.findById(userId);
    } else {
      return reply.status(403).send({ message: "Invalid Role" });
    }

    if (!user) {
      return reply.status(404).send({ message: "Invalid User" });
    }
    return reply.status(200).send({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
