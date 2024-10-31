import Mongoose from "mongoose";
import { BranchType } from "src/config/type.js";

// Base Branch schema ( Branch Schema is kind of store in one particular area )
const BranchSchema = new Mongoose.Schema({
  name: {
    type: String,
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
  deliveryPartners: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
    },
  ],
});

const Branch = Mongoose.model<BranchType>("Branch", BranchSchema);
export default Branch;
