import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path';
import Cookies from 'cookies'
import getTokenSignature from '../../lib/getTokenSignature';

export default function handler(req: NextApiRequest, res: NextApiResponse) {  
    const { id } = JSON.parse(req.body);

    const cookies = new Cookies (req, res);
    const userToken = cookies.get('userToken');
    const tokenSignature = getTokenSignature(userToken);

    const fileDir = path.join(process.cwd(), 'notes', tokenSignature, id + '.md');

    fs.unlinkSync(fileDir);

    return res.status(200).json({msg: 'sucessful'})
  }