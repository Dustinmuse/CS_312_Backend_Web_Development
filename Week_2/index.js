import express from "express";
import { hello, apiNames } from "./routes.js";

const server = express();
const port = 3000;

// Defines a route to /hello
server.get("/hello", hello);

// Defines a route to /api/names
server.get("/api/names", apiNames);

server.listen(port, function () {
  console.log("Listening on " + port);
});
