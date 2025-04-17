// set Express
import express from "express";
import cors from "cors";
import programsRouter from "./routes/programs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is runninggggggg");
});

app.use("/programs", programsRouter);
export default app;
