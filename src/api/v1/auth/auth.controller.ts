import { NextFunction, Request, Response } from "express"
import { authServices } from "./auth.service"
import { AuthRequest, authRequestSchema, AuthRequestType, AuthResponse } from "./auth.schema"
import { BadRequestError } from "../../../errors/http-error"

const userAuthController = async (req: Request<{},AuthResponse, AuthRequest>, res:Response, next: NextFunction) =>{
    try{
        const parsed = authRequestSchema.parse(req.body)
       
        
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

const validateMagicLink = async (req: Request<{},AuthResponse, Request>, res:Response, next: NextFunction) =>{}

export const  authControllers = {userAuthController, validateMagicLink}