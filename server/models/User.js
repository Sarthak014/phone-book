import mongoose from "mongoose";

// Schema Definition
const schemaDefinition = {
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    trim: true,
    unique: true,
    required: [true, "Phone Numner is required"],
  },
};

// Schema
const userSchema = new mongoose.Schema(schemaDefinition, {
  collection: "User",
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
});

// Index
userSchema.index({ userId: 1, createdAt: 1, updatedAt: 1 });

// Model
const User = mongoose.model("User", userSchema);

export default User;
