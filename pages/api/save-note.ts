import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import Cookies from 'cookies'
import getTokenSignature from '../../lib/getTokenSignature'

type Data = {
  msg: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method === 'POST') { 
  
    const { noteTitle, noteContent, noteId } = JSON.parse(req.body);
    const cookies = new Cookies (req, res)
    const userToken = cookies.get('userToken');
    const tokenSignature = getTokenSignature(userToken)

    if (tokenSignature) { 
    
      const noteFileName = noteId + '.md'
      const noteFilePath = path.join(process.cwd(), 'notes', tokenSignature, noteFileName)
  
      const noteWrite = `---
title: '${noteTitle}'
id: ${noteId}
content: '${noteContent}'
---
`
      
        fs.writeFileSync(noteFilePath, noteWrite, {encoding: 'utf-8'});    
        return res.status(201).json({msg : 'success'})  
    }

    
  }
}
