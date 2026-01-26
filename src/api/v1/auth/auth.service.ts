
import { User } from "../../../models/user.model"
import { AuthRequest, AuthRequestType } from "./auth.schema"
import { generateAccessToken, generateRandomToken, generateRefreshToken, hashToken, verifyRefreshToken } from "../../../utilis/token.utils";
import { BadRequestError, InternalServerError, UnauthorizedError } from "../../../errors/http-error";
import { sendMagicLink } from "../../../utilis/sendMagicLink";
import { RefreshToken } from "../../../models/refreshToken.model";
import { reidsClient } from "../../../config/redis";

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

const authWithMagicLink = async (body: AuthRequest) => {

  const email = body.type === AuthRequestType.MAGIC_LINK ? body.email : undefined

  if (!email) return;

  const token = generateRandomToken();
  const tokenHash = hashToken(token);


  try {
    const result = await reidsClient.set(tokenHash, email, {
      EX: MAGIC_LINK_TTL_MS,
      NX: true
    })
    if (result === 'OK') {
      await sendMagicLink(email, token);
    }
    else {
      throw new InternalServerError("Failed to create magic link")
    }
  } catch (err) {
    console.log(err)
    throw new InternalServerError("Failed to create magic link");
  }
};


const createAuthResponse = async (user: any) => {
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


const verifyMagicLink = async (token: string) => {
  const tokenHash = hashToken(token);

  const email = await reidsClient.get(tokenHash)

  if (!email) {
    throw new BadRequestError("Magic link is invalid or expired");
  }

  await reidsClient.del(tokenHash);


  const user = await User.findOneAndUpdate(
    { email },
    { $setOnInsert: { email } },
    { new: true, upsert: true }
  );

  return createAuthResponse(user);

}


const refreshAccessToken = async (refreshToken: string) => {
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

const authWithOAuth = async (user: any) => {
  const { accessToken, refreshToken, user: authUser } = await createAuthResponse(user);
  return {
    accessToken,
    refreshToken,
    user: authUser
  }
}

export const authServices = { authWithMagicLink, authWithOAuth, verifyMagicLink }
