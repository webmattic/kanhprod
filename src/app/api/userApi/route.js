import bcrypt from "bcrypt";
import User from "../../../lib/model/user";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

const saltRounds = 10;

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      firstname,
      lastname,
      mobile,
      email,
      country,
      state,
      city,
      street,
      pincode,
      password,
    } = body;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstname,
      lastName: lastname,
      mobileNumber: mobile,
      emailId: email,
      country,
      state,
      city,
      street,
      pincode,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return NextResponse.json(
    { message: "Method GET is not allowed" },
    { status: 405 }
  );
}

export async function PUT(req) {
  return NextResponse.json(
    { message: "Method PUT is not allowed" },
    { status: 405 }
  );
}

export async function DELETE(req) {
  return NextResponse.json(
    { message: "Method DELETE is not allowed" },
    { status: 405 }
  );
}
