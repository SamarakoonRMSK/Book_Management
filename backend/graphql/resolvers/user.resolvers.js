import { UserInputError } from "apollo-server-express";
import { registerUser, loginUser } from "../models/user.model.js";
import { generateToken } from "../../auth/auth.service.js";

const userResolvers = {
  Mutation: {
    register: async (parent, { username, password }) => {
      try {
        const user = await registerUser(username, password);
        return user;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },

    login: async (parent, { username, password }) => {
      try {
        const user = await loginUser(username, password);
        const token = generateToken(user);
        return { token, user };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

export default userResolvers;
