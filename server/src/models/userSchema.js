import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      // required: true,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    profilePic: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      default: "INR",
    },
    theme: {
      type: String,
      default: "light",
    },
    goals: [
      {
        type: Types.ObjectId,
        ref: "Goal",
      },
    ],
    // friends: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    resetToken: String,
    resetTokenExpiry: Date,

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
