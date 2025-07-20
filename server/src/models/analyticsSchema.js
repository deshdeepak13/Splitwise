// models/Analytics.js
import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const analyticsSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String,
    required: true,
    match: /^[0-9]{4}-(0[1-9]|1[0-2])$/, // Format: YYYY-MM
  },
  categorySummary: {
    type: Map,
    of: Number,
    default: {},
  },
  trendData: {
    type: Map,
    of: Schema.Types.Mixed, // Flexible for AI-generated summaries
    default: {},
  },
}, { timestamps: true });

export default model('Analytics', analyticsSchema);
