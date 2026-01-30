import { NextFunction, Request } from "express";
import { UnauthorizedError } from "../errors/http-error";
import { verifyToken } from "../utilis/token.utils";

const authMiddleware = (req: Request, res: Response, next:NextFunction) => {

        const authHeader = req.headers.authorization
        if(!authHeader){
        throw new UnauthorizedError("Missing Authorization header")
        }
        const [scheme, token] = authHeader.split(" ")
        if(scheme != "Bearer" || !token){
            throw new UnauthorizedError("Invalid Authorization format")
        }
        const payload = verifyToken(token, 'access')
        if(!payload){
            throw new UnauthorizedError("Invalid token")
        }
        req.user = {
            id: payload.sub
        }
        next()

        // error hndling: I have an eroor middleware
        // what's req,user
        // do I have to check the user ID in the mongodb db here or access it from the requws,id from the controllers
        // what's preventing malicious actors from seeing the userid being transported as plain tezt
       

}