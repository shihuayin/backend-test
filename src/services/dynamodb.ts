import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  region: process.env.AWS_REGION || "local",
});

const dynamoDB = DynamoDBDocumentClient.from(ddbClient);

export default dynamoDB;
