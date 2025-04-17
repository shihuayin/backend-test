import { ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "../services/dynamodb";

// clean  all data in Programs
async function clearAllPrograms() {
  try {
    const scanCommand = new ScanCommand({ TableName: "Programs" });
    const scanResult = await dynamoDB.send(scanCommand);

    if (!scanResult.Items || scanResult.Items.length === 0) {
      console.log(" No items found. The table 'Programs' is already empty.");
      return;
    }

    for (const item of scanResult.Items) {
      const deleteCommand = new DeleteCommand({
        TableName: "Programs",
        Key: { id: item.id },
      });
      await dynamoDB.send(deleteCommand);
      console.log(
        ` Deleted item with id: ${item.id}${
          item.title ? " (" + item.title + ")" : ""
        }`
      );
    }
    console.log(" All items have been deleted from the 'Programs' table.");
  } catch (error) {
    console.error(" Error clearing Programs table:", error);
  }
}

clearAllPrograms();
