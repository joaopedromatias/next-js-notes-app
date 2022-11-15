import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {  
    const { id } = JSON.parse(req.body);
    const fileDir = path.join(process.cwd(), 'notes', id + '.md');

    fs.unlinkSync(fileDir);

    return res.status(200).json({msg: 'sucessful'})
  }