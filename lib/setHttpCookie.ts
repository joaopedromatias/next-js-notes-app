import Cookies from 'cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function setHttpCookie (value: string, req: NextApiRequest, res: NextApiResponse) { 
    const cookies = new Cookies(req, res);
    cookies.set('userToken', value, {
        httpOnly: true 
    })
}