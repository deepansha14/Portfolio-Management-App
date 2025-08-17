import { NextResponse } from "next/server";
import { saveOtp } from "@/lib/otpStore";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";


const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function saveOtpToDynamoDB(email: string, emailOtp: string) {
  const expires = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
  const params = {
    TableName: process.env.DYNAMO_USER_TABLE_NAME,
    Key: { email: { S: email } },
    UpdateExpression: "SET otp = :otp, otpExpires = :expires",
    ExpressionAttributeValues: {
      ":otp": { S: emailOtp },
      ":expires": { N: expires.toString() },
    },
  };
  await dynamoClient.send(new UpdateItemCommand(params));
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

  // Generate OTPs
  const emailOtp = generateOtp();
  console.log("[DEBUG] Generated OTP:", emailOtp, "for email:", email);
  // For demo, we don't send SMS OTP, just use Firebase client-side

  // Send email OTP via Brevo
  try {
    await sendEmailOtp(email, emailOtp);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to send email OTP" }, { status: 500 });
  }
  // Store OTP in DynamoDB
  await saveOtpToDynamoDB(email, emailOtp);

  return NextResponse.json({ success: true });
}
