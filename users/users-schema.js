import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    selfFullName: String,
    coupleFullName: String,
    selfAvatarUrl: String,
    coupleAvatarUrl: String,
    dob: String,
    websiteStyle:  {
      type: String,
      default: "style 1",
      enum: ["style 1", "style 2", "style 3"],
    },
    createdAt: { type: Date, default: Date.now },
    bio: String,
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "guest", "moderator"],
    },
    styleOnePhotos:[String],
    BackgroundMusic: String,
  },
  { collection: "users" }
);

export default usersSchema;
