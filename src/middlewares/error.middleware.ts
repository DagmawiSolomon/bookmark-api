import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { mapZodError } from "../errors/zod-error";
import { AppError } from "../errors/app-error";

export const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof ZodError){
        const mapped = mapZodError(err)
        return res.status(mapped.statusCode).json({
            error: err.message
        })
    }

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            error: err.message
        })
    }

    console.error("UNHADLED ERROR: ", err)
    return res.status(500).json({
        error: "Internal Server Error"
    })
}