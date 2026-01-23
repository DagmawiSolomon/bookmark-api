
import { User } from "../../../models/user.model"
import { AuthRequest,authRequestSchema,AuthRequestType,AuthResponse } from "./auth.schema"
import { generateAccessToken, generateRandomToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../../../utilis/token.utils";
import { MagicLink } from "../../../models/magicLink.model";
import { BadRequestError, InternalServerError, UnauthorizedError } from "../../../errors/http-error";
import { Request, Response } from "express";
import { sendMagicLink } from "../../../utilis/sendMagicLink";
import { RefreshToken } from "../../../models/refreshToken.model";

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

const authWithMagicLink = async (body: AuthRequest) => {

  const email = body.type === AuthRequestType.MAGIC_LINK ? body.email : undefined
  
  if (!email) return;

  const token = generateRandomToken();
  const tokenHash = hashToken(token);

  try {
    await MagicLink.create({
      email,
      tokenHash,
      expiresAt: new Date(Date.now() + MAGIC_LINK_TTL_MS),
    });

    await sendMagicLink(email, token);
  } catch(err) {
    console.log(err)
    throw new InternalServerError("Failed to create magic link");
  }
};


const verifyMagicLink = async(token: string)=>{
    const tokenHash = hashToken(token);

    const record = await MagicLink.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    throw new BadRequestError("Magic link is invalid or expired");
  }

  record.usedAt = new Date();
  await record.save();

  const user =
    (await User.findOne({ email: record.email })) ??
    (await User.create({ email: record.email }));

  const accessToken = generateAccessToken(user._id.toString())
  const refreshToken = generateRefreshToken(user._id.toString())

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    user,
    accessToken,
    refreshToken,
  };

}


const refreshAccessToken  = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken)
  const tokenHash = hashToken(refreshToken)

  const stored = await RefreshToken.findOne({
    userId: payload.sub,
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (!stored) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  return generateAccessToken(payload.sub);

}

const authWithOAuth = async(req:AuthRequest): Promise<AuthResponse>=>{
     return {"token":"123"}
}

export const authServices = {authWithMagicLink, authWithOAuth, verifyMagicLink}
