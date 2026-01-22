export interface ErrorDetail{
    path?: string,
    message: string
}

export class AppError extends Error{
    public readonly statusCode: number
    public readonly details?: ErrorDetail[]
    public readonly isOperational: boolean
   

    constructor(message: string, statusCode: number,details?: ErrorDetail[], isOperational = true){
        super(message)
        this.statusCode = statusCode
        this.details = details
        this.isOperational = isOperational

        Error.captureStackTrace(this, this.constructor);
    }
}