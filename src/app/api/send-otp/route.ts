import { NextResponse } from "next/server";
import { saveOtp } from "@/lib/otpStore";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

function generateTempUserId() {
  return `otp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function saveOtpToDynamoDB(email: string, emailOtp: string) {
  const expires = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  
  try {
    // Generate a temporary userId for OTP storage
    // This will be used to create the actual user record after OTP verification
    const tempUserId = generateTempUserId();
    
    // Store OTP in DynamoDB using userId as the primary key
    const params = {
      TableName: process.env.DYNAMO_USER_TABLE_NAME,
      Item: {
        userId: { S: tempUserId },
        email: { S: email },
        otp: { S: emailOtp },
        otpExpires: { N: expires.toString() },
        otpType: { S: "registration" },
        createdAt: { S: new Date().toISOString() },
        isTempUser: { BOOL: true } // Flag to identify temporary OTP records
      }
    };
    
    console.log("[DEBUG] Storing OTP in DynamoDB with tempUserId:", tempUserId);
    await dynamoClient.send(new PutItemCommand(params));
    console.log("[DEBUG] Successfully stored OTP in DynamoDB");
    return true;
  } catch (error: any) {
    console.error("[DEBUG] DynamoDB OTP storage failed:", error);
    
    // If it's a schema validation error, the table structure might be different
    if (error.name === 'ValidationException') {
      console.error("[DEBUG] Schema validation error. Table structure might not support the required attributes.");
      console.error("[DEBUG] Error details:", error.message);
      
      // Fall back to in-memory storage
      console.log("[DEBUG] Falling back to in-memory OTP storage");
      try {
        await saveOtp(email, emailOtp, expires);
        console.log("[DEBUG] Successfully saved OTP to in-memory store");
        return true;
      } catch (memError) {
        console.error("[DEBUG] In-memory storage also failed:", memError);
        return false;
      }
    }
    
    // For other errors, try in-memory storage as fallback
    console.log("[DEBUG] Trying in-memory OTP storage as fallback");
    try {
      await saveOtp(email, emailOtp, expires);
      console.log("[DEBUG] Successfully saved OTP to in-memory store");
      return true;
    } catch (memError) {
      console.error("[DEBUG] In-memory storage failed:", memError);
      return false;
    }
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOtp(email: string, otp: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not defined in environment variables");
  }
  const payload = {
    sender: { email: "adlakhadeepansha@gmail.com", name: "Portfolio App" },
    to: [{ email }],
    subject: "Your OTP Code",
    htmlContent: `<p>Your OTP code is <b>${otp}</b></p>`,
  };
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    } as Record<string, string>,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error("Brevo send error", error);
    throw new Error("Failed to send email OTP");
  }
}

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log("[DEBUG] Sending OTP to email:", email);
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const emailOtp = generateOtp();
  console.log("[DEBUG] Generated OTP:", emailOtp, "for email:", email);

  try {
    await sendEmailOtp(email, emailOtp);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to send email OTP" }, { status: 500 });
  }

  // Store OTP in DynamoDB (or fallback to in-memory)
  const storageSuccess = await saveOtpToDynamoDB(email, emailOtp);
  
  if (!storageSuccess) {
    console.warn("[DEBUG] OTP storage failed, but email was sent. User may not be able to verify.");
    // Still return success since email was sent, but log the storage failure
  }

  return NextResponse.json({ success: true });
}
