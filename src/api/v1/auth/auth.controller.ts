import { NextFunction, Request, Response } from "express"
import { authServices } from "./auth.module"
import { AuthRequest, authRequestSchema, AuthRequestType, AuthResponse, magicLinkQuerySchema } from "./auth.schema"
import { BadRequestError } from "../../../errors/http-error"
import passport from "passport"
import { refreshAccessToken } from "./auth.service"




const userAuthController = async (req: Request<{}, AuthResponse, AuthRequest>, res: Response, next: NextFunction) => {
    try {
        const parsed = authRequestSchema.parse(req.body)
        if (parsed.type === AuthRequestType.MAGIC_LINK) {
            return res.json(await authServices.authWithMagicLink(parsed))
        }
        else if (parsed.type === AuthRequestType.OAUTH) {
            return res.json(await authServices.authWithOAuth(parsed))
        }
        else {
            throw new BadRequestError("Unsupported auth type");
        }

    }
    catch (err) {
        next(err);
    }

}

const validateMagicLink = async (req: Request<{}, Response, Request>, res: Response, next: NextFunction) => {
    try {
        const body = magicLinkQuerySchema.parse(req.body);
        const { user, accessToken, refreshToken } = await authServices.verifyMagicLink(body.token)
        return res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
            .json({
                accessToken,
                user,
            });


    } catch (err) {
        next(err)
    }
}

const googleAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"], session: false })(req, res, next);
}

const googleAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { session: false }, async (err: any, user: any) => {
        if (err || !user) {
            return next(err || new BadRequestError("Authentication failed"));
        }

        try {
            const { accessToken, refreshToken, user: authUser } = await authServices.authWithOAuth(user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                accessToken,
                user: authUser,
            });
        } catch (error) {
            next(error);
        }
    })(req, res, next);
}

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;


    if (!refreshToken) {
        throw new BadRequestError("Refresh token is required")
    }

    const accessToken = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error); // 
};
}

export const authControllers = { userAuthController, validateMagicLink, googleAuth, googleAuthCallback, refreshTokenController}