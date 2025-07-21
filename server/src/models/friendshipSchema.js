import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const friendshipSchema = new Schema({
  requester: { type: Types.ObjectId, ref: "User", required: true },
  recipient: { type: Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "blocked"],
    default: "pending"
  }
}, { timestamps: true });

export default model("Friendship", friendshipSchema);