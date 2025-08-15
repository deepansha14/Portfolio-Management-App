import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
// We'll remove bcryptjs for now since it's not installed
import { cookies } from "next/headers";
import routes from "@/lib/routes";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // In a real application, you would fetch the user from your database
    // For this example, we'll use mock users
    let user;

    if (email === "investor@example.com" && password === "demo123") {
      user = {
        id: "client-1",
        name: "Sarah Johnson",
        email: "investor@example.com",
        role: "investor",
        password: "demo123", // In real app, this would be a hashed password
      };
    } else if (
      email === "advisor@portfoliomanager.com" &&
      password === "admin123"
    ) {
      user = {
        id: "admin-1",
        name: "John Smith",
        email: "advisor@portfoliomanager.com",
        role: "admin",
        password: "admin123", // In real app, this would be a hashed password
      };
    } else {
      // In a real app, you would check if the user exists and verify the password
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = await generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookies
    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
