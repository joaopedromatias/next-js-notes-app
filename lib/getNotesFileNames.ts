import fs from 'fs'
import path from 'path'

export default function getNotesFileNames(): string[] { 
    const notesDir = path.join(process.cwd(), 'notes');
    return fs.readdirSync(notesDir);
}