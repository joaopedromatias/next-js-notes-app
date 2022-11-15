import fs from 'fs'
import path from 'path'

export default function getNotesFileNames(tokenSignature: string | undefined): string[] { 

    if (tokenSignature) { 

        try { 
            const notesDir = path.join(process.cwd(), 'notes', tokenSignature);        
            return fs.readdirSync(notesDir);
        } catch (err) { 
            return []
        }
        
    } else { 
        return []
    }
    
}