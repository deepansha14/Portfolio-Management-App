import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";

// Configure your DynamoDB region and table name
const REGION = process.env.AWS_REGION || "us-east-1";
const TABLE_NAME = process.env.DYNAMO_USER_TABLE_NAME || "Users";

const ddbClient = new DynamoDBClient({ region: REGION });

function generateUserId() {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Generate a unique userId if not provided
    if (!data.id) {
      data.id = generateUserId();
    }
    
    // Hash the password before storing
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    
    // Prepare the item for DynamoDB with userId as primary key
    const Item = {
      userId: { S: data.id }, // Primary key
      email: { S: data.email },
      name: { S: data.name },
      password: { S: data.password },
      userType: { S: data.userType },
      createdAt: { S: new Date().toISOString() },
      isActive: { BOOL: true }
    };
    
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item,
    });
    
    console.log("[DEBUG] Creating user with userId:", data.id);
    await ddbClient.send(command);
    console.log("[DEBUG] User created successfully in DynamoDB");
    
    return NextResponse.json({ 
      success: true, 
      userId: data.id,
      message: "User registered successfully" 
    });
  } catch (error: any) {
    console.error("[DEBUG] User registration failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Registration failed" 
    }, { status: 500 });
  }
}
