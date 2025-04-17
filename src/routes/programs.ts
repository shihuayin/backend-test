import { Router, Request, Response } from "express";
import dynamoDB from "../services/dynamodb";
import { Program } from "../models/program";
import {
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const command = new ScanCommand({ TableName: "Programs" });
    const data = await dynamoDB.send(command);
    res.status(200).json(data.Items);
  } catch (error) {
    console.error(" Failed to fetch programs:", error);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const program = req.body as Program;

  if (!program || !program.id) {
    return res.status(400).json({ error: "Missing required 'id' field" });
  }

  try {
    const command = new PutCommand({
      TableName: "Programs",
      Item: program,
    });
    await dynamoDB.send(command);
    res.status(201).json({ message: "Program added successfully" });
  } catch (error) {
    console.error(" Failed to add program:", error);
    res.status(500).json({ error: "Failed to add program" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const programId = Number(req.params.id);

  if (isNaN(programId)) {
    return res.status(400).json({ error: "Invalid program id" });
  }

  try {
    const command = new DeleteCommand({
      TableName: "Programs",
      Key: { id: programId },
    });
    await dynamoDB.send(command);
    res.status(200).json({ message: `Program with id ${programId} deleted.` });
  } catch (error) {
    console.error(" Failed to delete program:", error);
    res.status(500).json({ error: "Failed to delete program" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const programId = Number(req.params.id);

  if (isNaN(programId)) {
    return res.status(400).json({ error: "Invalid program id" });
  }

  const updatedFields = req.body;

  if (!updatedFields || Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }

  const ExpressionAttributeNames: Record<string, string> = {};
  const ExpressionAttributeValues: Record<string, any> = {};
  const updateParts: string[] = [];

  let i = 0;
  for (const [key, value] of Object.entries(updatedFields)) {
    const name = `#k${i}`;
    const val = `:v${i}`;
    ExpressionAttributeNames[name] = key;
    ExpressionAttributeValues[val] = value;
    updateParts.push(`${name} = ${val}`);
    i++;
  }

  try {
    const command = new UpdateCommand({
      TableName: "Programs",
      Key: { id: programId },
      UpdateExpression: "SET " + updateParts.join(", "),
      ExpressionAttributeNames,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const result = await dynamoDB.send(command);
    res.status(200).json({
      message: "Program updated successfully",
      updated: result.Attributes,
    });
  } catch (error) {
    console.error(" Failed to update program:", error);
    res.status(500).json({ error: "Failed to update program" });
  }
});

export default router;
