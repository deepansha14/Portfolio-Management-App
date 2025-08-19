import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, investorData } = data;

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: "userId is required" 
      }, { status: 400 });
    }

    if (!investorData) {
      return NextResponse.json({ 
        success: false, 
        error: "investor data is required" 
      }, { status: 400 });
    }

    // Prepare the item for DynamoDB with userId as primary key
    const Item = {
      userId: { S: userId }, // Primary key
      personalInfo: { S: JSON.stringify(investorData.personal) },
      familyDetails: { S: JSON.stringify(investorData.family) },
      nomineeInvestment: { S: JSON.stringify(investorData.nominee) },
      incomeDetails: { S: JSON.stringify(investorData.income) },
      expenses: { S: JSON.stringify(investorData.expenses) },
      residual: { S: JSON.stringify(investorData.residual) },
      investments: { S: JSON.stringify(investorData.investments) },
      bonuses: { S: JSON.stringify(investorData.bonuses) },
      existingAssets: { S: JSON.stringify(investorData.existingAssets) },
      createdAt: { S: new Date().toISOString() },
      updatedAt: { S: new Date().toISOString() },
      status: { S: "submitted" }
    };

    const command = new PutItemCommand({
      TableName: process.env.DYNAMO_INVESTOR_TABLE_NAME || "Investor-details",
      Item,
    });

    console.log("[DEBUG] Saving investor details for userId:", userId);
    await dynamoClient.send(command);
    console.log("[DEBUG] Investor details saved successfully in DynamoDB");

    return NextResponse.json({ 
      success: true, 
      message: "Investor details saved successfully",
      userId: userId
    });

  } catch (error: any) {
    console.error("[DEBUG] Failed to save investor details:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to save investor details" 
    }, { status: 500 });
  }
}
