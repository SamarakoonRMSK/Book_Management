import bookResolvers from "./book.resolvers.js";
import userResolvers from "./user.resolvers.js";

const resolvers = {
  Query: {
    ...bookResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

export default resolvers;
