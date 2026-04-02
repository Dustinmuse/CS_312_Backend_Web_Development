import gql from "graphql-tag";
import { LocationTypeDef } from "./locations/custom.gql";
import { QueryTypeDef } from "./locations/queries";
import { MutationTypeDef } from "./locations/mutations";

// Merge all types, queries, and mutations
export const schema = gql`
  ${LocationTypeDef}
  ${QueryTypeDef}
  ${MutationTypeDef}
`;
