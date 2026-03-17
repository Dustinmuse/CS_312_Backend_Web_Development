import type { NextApiRequest, NextApiResponse } from "next";

import { findAllLocations } from "@/mongoose/locations/services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const locations = await findAllLocations();

    return res.status(200).json(locations);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch locations from service",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
