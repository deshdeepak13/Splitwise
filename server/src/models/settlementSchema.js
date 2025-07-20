// models/Settlement.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const settlementSchema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  method: {
    type: String,
    enum: ['UPI', 'Cash', 'Razorpay', 'BankTransfer', 'Other'],
    default: 'Other',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('Settlement', settlementSchema);
