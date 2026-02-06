import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { mapZodError } from "../errors/zod-error";
import { AppError } from "../errors/app-error";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        const mapped = mapZodError(err)
        res.status(mapped.statusCode).json({
            error: mapped.message,
            details: mapped.details
        })
        return
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,

        })
        return
    }

    console.error("UNHADLED ERROR: ", err)
    res.status(500).json({
        error: "Internal Server Error"
    })
}