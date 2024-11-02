import Mongoose from "mongoose";
import { OrderType } from "src/config/type.js";
import Counter from "./counter.js";

const OrderSchema = new Mongoose.Schema({
  orderId: {
    // Unique order ID - #ORDER00001
    type: String,
    unique: true,
  },
  customer: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  deliveryPartner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "DeliveryPartner",
  },
  branch: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  products: [
    {
      id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      item: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  pickupLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
  },
  deliveryPersonLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: [
      // "pending",
      "available",
      "confirmed",
      "arriving",
      "delivered",
      "cancelled",
    ],
    default: "available",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

async function getNextSequenceValue(sequenceName: string) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

OrderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const sequenceValue = await getNextSequenceValue("orderId");
    this.orderId = `#ORDER${sequenceValue.toString().padStart(4, "0")}`;
  }
  next();
});

const Order = Mongoose.model<OrderType>("Order", OrderSchema);

export default Order;
