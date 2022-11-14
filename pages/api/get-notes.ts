import type { NextApiRequest, NextApiResponse } from 'next'
import getNotesFileNames from '../../lib/getNotesFileNames'
import getNoteInfo from '../../lib/getNoteInfo'

type Data = NotesInfos[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {  
  const notesNames = getNotesFileNames();
  const notesInfos = getNoteInfo(notesNames) as NotesInfos[];
  return res.status(200).send(notesInfos)
}