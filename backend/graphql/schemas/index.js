import { gql } from "apollo-server-express";
import bookTypeDefs from "./book.schema.js";
import userTypeDefs from "./user.schema.js";

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export default [rootTypeDefs, bookTypeDefs, userTypeDefs];
