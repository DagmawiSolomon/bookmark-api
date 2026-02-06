import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/http-error";
import { verifyToken } from "../utilis/token.utils";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[DEBUG] Auth middleware triggered for: ${req.method} ${req.originalUrl}`);
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new UnauthorizedError("Missing Authorization header")
        }
        const [scheme, token] = authHeader.split(" ")
        if (scheme != "Bearer" || !token) {
            throw new UnauthorizedError("Invalid Authorization format")
        }
        const payload = verifyToken(token, 'access')
        if (!payload) {
            throw new UnauthorizedError("Invalid token")
        }
        req.user = {
            id: payload.sub
        }
        next()
    } catch (err) {
        if (err instanceof UnauthorizedError) {
            next(err);
        } else {
            next(new UnauthorizedError("Invalid or expired token"));
        }
    }

}