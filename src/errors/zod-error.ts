import { ZodError } from "zod";
import { BadRequestError } from "./http-error";

export const mapZodError = (error: ZodError) => {
  return new BadRequestError("Invalid request payload");
};
