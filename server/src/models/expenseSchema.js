// models/Expense.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const expenseSchema = new Schema({
  groupId: {
    type: Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  paidBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
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
  splitBetween: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  splitType: {
    type: String,
    enum: ['equal', 'percentage', 'exact'],
    default: 'equal',
  },
  splitDetails: {
    type: Map,
    of: Number, // userId (string) -> amount
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('Expense', expenseSchema);
