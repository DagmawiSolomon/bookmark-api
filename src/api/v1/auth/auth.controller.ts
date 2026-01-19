import { Request, Response } from "express"
import { AuthRequest, AuthRequestType, AuthResponse } from "./auth.type"
import { authServices } from "./auth.service"

export  const authControllers = async (req: Request<{},AuthResponse, AuthRequest>, res:Response) =>{
    try{
        const body: AuthRequest = req.body

        
        if (body.type === AuthRequestType.MAGIC_LINK){
            res.json(await authServices.authWithMagicLink(body))
        }
        else if(body.type === AuthRequestType.OAUTH){
            res.json(await authServices.authWithOAuth(body))
        }
        else {
            return res.status(400).json({ error: "Invalid auth request type" });
        }
        
    }
    catch(err){
        res.status(500).json({ error: "Server error" });
    }

}