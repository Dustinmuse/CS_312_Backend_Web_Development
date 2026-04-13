import { Mongoose } from "mongoose";

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      fdlst_private_userId?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fdlst_private_userId?: string;
  }
}
