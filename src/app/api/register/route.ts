import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";

// Configure your DynamoDB region and table name
const REGION = process.env.AWS_REGION || "us-east-1";
const TABLE_NAME = process.env.DYNAMO_USER_TABLE_NAME || "Users";

const ddbClient = new DynamoDBClient({ region: REGION });

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Hash the password before storing
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    // Prepare the item for DynamoDB (simple string attributes)
    const Item = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, { S: String(value) }])
    );
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item,
    });
    await ddbClient.send(command);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
