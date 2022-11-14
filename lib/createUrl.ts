export default function createUrl (noteTitle: string): string  {
    return '/note/' + noteTitle.replace(/\s/g, '-').toLowerCase();
}