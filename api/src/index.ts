import express from "express";
import { dbConnect } from "./db-connect";
import path from "path";
import { TestModel } from "./models/test-model";

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const isProd = process.env.NODE_ENV === "production";

const db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=admin`;

dbConnect({ db });

const app = express();

app.get("/api", (req, res) => {
  res.send({ data: "Hello from API" });
});

app.get("/api/details/:id", (req, res) => {
  TestModel.findOne({ name: req.params.id }, (err: any, result: any) => {
    res.send({ data: err ? "Error find" : result });
  });
});

app.post("/api/details/:id", async (req, res) => {
  const testDocument = new TestModel({ name: req.params.id });
  await testDocument.save();
  res.send({ result: true });
});

app.listen(3000, () => {
  console.log("api server started on port 3000");
});
