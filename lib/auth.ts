import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function auth (token: string): boolean { 

    try { 
        jwt.verify(token, process.env.JWT_SECRET!);
        return true
    } catch (err) { 
        return false
    }
}