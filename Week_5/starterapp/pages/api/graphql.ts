import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../graphql/resolver";
import { typeDefs } from "../../graphql/schema";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../middleware/db-connect";

// @ts-ignore
const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Allow", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({
      error:
        'Use GET or POST for GraphQL requests. Example POST body: {"query":"{ weather(zip: \\"96815\\") { zip weather tempF } }"}',
    });
  }

  return await fn(req, res);
};

const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Failed to connect to MongoDB memory server:", error);
    return res.status(500).json({
      error:
        "Database connection failed. If this is your first run, mongodb-memory-server may still be downloading MongoDB binaries.",
    });
  }
  return await fn(req, res);
};

export default allowCors(connectDB(handler));
