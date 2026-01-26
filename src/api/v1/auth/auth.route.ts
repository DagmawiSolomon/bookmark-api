import { Router } from "express";
import { authControllers } from "./auth.controller";
import { ModuleRouter } from "../../../shared/module-router";


export const authRouter = new ModuleRouter('/auth')

authRouter.post("/", authControllers.userAuthController);
authRouter.post("/magic/verify", authControllers.validateMagicLink)

authRouter.get("/google", authControllers.googleAuth);
authRouter.get("/google/callback", authControllers.googleAuthCallback);
// authRouter.get("/magic", authControllers.magicLink);
// authRouter.get("/oauth", authControllers.oauthInfo);
// authRouter.post("/oauth/:provider", authControllers.oauthLogin);
authRouter.post("/refresh", authControllers.refreshTokenController);
// authRouter.post("/logout", authControllers.logout);