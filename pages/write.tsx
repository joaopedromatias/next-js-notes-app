import NavBar from '../component/navbar';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import getNotesFileNames from '../lib/getNotesFileNames'
import getNotesInfos from '../lib/getNotesInfos'
import createUserToken from '../lib/createToken';
import auth from '../lib/auth'
import setHttpCookie from '../lib/setHttpCookie';
import createUserDir from '../lib/createUserDir';
import getTokenSignature from '../lib/getTokenSignature';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => {
  
    let { userToken } = req.cookies || null
    let isTokenValid, tokenSignature;
    let notesInfos: string[] | NotesInfos[];

    if (!userToken) { 
        userToken = createUserToken();
        tokenSignature = getTokenSignature(userToken)
        createUserDir(tokenSignature);
        setHttpCookie(userToken, req, res);
        notesInfos = []
    } else { 
        isTokenValid = auth(userToken)
        tokenSignature = getTokenSignature(userToken)
        
        if (isTokenValid) { 
            const notesNames = getNotesFileNames(tokenSignature); 
            notesInfos = getNotesInfos(notesNames, tokenSignature) as NotesInfos[] || []; 
        } else { 
            notesInfos = []
        }
    }

  return { 
    props: { 
      notesInfos
    }
  }
}

interface Props { 
    notesInfos: NotesInfos[]
}

export default function Write ({ notesInfos }: Props): JSX.Element { 
  
  const [updatedNotesInfos, setUpdatedNotesInfos] = useState<NotesInfos[]>(notesInfos);

  const noteTitle = useRef({} as HTMLInputElement);
  const noteBody = useRef({} as HTMLTextAreaElement);
  const [noteId, setNoteId] = useState<string>('');
  
  useEffect(() => { 
      noteTitle.current.focus();
      setNoteId(String(Date.now()));
  }, [])

  useEffect(() => { 
    noteBody.current.value = '';
    noteTitle.current.value = ''; 
    setNoteId(String(Date.now()))
  }, [notesInfos])

  const getNoteTitle = () => {
      return encodeURI(noteTitle.current.value) 
  }

  const getNoteContent = () => { 
      return encodeURI(noteBody.current.value) 
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

    return <NavBar notesInfos={updatedNotesInfos} currentId={noteId}>
            <Wrapper>
              <input spellCheck={false} className="title" onChange={saveChanges} ref={noteTitle} placeholder={'Note Title...'}/>
              <hr />
              <textarea spellCheck={false} className="note" onChange={saveChanges} ref={noteBody} placeholder={'Start writing...'}/>
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