import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";

async function main() {
  const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    region: "local",
  });

  const params: CreateTableCommandInput = {
    TableName: "Programs",
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
  };

  try {
    await client.send(new CreateTableCommand(params));
    console.log("✅ Programs table created.");
  } catch (err: any) {
    if (err.name === "ResourceInUseException") {
      console.log(" Programs table already exists.");
    } else {
      console.error(" Failed to create Programs table:", err);
      process.exit(1);
    }
  }
}

main();
