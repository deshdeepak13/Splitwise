// models/CurrencyRate.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const currencyRateSchema = new Schema({
  base: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  target: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default model('CurrencyRate', currencyRateSchema);
