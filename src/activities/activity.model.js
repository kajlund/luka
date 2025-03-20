import mongoose from 'mongoose';

export const kindOfActivity = ['Outdoor walk', 'Indoor walk', 'Strength training', 'Yoga', 'Pilates', 'Dance', 'Swimming', 'Cycling', 'Running', 'Other'];

const ActivitySchema = new mongoose.Schema(
  {
    when: {
      type: Date,
      required: [true, 'When is required'],
    },
    what: {
      type: String,
      required: [true, 'Kind of activity is required.'],
      default: kindOfActivity[0],
      enum: kindOfActivity,
    },
    title: {
      type: String,
      required: [true, 'An activity needs a title (2 - 50 chars).'],
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    distance: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
      default: 0,
    },
    elevation: {
      type: Number,
      default: 0,
    },
    calories: {
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

export default mongoose.model('Activity', ActivitySchema);


