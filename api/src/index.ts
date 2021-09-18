import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send({ data: "Hello from API updated" });
});

app.listen(3000, () => {
  console.log("api server started on port 3000");
});
