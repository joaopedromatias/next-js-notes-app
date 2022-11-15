import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';

export default function getNoteInfoById (id: string) { 

    const fileDir = path.join(process.cwd(), 'notes', id + '.md');
    const fileContent = fs.readFileSync(fileDir, {encoding: 'utf-8'})
    const matterResult = matter(fileContent);

    let { content, title } = matterResult.data

    content = decodeURI(content);
    title = decodeURI(title);

    return { content, id, title }
}