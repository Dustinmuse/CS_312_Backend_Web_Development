import { createHash } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

/**
 * Helper function to generate a stable user ID from an email address.
 * Uses SHA-256 hashing to create a secure, consistent identifier.
 * @param email - The user's email address
 * @returns The SHA-256 hashed email as a hexadecimal string
 */
function createUserId(email: string): string {
  return createHash("sha256").update(email).digest("hex");
}

/**
 * NextAuth configuration and API handler for GitHub OAuth authentication.
 * This catch-all route handles all authentication-related endpoints:
 * - /api/auth/signin
 * - /api/auth/callback/github
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/providers
 *
 * The handler initializes NextAuth with GitHub as the OAuth provider,
 * and uses JWT and session callbacks to inject a custom user ID into
 * both the token and session objects.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      }),
    ],
    callbacks: {
      async jwt({ token }) {
        // Check if the token has an email and doesn't already have a private user ID
        // If so, generate and store the hashed user ID as a private claim in the JWT
        if (token.email && !token.fdlst_private_userId) {
          token.fdlst_private_userId = createUserId(token.email);
        }
        return token;
      },

      async session({ session }) {
        // Check if the session user has an email but doesn't have the private user ID
        // If so, generate and store it on the session object as well
        if (session.user?.email && !session.user.fdlst_private_userId) {
          session.user.fdlst_private_userId = createUserId(session.user.email);
        }
        return session;
      },
    },
  });
}
