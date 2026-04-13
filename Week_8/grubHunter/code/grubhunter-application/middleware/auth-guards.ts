import { GraphQLError } from "graphql/error";
import { JWT } from "next-auth/jwt";

interface paramInterface {
  user_id: string;
  location_id: string;
}

interface contextInterface {
  token: JWT | null;
}

export function authGuard(param: paramInterface, context: contextInterface): boolean | Error {
  if (!context || !context.token || !context.token.fdlst_private_userId) {
    return new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: {
          status: 500,
        },
      },
    });
  }

  if (context.token.fdlst_private_userId !== param.user_id) {
    return new GraphQLError("User is not authorized", {
      extensions: {
        code: "UNAUTHORIZED",
        http: {
          status: 500,
        },
      },
    });
  }

  return true;
}
