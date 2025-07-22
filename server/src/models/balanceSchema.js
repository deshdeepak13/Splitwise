import mongoose from "mongoose";

const { Schema, model } = mongoose;

const balanceSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  otherBalance: { type: Number, default: 0 }, // +ve: user1 gets, -ve: user1 owes

  groupBalances: {
    type: Map,
    of: Number, // +ve: user1 gets, -ve: user1 owes
    default: {}
  },

  lastSettledAt: { type: Date }
});

// Index to make sure only one balance per user pair
balanceSchema.index({ user1: 1, user2: 1 }, { unique: true });

const Balance = model("Balance", balanceSchema);

export default Balance;
