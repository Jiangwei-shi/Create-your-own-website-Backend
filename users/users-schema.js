import mongoose from "mongoose";

const styleOneDataSchema = new mongoose.Schema({
  firstPicture: String,
  firstSentence: String,
  secondSentence: String,
  secondPicture: String,
  thirdSentence: String,
  fourthSentence: String,
  thirdPicture: String,
  fifthSentence: String,
  sixthSentence: String,
  fourthPicture: String,
  seventhSentence: String
});

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user", "guest", "moderator"],
    },
    styleOneData: styleOneDataSchema,
  },
  { collection: "users" }
);

export default usersSchema;
