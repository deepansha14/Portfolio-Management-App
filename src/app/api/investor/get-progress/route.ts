import { NextResponse } from "next/server";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: "userId is required" 
      }, { status: 400 });
    }

    // Retrieve saved progress from DynamoDB
    const params = {
      TableName: process.env.DYNAMO_INVESTOR_TABLE_NAME || "Investor-details",
      Key: {
        userId: { S: userId }
      }
    };

    const command = new GetItemCommand(params);
    const result = await dynamoClient.send(command);

    if (!result.Item) {
      return NextResponse.json({ 
        success: false, 
        error: "No saved progress found" 
      }, { status: 404 });
    }

    // Parse the stored JSON data
    const savedData = {
      userId: result.Item.userId?.S,
      currentStep: parseInt(result.Item.currentStep?.N || "1"),
      status: result.Item.status?.S,
      personalInfo: result.Item.personalInfo ? JSON.parse(result.Item.personalInfo.S) : {},
      familyDetails: result.Item.familyDetails ? JSON.parse(result.Item.familyDetails.S) : {},
      nomineeInvestment: result.Item.nomineeInvestment ? JSON.parse(result.Item.nomineeInvestment.S) : {},
      incomeDetails: result.Item.incomeDetails ? JSON.parse(result.Item.incomeDetails.S) : {},
      expenses: result.Item.expenses ? JSON.parse(result.Item.expenses.S) : {},
      residual: result.Item.residual ? JSON.parse(result.Item.residual.S) : {},
      investments: result.Item.investments ? JSON.parse(result.Item.investments.S) : {},
      bonuses: result.Item.bonuses ? JSON.parse(result.Item.bonuses.S) : [],
      existingAssets: result.Item.existingAssets ? JSON.parse(result.Item.existingAssets.S) : [],
      createdAt: result.Item.createdAt?.S,
      updatedAt: result.Item.updatedAt?.S
    };

    console.log("[DEBUG] Retrieved saved progress for userId:", userId);

    return NextResponse.json({ 
      success: true, 
      data: savedData
    });

  } catch (error: any) {
    console.error("[DEBUG] Failed to retrieve investor progress:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Failed to retrieve investor progress" 
    }, { status: 500 });
  }
}
