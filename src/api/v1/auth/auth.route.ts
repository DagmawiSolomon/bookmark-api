import { Router } from "express";
import { authControllers } from "./auth.controller";
import { ModuleRouter } from "../../../shared/module-router";


export const authRouter = new ModuleRouter('/auth')

authRouter.post("/", authControllers.userAuthController);  
authRouter.post("/magic/callback", authControllers.validateMagicLink)         
// authRouter.get("/magic", authControllers.magicLink);      
// authRouter.get("/oauth", authControllers.oauthInfo);      
// authRouter.post("/oauth/:provider", authControllers.oauthLogin); 
// authRouter.post("/refresh", authControllers.refresh);
// authRouter.post("/logout", authControllers.logout);