import { Router } from "express";
import { authControllers } from "./auth.controller";


const authRouter = Router()
authRouter.post('/auth', authControllers)
export default  authRouter