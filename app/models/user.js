import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  motherLastname: {
    type: String,
    required: true,
    trim: true,
  },
  birth: {
    type: Date,
    required: true,
    trim: true,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
  },
  clabe: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  accountStatusURL: {
    type: String,
    required: true,
    trim: true,
  },
  addressFileURL: {
    type: String,
    required: true,
    trim: true
  },
  ineURL: {
    type: String,
    required: true,
    trim: true
  },
  creditLine: {
    type: Number,
    required: true,
    trim: true,
  }
},{
  timestamps: true,
});

export default models.User || model('User', userSchema);
