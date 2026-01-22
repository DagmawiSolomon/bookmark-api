import { NextFunction, Request, Response } from "express"
import { authServices } from "./auth.service"
import { AuthRequest, authRequestSchema, AuthRequestType, AuthResponse } from "./auth.schema"
import { BadRequestError } from "../../../errors/http-error"

export  const authControllers = async (req: Request<{},AuthResponse, AuthRequest>, res:Response, next: NextFunction) =>{
    try{
        const parsed = authRequestSchema.safeParse(req.body)
       

        if (!parsed.success) {
            return res.status(400).json({
                error: "Invalid request body",
                details: parsed.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message,
            }))
            });
        }

         const body = parsed.data

        
        if (body.type === AuthRequestType.MAGIC_LINK){
            return res.json(await authServices.authWithMagicLink(body))
        }
        else if(body.type === AuthRequestType.OAUTH){
            return res.json(await authServices.authWithOAuth(body))
        }
        else {
            throw new BadRequestError("Unsupported auth type");
        }
        
    }
    catch(err){
        next(err);
    }

}