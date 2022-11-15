import NavBar from '../../component/NavBar';
import getNotesFileNames from '../../lib/getNotesFileNames'
import getNotesInfos from '../../lib/getNotesInfos'
import getNoteInfoById from '../../lib/getNotesInfosById';
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import createUserToken from '../../lib/createToken';
import auth from '../../lib/auth'
import setHttpCookie from '../../lib/setHttpCookie';
import createUserDir from '../../lib/createUserDir';
import getTokenSignature from '../../lib/getTokenSignature';
import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router';

export const getServerSideProps = ({ req, query, res }: GetServerSidePropsContext) => { 

    const id = query.id as string

    let { userToken } = req.cookies || null
    let isTokenValid, currentTitle, currentContent, tokenSignature: string | undefined;
    let notesInfos: string[] | NotesInfos[];

    if (!userToken) { 
        userToken = createUserToken();
        tokenSignature = getTokenSignature(userToken);
        createUserDir(tokenSignature);
        setHttpCookie(userToken, req, res);
        notesInfos = []
    } else { 
        isTokenValid = auth(userToken)
        tokenSignature = getTokenSignature(userToken)

        if (isTokenValid) { 

            const ans = getNoteInfoById(id, tokenSignature) as NotesInfos | null;

            if (ans === null) { 
                return { 
                    props: { 
                        notFound: true
                    }
                }
            } else { 
                const { title, content } = ans;
                currentTitle = title
                currentContent = content
                const notesNames = getNotesFileNames(tokenSignature); 
                notesInfos = getNotesInfos(notesNames, tokenSignature) as NotesInfos[] || []; 

                return { 
                    props: { 
                        currentTitle,
                        currentContent,
                        id,
                        notesInfos,
                        newUser: false
                    }
                }
            }
        } 
    }

    return { 
        props: { 
            newUser: true
        }
    }
}

interface Props { 
    currentTitle: string
    currentContent: string
    id: string
    notesInfos: NotesInfos[]
    newUser: boolean
    notFound: true
}

const Note = ({ currentTitle, currentContent, id, notesInfos, newUser, notFound }: Props): JSX.Element => { 
    
    const router = useRouter();
    
    useEffect(() => { 
        if (newUser || notFound) { 
            console.log('veio')
            router.push('/');
        }
    }, [newUser, router, notFound])

    const noteId = id

    const [updatedNotesInfos, setUpdatedNotesInfos] = useState<NotesInfos[]>(notesInfos);

    const [newTitle, setNewTitle] = useState<string>('');
    const [newBody, setNewBody] = useState<string>('');

    const noteTitle = useRef({} as HTMLInputElement);
    const noteBody = useRef({} as HTMLTextAreaElement);
    
    useEffect(() => { 
        setNewTitle('');
        setNewBody('');
    }, [id])
  
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

    const saveChangesTitle = (e: ChangeEvent<HTMLInputElement>) => { 
        setNewTitle(e.target.value);
        saveChanges();
    }

    const saveChangesBody = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        setNewBody(e.target.value);
        saveChanges();
    }

    return newUser || notFound ?  <></> : <NavBar notesInfos={updatedNotesInfos} currentId={id}>
            <Wrapper>
              <input spellCheck={false} className="title" onChange={saveChangesTitle} ref={noteTitle} value={ newTitle || currentTitle}/>
              <hr />
              <textarea spellCheck={false} className="note" onChange={saveChangesBody} ref={noteBody} value={ newBody || currentContent}/>
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