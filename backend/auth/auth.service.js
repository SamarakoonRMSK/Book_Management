import jwt from "jsonwebtoken";

const JWT_SECRET = "WSFWSF_FWFWFF_WFWFDFCWF";

export const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
