import Mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  AdminType,
  CustomerType,
  DeliveryPartnerType,
} from "src/config/type.js";

// Base user schema
const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Customer", "Admin", "DeliveryPartner"],
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

// Customer schema
const CustomerSchema = new Mongoose.Schema({
  ...UserSchema.obj,
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["Customer"],
    default: "Customer",
  },
  liveLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  address: {
    type: String,
  },
});

const DeliveryPartnerSchema = new Mongoose.Schema({
  ...UserSchema.obj,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["DeliveryPartner"],
    default: "DeliveryPartner",
  },
  liveLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  address: {
    type: String,
  },
  branch: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

const AdminSchema = new Mongoose.Schema({
  ...UserSchema.obj,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin"],
    default: "Admin",
  },
});

// encrypt the password before saving it to the database, this is a middleware of mongodb
DeliveryPartnerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// create a model for each schema
const Customer = Mongoose.model<CustomerType>("Customer", CustomerSchema);
const DeliveryPartner = Mongoose.model<DeliveryPartnerType>(
  "DeliveryPartner",
  DeliveryPartnerSchema
);
const Admin = Mongoose.model<AdminType>("Admin", AdminSchema);

export { Customer, DeliveryPartner, Admin };
