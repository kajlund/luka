import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required. 2-100 chars'],
      minlength: 2,
      maxlength: 100,
    },
    url: {
      type: String,
      required: [true, 'URL is required.'],
    },
    description: {
      type: String
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.model('Resource', ResourceSchema);


