import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, investorData, currentStep } = data;

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
      currentStep: { N: currentStep.toString() }, // Track which step was completed
      createdAt: { S: new Date().toISOString() },
      updatedAt: { S: new Date().toISOString() },
      status: { S: "in_progress" } // Different status for progress vs final submission
    };

    const command = new PutItemCommand({
      TableName: process.env.DYNAMO_INVESTOR_TABLE_NAME || "Investor-details",
      Item,
    });

    console.log("[DEBUG] Saving investor progress for userId:", userId, "at step:", currentStep);
    await dynamoClient.send(command);
    console.log("[DEBUG] Investor progress saved successfully in DynamoDB");

    return NextResponse.json({ 
      success: true, 
      message: "Progress saved successfully",
      userId: userId,
      currentStep: currentStep
    });

  } catch (error: any) {
    console.error("[DEBUG] Failed to save investor progress:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to save investor progress" 
    }, { status: 500 });
  }
}
