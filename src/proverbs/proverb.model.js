import mongoose from 'mongoose';

const ProverbSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be provided. 1-100 chars'],
      minlength: 1,
      maxlength: 100,
    },
    content: {
      type: String,
      required: [true, 'content must be provided.'],
    },
    author: {
      type: String,
      required: [true, 'author must be provided'],
    },
    description: {
      type: String,
    },
    group: {
      type: String,
      required: [true, 'group must be provided. 2-50 characters'],
      maxlength: 50,
      minlength: 2,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

export default mongoose.model('Proverb', ProverbSchema)
