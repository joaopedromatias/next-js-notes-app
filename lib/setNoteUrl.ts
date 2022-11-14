export default function setNoteUrl (notesRawNames: string[]): string[] { 
    return notesRawNames.map(noteRawName => noteRawName.replace(/\.md$/g, ''));
}