// models/Message.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const messageSchema = new Schema({
  groupId: {
    type: Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  sender: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  mentions: [{
    type: Types.ObjectId,
    ref: 'Expense',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('Message', messageSchema);
