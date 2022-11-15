import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export default function createToken(): string { 

    const userId = String(Date.now()) + String(Math.floor(Math.random() * 1000))

    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET!);

    return token

}