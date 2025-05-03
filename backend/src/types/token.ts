import jwt from "jsonwebtoken";

export const generateToken = (userId: String, role: String) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
