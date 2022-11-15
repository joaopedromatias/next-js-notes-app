import NavBar from '../../component/NavBar';
import getNotesFileNames from '../../lib/getNotesFileNames'
import getNotesInfos from '../../lib/getNotesInfos'
import getNoteInfoById from '../../lib/getNotesInfosById';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';

export const getStaticPaths = () => { 

    const notesNames = getNotesFileNames();
    const notesInfos: NotesInfos[] = getNotesInfos(notesNames) as NotesInfos[];
    
    const paths = notesInfos.map(noteInfo => { 
        return { 
            params: { 
                id: String(noteInfo.id)
            }
        }
    })

    return { 
        paths,
        fallback: false
    }
}

interface Args { 
    params: { 
        id: string
    }    
}

export const getStaticProps = ({ params }: Args) => { 

    const { id } = params
    
    const { title, content } = getNoteInfoById(id) as NotesInfos;

    const notesNames = getNotesFileNames();
    const notesInfos = getNotesInfos(notesNames);

    return { 
        props: { 
            title,
            content,
            id,
            notesInfos
        }
    }
}

interface Props { 
    title: string
    content: string
    id: string
    notesInfos: NotesInfos[]
}

const Note = ({title, content, id, notesInfos}: Props): JSX.Element => { 
    
    const noteId = id

    const [updatedNotesInfos, setUpdatedNotesInfos] = useState<NotesInfos[]>(notesInfos);

    const [newTitle, setNewTitle] = useState<string>('');
    const [newBody, setNewBody] = useState<string>('');

    const noteTitle = useRef({} as HTMLInputElement);
    const noteBody = useRef({} as HTMLTextAreaElement);
    
    useEffect(() => { 
        noteTitle.current.focus();
    }, []);
  
    const getNoteTitle = () => {
        return encodeURI(noteTitle.current.value) // securely encode this!
    }
  
    const getNoteContent = () => { 
        return encodeURI(noteBody.current.value) // securely encode this!
    }
  
    const saveChanges = async () => { 

        const noteContent = getNoteContent();
        const noteTitle = getNoteTitle();

        const res = await fetch('/api/save-note', {
            method: 'POST',
            body: JSON.stringify({ noteTitle, noteContent, noteId })
        });

        if (res.status === 201) { 
            const res = await fetch('/api/get-notes');
            const newNotesData: NotesInfos[] = await res.json();
            setUpdatedNotesInfos(newNotesData);
        }
    }

    const saveChangesTitle = (e: ChangeEvent<HTMLInputElement>) => { 
        setNewTitle(e.target.value);
        saveChanges();
    }

    const saveChangesBody = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        setNewBody(e.target.value);
        saveChanges();
    }

    return <NavBar notesInfos={updatedNotesInfos}>
        <Wrapper>
          <input spellCheck={false} className="title" onChange={saveChangesTitle} ref={noteTitle} value={ newTitle || title}/>
          <hr />
          <textarea spellCheck={false} className="note" onChange={saveChangesBody} ref={noteBody} value={ newBody || content}/>
        </Wrapper>
    </NavBar>
}

const Wrapper = styled.div`
text-transform: capitalize;
text-align: center;
margin: 20px;
input, textarea { 
    border: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-progress-appearance: none;
    margin: 10px 0px;
    width: 98%;
    &:focus { 
        border: none;
        outline: none;
    }
}
input.title { 
    height: 24px;
    color: #414141;
    letter-spacing: 1.2px;
    font-size: 1.3rem;
    font-weight: 500;
    font-weight: bold;
}
textarea.note { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #1f1f1f;
    letter-spacing: 1.4px;
    font-size: 1rem;
    font-weight: 500;
    height: calc(100vh - 194px);
    resize: none;
}
hr { 
    width: 97%;
    border: .5px lightgray solid;
}
`

export default Note;