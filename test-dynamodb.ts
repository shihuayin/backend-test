// test-dynamodb.ts
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "./src/services/dynamodb";

async function testConnection() {
  try {
    const result = await dynamoDB.send(
      new ScanCommand({ TableName: "Programs" })
    );
    console.log(" Table found, Items:", result.Items);
  } catch (error) {
    console.error(" Error:", error);
  }
}

testConnection();
