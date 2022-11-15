export default function getTokenSignature(token: string | undefined): string { 
    return token ? token.split('.')[2] : ''
}