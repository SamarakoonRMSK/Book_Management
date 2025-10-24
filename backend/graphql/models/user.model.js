import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

let users = [];

export const registerUser = (username, password) => {
  const existgUser = users.find((user) => user.username === username);
  if (existgUser) {
    throw new Error("User with this username already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    hashedPassword,
  };
  users.push(newUser);
  const { hashedPassword: pass, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = (username, password) => {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error("Invalid Username");
  }
  const isValidPassword = bcrypt.compareSync(password, user.hashedPassword);
  if (!isValidPassword) {
    throw new Error("Invalid Password");
  }
  const { hashedPassword: pass, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  const { hashedPassword: pass, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
