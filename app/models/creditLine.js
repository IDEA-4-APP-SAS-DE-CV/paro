import { Schema, model, models } from 'mongoose';

const creditLineSchema = new Schema({
  creditLine: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  loans: {
    type: Array,
  },
  userId: {
    type: String,
    required: true,
  },
  availableBalance: {
    type: Number,
    required: true,
    trim: true,
  },
  renewable: {
    type: Boolean,
    required: true,
  },
  riskAnalysis: {
    type: Object
  },
  tna: {
    type: Number,
    required: true,
  }
},{
  timestamps: true,
});

export default models.CreditLine || model('CreditLine', creditLineSchema);
