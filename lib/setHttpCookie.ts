import Cookies from 'cookies'
import { IncomingMessage, ServerResponse } from 'http';

export default function setHttpCookie (value: string, req: IncomingMessage, res: ServerResponse) { 
    const cookies = new Cookies(req, res);
    cookies.set('userToken', value, {
        httpOnly: true 
    })
}