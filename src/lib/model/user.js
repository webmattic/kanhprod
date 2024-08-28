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
  password: {
    type: String,
    required: true,
    trim: true,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "products",
  },


},

  { timestamps: true }
);



const Users = mongoose.models.admindatas || mongoose.model("admindatas", UserSchema);

export default Users;
