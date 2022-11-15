import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';

export default function getNotesInfos (notesFileNames: string[], tokenSignature: string | undefined) { 

    if (notesFileNames.length > 0 && tokenSignature) { 
        return notesFileNames.map(noteFileName => { 

            const fileDir = path.join(process.cwd(), 'notes', tokenSignature, noteFileName)
            const fileContent = fs.readFileSync(fileDir, {encoding: 'utf-8'})
            const matterResult = matter(fileContent);
    
            let { content, id, title } = matterResult.data
    
            content = decodeURI(content);
            title = decodeURI(title);
    
            return { content, id, title }
        })
    } else { 
        return []
    }
    
}