import jwt from "jsonwebtoken";
import { getUserById } from "../graphql/models/user.model.js";

const JWT_SECRET = "WSFWSF_FWFWFF_WFWFDFCWF";

export const getContext = ({ req }) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return { user: null };
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = getUserById(payload.userId);
    return { user };
  } catch (error) {
    return { user: null };
  }
};
