import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send({ hello: `Hello from internal port: ${port}` });
});

app.get("*", (req, res) => {
  res.send(`service-api: This path is not supported: ${req.path}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
