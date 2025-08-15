import { NextRequest, NextResponse } from "next/server";
import routes from "@/lib/routes";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: "admin" | "investor";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterRequestBody;
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Create the user in your database
    // 4. Maybe send a confirmation email

    // For this example, we'll just return a success message
    return NextResponse.json(
      { success: true, message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
