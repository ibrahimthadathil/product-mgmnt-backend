import jwt from "jsonwebtoken";

export const generateAccessToken = <T>(data: Partial<T>): string => {
  let secretKey = process.env.JWT_KEY as string;

  return jwt.sign(data, secretKey, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  let secretKey = process.env.JWT_KEY as string;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return { success: false, message: "invalid token" };
  }
};

export const generateRefreshToken = <T>(data: Partial<T>): string => {
  let secretKey = process.env.JWT_KEY as string;

  return jwt.sign(data, secretKey, { expiresIn: "7d" });
};
