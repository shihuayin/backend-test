//import data automatically

import fs from "fs";
import path from "path";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "../services/dynamodb";
import { Program } from "../models/program";

const filePath = path.join(__dirname, "../../data/example-programs.json");

const rawData = fs.readFileSync(filePath, "utf-8");
const programs: Program[] = JSON.parse(rawData);

async function importPrograms() {
  for (const program of programs) {
    const command = new PutCommand({
      TableName: "Programs",
      Item: program,
    });

    try {
      await dynamoDB.send(command);
      console.log(` Imported: ${program.title}`);
    } catch (error) {
      console.error(` Failed to import ${program.title}:`, error);
    }
  }
}

importPrograms();
