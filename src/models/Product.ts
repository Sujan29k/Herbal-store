import mongoose, { Schema, Document, models } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  image: string; // Base64 image
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // base64
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false, // optional: removes `__v`
  }
);

// Reuse the model if already compiled
const Product = models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
