
import { User } from "../../../models/user.model"
import { AuthRequest,AuthRequestType,AuthResponse } from "./auth.schema"
import { generateRandomToken, hashToken } from "../../../utilis/crypto";
import { MagicLink } from "../../../models/magicLink.model";
import { BadRequestError, InternalServerError } from "../../../errors/http-error";
import { Request, Response } from "express";

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;
const JWT_SECRET = process.env.JWT_SECRET || ''


const authWithMagicLink = async(req: AuthRequest):  Promise<AuthResponse>=>{
    const email = req.type === AuthRequestType.MAGIC_LINK ? req.email : undefined

    const user = await User.findOne({email}) ?? await User.create({email})
    const token = generateRandomToken();
    const tokenHash = hashToken(token);

    try{
        await MagicLink.create({
        userId: user._id,
        tokenHash,
        expiresAt: new Date(Date.now() + MAGIC_LINK_TTL_MS),
    });
    }catch(err){
       throw new InternalServerError("Failed to create magic link");
    }

    return {token}

}

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

  return { userId: record.userId.toString() };


}

const authWithOAuth = async(req:AuthRequest): Promise<AuthResponse>=>{
     return {"token":"123"}
}

export const authServices = {authWithMagicLink, authWithOAuth, verifyMagicLink}
