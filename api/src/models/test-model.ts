import mongoose from 'mongoose';

export const TestModel = mongoose.model(
  'TestModel',
  new mongoose.Schema({
    name: String,
  }),
);
