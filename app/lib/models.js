import mongoose from "mongoose";
import { uuid } from "uuidv4";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

const productSchema = new mongoose.Schema(
  {
    apparatus: {
      type: String,
      required: true,
      unique: true,
    },
    cat: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true },
);

const transactionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuid(),
    },
    userID: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    products: {
      type: Array,
      required: true,
    },
    approved: {
      type: Boolean,
      default: "false",
    },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
