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

// Allow GraphQL IDEs and browser clients to call this endpoint from any origin.
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

// Ensure Mongo memory DB is connected before GraphQL resolvers run.
const connectDB = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  return await fn(req, res);
};

export default connectDB(allowCors(handler));
