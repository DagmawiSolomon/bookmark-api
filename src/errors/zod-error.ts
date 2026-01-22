import { ZodError } from "zod";
import { BadRequestError } from "./http-error";

export const mapZodError = (error: ZodError) => {
   const details = error.issues.map(issue => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return new BadRequestError("Invalid request payload", details);
};


    