import type { NextApiRequest, NextApiResponse } from "next";
import { findByZip } from "../../../mongoose/weather/services";
import dbConnect from "../../../middleware/db-connect";
import { WeatherInterface } from "../../../mongoose/weather/interface";

// Reuse one connection promise across requests in this module.
const dbConnectPromise = dbConnect();
type WeatherApiResponse = WeatherInterface | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherApiResponse>,
): Promise<void> {
  await dbConnectPromise;
  const data = await findByZip(req.query.zipcode as string);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ error: "Not found" });
  }
}
