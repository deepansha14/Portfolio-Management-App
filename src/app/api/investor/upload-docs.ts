import { NextRequest } from "next/server";
import formidable from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      maxFileSize: 2 * 1024 * 1024, // 2MB
      keepExtensions: true,
    });

    form.parse(
      req,
      async (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
          resolve(
            new Response(JSON.stringify({ error: err.message }), {
              status: 400,
            })
          );
          return;
        }
        try {
          // AWS S3 setup
          const s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
          });
          // DynamoDB setup
          const ddb = new DynamoDBClient({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
          });
          const docClient = DynamoDBDocumentClient.from(ddb);

          // Get file info
          const file = files?.[Object.keys(files)[0]];
          if (!file) {
            resolve(
              new Response(JSON.stringify({ error: "No file uploaded" }), {
                status: 400,
              })
            );
            return;
          }
          const fileStream =
            file._readStream ||
            (await import("fs")).createReadStream(file.filepath);
          const fileId = uuidv4();
          const s3Key = `investor-docs/${fileId}_${file.originalFilename}`;

          // Upload to S3
          await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: s3Key,
              Body: fileStream,
              ContentType: file.mimetype,
            })
          );

          // Save metadata to DynamoDB
          await docClient.send(
            new PutCommand({
              TableName: process.env.AWS_DYNAMODB_TABLE,
              Item: {
                id: fileId,
                investorId: fields.investorId || "unknown",
                fileName: file.originalFilename,
                s3Key,
                uploadedAt: new Date().toISOString(),
                mimeType: file.mimetype,
                size: file.size,
              },
            })
          );

          resolve(
            new Response(JSON.stringify({ success: true, fileId, s3Key }), {
              status: 200,
            })
          );
        } catch (e: any) {
          resolve(
            new Response(JSON.stringify({ error: e.message }), { status: 500 })
          );
        }
      }
    );
  });
}
