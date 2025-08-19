import { NextResponse } from "next/server";
import { DynamoDBClient, GetItemCommand, DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { getOtp, deleteOtp } from "@/lib/otpStore";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function findOtpRecordByEmail(email: string) {
  try {
    // Scan the table to find OTP records for the given email
    // We need to scan because userId is the primary key, not email
    const params = {
      TableName: process.env.DYNAMO_USER_TABLE_NAME,
      FilterExpression: "email = :email AND isTempUser = :isTempUser",
      ExpressionAttributeValues: {
        ":email": { S: email },
        ":isTempUser": { BOOL: true }
      }
    };
    
    const result = await dynamoClient.send(new ScanCommand(params));
    
    if (!result.Items || result.Items.length === 0) {
      console.log("[DEBUG] No OTP record found in DynamoDB for email:", email);
      return null;
    }
    
    // Get the first OTP record (should only be one per email)
    const item = result.Items[0];
    const userId = item.userId?.S;
    const otp = item.otp?.S;
    const expires = parseInt(item.otpExpires?.N || "0", 10);
    
    if (!userId || !otp || !expires) {
      console.log("[DEBUG] Invalid OTP data in DynamoDB for email:", email);
      return null;
    }
    
    console.log("[DEBUG] Found OTP record in DynamoDB for email:", email, "userId:", userId);
    return { userId, otp, expires, source: "dynamodb" as const };
  } catch (error: any) {
    console.error("[DEBUG] Failed to find OTP record in DynamoDB:", error);
    return null;
  }
}

async function clearOtpFromDynamoDB(userId: string) {
  try {
    // Clear OTP from DynamoDB after successful verification
    const params = {
      TableName: process.env.DYNAMO_USER_TABLE_NAME,
      Key: {
        userId: { S: userId }
      }
    };
    
    await dynamoClient.send(new DeleteItemCommand(params));
    console.log("[DEBUG] Successfully cleared OTP from DynamoDB for userId:", userId);
    return true;
  } catch (error: any) {
    console.error("[DEBUG] Failed to clear OTP from DynamoDB:", error);
    return false;
  }
}

async function getOtpFromAnySource(email: string) {
  // First try DynamoDB
  const dynamoOtp = await findOtpRecordByEmail(email);
  if (dynamoOtp) {
    return dynamoOtp;
  }
  
  // Fallback to in-memory storage
  const memOtp = await getOtp(email);
  if (memOtp) {
    console.log("[DEBUG] Found OTP in in-memory store for email:", email);
    return { 
      userId: `mem_${Date.now()}`, // Generate a temporary ID for in-memory records
      otp: memOtp.emailOtp, 
      expires: memOtp.expires, 
      source: "memory" as const 
    };
  }
  
  return null;
}

export async function POST(req: Request) {
  const { email, emailOtp } = await req.json();
  if (!email || !emailOtp) {
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
  }
  
  console.log("[DEBUG] Verifying OTP for email:", email);
  
  const record = await getOtpFromAnySource(email);
  console.log("[DEBUG] Retrieved OTP record:", record ? "found" : "not found");
  
  if (!record || !record.otp) {
    console.log("[DEBUG] Invalid OTP or no record found for email:", email);
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (record.otp !== emailOtp) {
    console.log("[DEBUG] OTP mismatch for email:", email);
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now > record.expires) {
    console.log("[DEBUG] OTP expired for email:", email);
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  console.log("[DEBUG] OTP successfully validated for email:", email);

  // Clear OTP from the source it was found in
  if (record.source === "dynamodb") {
    await clearOtpFromDynamoDB(record.userId);
  } else {
    await deleteOtp(email);
  }
  
  console.log("[DEBUG] OTP cleared after successful verification for email:", email);
  return NextResponse.json({ success: true });
}
