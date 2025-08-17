import { NextResponse } from "next/server";
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

async function getOtpFromDynamoDB(email: string) {
  const params = {
    TableName: process.env.DYNAMO_USER_TABLE_NAME,
    Key: { email: { S: email } },
    ProjectionExpression: "otp, otpExpires",
  };
  const result = await dynamoClient.send(new GetItemCommand(params));
  if (!result.Item) return null;
  return {
    otp: result.Item.otp?.S,
    expires: parseInt(result.Item.otpExpires?.N || "0", 10),
  };
}

async function deleteOtpFromDynamoDB(email: string) {
  const params = {
    TableName: process.env.DYNAMO_USER_TABLE_NAME,
    Key: { email: { S: email } },
    UpdateExpression: "REMOVE otp, otpExpires",
  };
  await dynamoClient.send(new UpdateItemCommand(params));
}

export async function POST(req: Request) {
  const { email, emailOtp } = await req.json();
  if (!email || !emailOtp) {
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
  }
  const record = await getOtpFromDynamoDB(email);
  console.log("[DEBUG] Retrieved OTP record from DynamoDB:", record);
  if (!record || record.otp !== emailOtp) {
    console.log("[DEBUG] Invalid OTP or no record found");
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }
  if (Math.floor(Date.now() / 1000) > record.expires) {
    console.log("[DEBUG] OTP expired");
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }
  await deleteOtpFromDynamoDB(email);
  console.log("[DEBUG] OTP successfully validated and deleted for email:", email);
  return NextResponse.json({ success: true });
}
