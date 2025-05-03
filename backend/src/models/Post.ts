import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Define the Post interface
interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Post schema
const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  content: {
    type: String,
    required: [true, "Please add content"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Update the updatedAt field before saving
PostSchema.pre<IPost>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Post: Model<IPost> = mongoose.model<IPost>("Post", PostSchema);

export default Post;
