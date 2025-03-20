import mongoose from 'mongoose';


import { kindOfActivity } from './activity.model';

const GoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A goal needs a title (2 - 50 chars).'],
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    starts: {
      type: Date,
      required: [true, 'Goal must have a start date'],
    },
    ends: {
      type: Date,
      required: [true, 'Goal must have an end date'],
    },
    distance: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
      default: 0,
    },
    activities: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Goal', GoalSchema);
