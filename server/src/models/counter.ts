import Mongoose from "mongoose";
import { CounterType } from "src/config/type.js";

const CounterSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sequence_value: {
    type: Number,
    default: 0,
  },
});

const Counter = Mongoose.model<CounterType>("Counter", CounterSchema);

export default Counter;
