
import { NextResponse } from "next/server";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function findUserByEmail(email: string) {
  try {
    // Scan the table to find user by email since userId is the primary key
    const params = {
      TableName: process.env.DYNAMO_USER_TABLE_NAME,
      FilterExpression: "email = :email AND isActive = :isActive",
      ExpressionAttributeValues: {
        ":email": { S: email },
        ":isActive": { BOOL: true }
      }
    };
    
    const result = await dynamoClient.send(new ScanCommand(params));
    
    if (!result.Items || result.Items.length === 0) {
      return null;
    }
    
    // Return the first user found (should only be one per email)
    return result.Items[0];
  } catch (error: any) {
    console.error("[DEBUG] Failed to find user by email:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Find user by email
    const user = await findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const storedPassword = user.password?.S;
    if (!storedPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, storedPassword);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT tokens
    const accessToken = sign(
      { 
        userId: user.userId?.S, 
        email: user.email?.S, 
        userType: user.userType?.S 
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "15m" }
    );

    const refreshToken = sign(
      { 
        userId: user.userId?.S, 
        email: user.email?.S 
      },
      process.env.JWT_REFRESH_SECRET || "fallback-refresh-secret",
      { expiresIn: "7d" }
    );

    // Prepare user data (exclude password)
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    // Set cookies
    const response = NextResponse.json({ 
      success: true, 
      user: userWithoutPassword,
      message: "Login successful" 
    });

    // Set secure cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("[DEBUG] Login failed:", error);
    return NextResponse.json({ 
      error: "Login failed. Please try again." 
    }, { status: 500 });
  }
}
