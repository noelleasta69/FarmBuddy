import dbConnect from "@/lib/dbConnect.js";
import Farmer from "@/models/Farmer.js";
import Vet from "@/models/Vet.js";
import Worker from "@/models/Worker.js";
import cookie from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  try {
    const options = {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
      sameSite: 'strict',
    };
    const { mobile, password, type } = await req.json();

    console.log(mobile, password, type)
    
    if (!mobile || !password || !type) {
      throw new Error("All fields must be entered");
    }
    
    let user;
    if (type === "farmer") {
      user = await Farmer.findOne({ mobileNumber: mobile });
    } else if (type === "doctor") {
      user = await Vet.findOne({ mobileNumber: mobile });
    } else if (type === "worker") {
      user = await Worker.findOne({ mobileNumber: mobile });
    } else {
      throw new Error("Invalid user type");
    }
    
    console.log(user);
    if (!user) throw new Error("Invalid Username");
    
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new Error("Invalid Password");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove password and refresh token before sending the response
    user.password = undefined;
    user.refreshToken = undefined;

    const serializedCookie = cookie.serialize('accessToken', accessToken, options);

    const response = NextResponse.json({ message: "Logged in successfully", user }, { status: 200 });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
