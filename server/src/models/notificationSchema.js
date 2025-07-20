// models/Notification.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const notificationSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['expense', 'settlement', 'reminder', 'goal', 'system'],
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('Notification', notificationSchema);
