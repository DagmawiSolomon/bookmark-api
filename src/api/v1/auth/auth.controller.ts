import { NextFunction, Request, Response } from "express"
import { authServices } from "./auth.module"
import { AuthRequest, authRequestSchema, AuthRequestType, AuthResponse, magicLinkQuerySchema } from "./auth.schema"
import { BadRequestError } from "../../../errors/http-error"




const userAuthController = async (req: Request<{},AuthResponse, AuthRequest>, res:Response, next: NextFunction) =>{
    try{
        const parsed = authRequestSchema.parse(req.body)

        console.log(parsed)
       
        if (parsed.type === AuthRequestType.MAGIC_LINK){
            return res.json(await authServices.authWithMagicLink(parsed))
        }
        else if(parsed.type === AuthRequestType.OAUTH){
            return res.json(await authServices.authWithOAuth(parsed))
        }
        else {
            throw new BadRequestError("Unsupported auth type");
        }
        
    }
    catch(err){
        next(err);
    }

}

const validateMagicLink = async (req: Request<{},Response, Request>, res:Response, next: NextFunction) =>{
    try {
    const body = magicLinkQuerySchema.parse(req.body);
    const {user, accessToken, refreshToken} = await authServices.verifyMagicLink(body.token)
    return res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,})
    .json({
    accessToken,
    user,
  });


  } catch(err) {
    next(err)
  }


}

export const  authControllers = {userAuthController, validateMagicLink}