import type { NextApiRequest, NextApiResponse } from 'next'
import getNotesFileNames from '../../lib/getNotesFileNames'
import getNoteInfo from '../../lib/getNotesInfos'
import Cookies from 'cookies'
import getTokenSignature from '../../lib/getTokenSignature'

type Data = NotesInfos[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {    

  const cookies = new Cookies (req, res);
  const userToken = cookies.get('userToken');
  const tokenSignature = getTokenSignature(userToken);

  const notesNames = getNotesFileNames(tokenSignature);
  const notesInfos = getNoteInfo(notesNames, tokenSignature) as NotesInfos[];
  return res.status(200).send(notesInfos);
}