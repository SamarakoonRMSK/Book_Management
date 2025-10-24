import { gql } from "apollo-server-express";

const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int!
    genre: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
    publishedYear: Int!
    genre: String!
  }

  input UpdateBookInput {
    title: String
    author: String
    publishedYear: Int
    genre: String
  }

  type BooksPage {
    books: [Book]!
    totalCount: Int!
  }

  extend type Query {
    books(filter: String, limit: Int, offset: Int): BooksPage!
    book(id: ID!): Book
  }

  extend type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): Book
  }
`;

export default bookTypeDefs;
