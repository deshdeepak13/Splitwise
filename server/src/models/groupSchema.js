// models/Group.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [{
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  isSecret: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default',
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expenses: [{
    type: Types.ObjectId,
    ref: 'Expense',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('Group', groupSchema);
