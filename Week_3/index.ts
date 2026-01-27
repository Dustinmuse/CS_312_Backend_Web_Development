import { routeHello, routeAPINames, routeWeather } from "./routes.js";
import express, { Request, Response } from "express";

const server = express();
const port = 3000;

server.get("/hello", function (_req: Request, res: Response): void {
  const response = routeHello();
  res.send(response);
});

server.get("/api/names", async function (_req: Request, res: Response): Promise<void> {
  let response: string;
  try {
    response = await routeAPINames();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

server.get("/api/weather/:zipcode", function (req: Request, res: Response): void {
  const zipcode = Array.isArray(req.params.zipcode) ? req.params.zipcode[0] : req.params.zipcode;
  const response = routeWeather({ zipcode });
  res.send(response);
});

server.listen(port, function (): void {
  console.log("Listening on " + port);
});
