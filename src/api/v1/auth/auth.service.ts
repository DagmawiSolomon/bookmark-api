
import { User } from "../../../models/user.model"
import jwt from 'jsonwebtoken';
import { AuthRequest,AuthRequestType,AuthResponse } from "./auth.schema"


const JWT_SECRET = process.env.JWT_SECRET || ''

const authWithMagicLink = async(req: AuthRequest):  Promise<AuthResponse>=>{
    const email = req.type === AuthRequestType.MAGIC_LINK ? req.email : undefined

    const user = await User.findOne({email}) ?? await User.create({email})
    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, JWT_SECRET , { expiresIn: '15m' });
    if(email){
        console.log(`http://localhost:3000/auth/magic/callback?token=${token}`)
    }
    return {"token":token}
} 

const authWithOAuth = async(req:AuthRequest): Promise<AuthResponse>=>{
     return {"token":"123"}
}

export const authServices = {authWithMagicLink, authWithOAuth}
