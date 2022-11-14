import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  // escreve na pasta /notes o arquivo da nota, depois que o usuário salvar
}
