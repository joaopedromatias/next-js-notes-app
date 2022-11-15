import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';

export default function getNotesInfos (notesFileNames: string[]) { 

    return notesFileNames.map(noteFileName => { 

        const fileDir = path.join(process.cwd(), 'notes', noteFileName)
        const fileContent = fs.readFileSync(fileDir, {encoding: 'utf-8'})
        const matterResult = matter(fileContent);

        return { ...matterResult.data }
    })
}