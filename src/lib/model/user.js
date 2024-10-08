import { Password } from "@phosphor-icons/react";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, "Please fill a valid 10-digit mobile number"],
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Please fill a valid 6-digit pincode"],
  },
  password:{
    type:String,
    required: true,
    trim: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile model from schema

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
