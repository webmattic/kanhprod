import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../../../lib/model/user";
import connectDB from "@/lib/db";
const saltRounds = 10;

// Connect to MongoDB (consider moving this to a separate utility file for reuse)
mongoose.connect(`${process.env.CONNECTION_STRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function handler(req, res) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      mobileNumber,
      emailId,
      country,
      state,
      city,
      street,
      pincode,
      password,
    } = req.body;

    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      await connectDB();
      await User.create({
        firstName,
        lastName,
        mobileNumber,
        emailId,
        country,
        state,
        city,
        street,
        pincode,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
