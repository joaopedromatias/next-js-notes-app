declare global { 

    interface NotesInfos { 
        content: string
        id: string
        title: string
        url: string
      }

    type SpecialCharacters = "&" | "'" | '"' | "<" | ">" | "\\" | "`" | ":"
}

export {}