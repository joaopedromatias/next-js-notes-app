export default function setNoteDisplay (notesUrls: string[]): string[] { 
    return notesUrls.map(noteUrl => noteUrl.replace(/\-/g, ' '));
}