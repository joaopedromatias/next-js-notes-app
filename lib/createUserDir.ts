import fs from 'fs'
import path from 'path'

export default function createUserDir (tokenSignature: string) { 
    const pathToMakeDir = path.join(process.cwd(), 'notes', tokenSignature);
    fs.mkdirSync(pathToMakeDir);
}