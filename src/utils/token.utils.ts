import crypto from "crypto";
import jwt from 'jsonwebtoken';
import { RefreshToken } from "../models/refreshToken.model";
import { AppError } from "../errors/app-error";

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

type TokenType = "access" | "refresh";

const TOKEN_SECRETS: Record<TokenType, string> = {
  access: process.env.ACCESS_TOKEN_SECRET!,
  refresh: process.env.REFRESH_TOKEN_SECRET!

}
export const verifyToken = (token:string, type: TokenType) => {
   return jwt.verify(token, TOKEN_SECRETS[type]) as {sub: string};
}