import gravatar from 'gravatar';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: [true, 'Email must be unique'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    alias: {
      type: String,
      required: [true, 'Please provide an alias between 3 and 20 characters'],
      maxlength: 20,
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, 'Please provide password. Min 8 chars'],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['prospect', 'user', 'admin'],
      default: 'prospect',
    },
  },
  {
    timestamps: true,
    virtuals: {
      picture: {
        get() {
          return gravatar.url(this.email, { s: '50' });
        }
      }
    }
  },
)

export default mongoose.model('User', UserSchema)
