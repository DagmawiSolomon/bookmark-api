import crypto from "crypto";
import jwt from 'jsonwebtoken';

export const generateRandomToken = () =>
  crypto.randomBytes(32).toString("hex");

export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");


export const generateAccessToken = (userId: string) =>
  jwt.sign(
    { sub: userId },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
  

export const generateRefreshToken = (userId: string) =>
  jwt.sign(
    { sub: userId },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "30d" }
  );

export const verifyRefreshToken = (refreshToken: string) =>
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  ) as { sub: string };


