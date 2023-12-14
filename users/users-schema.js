import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    profession:  {
      type: String,
      default: "Instruction Designer",
      enum: ["Instruction Designer", "UI/UX Designer", "Graphics Designer"],
    },
    createdAt: { type: Date, default: Date.now },
    location: String,
    bio: String,
    experience:  {
      type: String,
      default: "0-1 years",
      enum: ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
    },
    linkedin: String,
    avatarUrl: String,
    resumeUrl: String,
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "guest", "moderator"],
    },
  },
  { collection: "users" }
);

export default usersSchema;
