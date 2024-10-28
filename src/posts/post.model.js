import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A blog post must have a title. 2-100 chars'],
      minlength: 2,
      maxlength: 100,
    },
    image: {
      type: String,
    },
    description: {
      type: String
    },
    filename: {
      required: [true, 'A blog post must point to a file name. 4 - 100 chars'],
      type: String,
      minlength: 4,
      maxlength: 100,
    },
    author: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Post', PostSchema);


