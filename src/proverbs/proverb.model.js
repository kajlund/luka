import mongoose from 'mongoose';

// List of allowed categories
export const categories = ['IT', 'Misc.', 'Science', 'Secular']
export const languages = ['eng', 'swe', 'fin']

const ProverbSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be provided. 3 - 100 chars'],
      minlength: 3,
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
    lang: {
      type: String,
      default: 'eng',
      enum: languages,
      required: [true, 'Language code must be provided.'],
    },
    category: {
      type: String,
      required: [true, 'Category must be provided.'],
      default: 'IT',
      enum: categories,
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
