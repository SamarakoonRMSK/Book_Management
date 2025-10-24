import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../models/book.model.js";
import { UserInputError, AuthenticationError } from "apollo-server-express";

const bookResolvers = {
  Query: {
    books: (parent, { filter, limit, offset }) => {
      return getAllBooks({ filter, limit, offset });
    },
    book: (parent, { id }) => {
      const book = getBookById(id);
      if (!book) {
        throw new UserInputError("Book not found");
      }
      return book;
    },
  },
  Mutation: {
    createBook: (parent, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to system");
      }
      return createBook(input);
    },
    updateBook: (parent, { id, input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to system");
      }
      const updatedBook = updateBook(id, input);
      if (!updatedBook) {
        throw new UserInputError("Book not found");
      }
      return updatedBook;
    },
    deleteBook: (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in to system");
      }
      const deletedBook = deleteBook(id);
      if (!deletedBook) {
        throw new UserInputError("Book not found");
      }
      return deletedBook;
    },
  },
};

export default bookResolvers;
