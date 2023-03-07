import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const port = process.env.PORT || 3000;
const loadBalancerPort = process.env.LOAD_BALANCER_PORT || 3333;

app.get("/api/greeting", (req, res) => {
  res.send({
    greeting: req.query.name ? `Hello ${req.query.name}` : "Hello World!",
  });
});

app.use(
  "/api/service",
  createProxyMiddleware({
    target: `http://127.0.0.1:${loadBalancerPort}/hello`,
    ignorePath: true,
  })
);

app.get("*", (req, res) => {
  res.send(`basic-api: This path is not supported ${req.path}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
