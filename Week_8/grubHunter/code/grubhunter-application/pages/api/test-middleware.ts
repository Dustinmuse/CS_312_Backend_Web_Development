import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/middleware/mongodb-connection";
import { LocationModel } from "@/mongoose/locations/model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const locations = await LocationModel.find({}).lean().exec();

    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch locations",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
