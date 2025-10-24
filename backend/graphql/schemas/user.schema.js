import { gql } from "apollo-server-express";

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;
