import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePictureUrl: {
    type: String,
    default: "/assets/profile/default.png",
  },
  hardSkills: {
    type: Array,
    default: [],
  },
  softSkills: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;