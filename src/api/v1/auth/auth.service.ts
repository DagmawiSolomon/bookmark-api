import { AuthRequest, AuthResponse } from "./auth.type";

const authWithMagicLink = async(req: AuthRequest):  Promise<AuthResponse>=>{
    return {"token":"123", expiresIn:200}
} 

const authWithOAuth = async(req:AuthRequest): Promise<AuthResponse>=>{
     return {"token":"123", expiresIn:200}
}

export const authServices = {authWithMagicLink, authWithOAuth}