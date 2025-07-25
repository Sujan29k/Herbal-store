import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  address?: string;
  cart: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: { type: String },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.User || mongoose.model<IUser>("User", UserSchema);
