import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  userName: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  createdAt?: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    userName: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<Iuser>("User", userSchema);
