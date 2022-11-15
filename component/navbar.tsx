import styled from 'styled-components'
import Link from 'next/link'
import TrashIcon from './icons/Trash'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Props { 
    notesInfos: NotesInfos[]
    children: JSX.Element
    currentId?: string
}

export default function NavBar ({ notesInfos, children, currentId }: Props): JSX.Element { 

    const [updatedNotesInfos, setUpdatedNotesInfos] = useState<NotesInfos[]>(notesInfos);
    
    const router = useRouter()

    useEffect(() => { 
        setUpdatedNotesInfos(notesInfos)
    }, [ notesInfos ])

    const handleDeleteNote = async (id: string, currentNote: boolean) => { 
        const res = await fetch('/api/delete-note', { 
            method: 'DELETE',
            body: JSON.stringify({ id })
        })

        if (res.status === 200) {

            if (currentNote) { 
                router.push('/write')
            }
             
            const res = await fetch('/api/get-notes');
            const newNotesData: NotesInfos[] = await res.json();
            setUpdatedNotesInfos(newNotesData);
            
        }
    }

    return <Wrapper>
    <div className='sidebar'>
        {updatedNotesInfos.length === 0 ? <></> : updatedNotesInfos.map( (noteInfo, index) => {
            const { title, id } = noteInfo;
            let selected = false
            if (String(id) === currentId)( 
                selected = true
            )
            return <>
                    <div key={index} className={`note-block ${selected ? 'selected' : ''}`}>
                        <div className={`flex`}>
                            <Link className={`note-name`} href={`/note/${id}`}>{ title }</Link>
                            <TrashIcon onClick={() => handleDeleteNote(id, selected)}/>
                        </div>
                </div>
                <div className='line'></div>
            </>
        })}
    </div>
    <div className='main'>
        { children }
    </div>
    </Wrapper>
}

const Wrapper = styled.div`
display: flex;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
.sidebar { 
    scroll-behavior: auto;
    display: inline-block;
    width: 20%;
    background-color: #FBFBFA;
    border: .5px black solid; 
    height: calc(100vh - 70px);
    overflow: auto;
        .selected { 
            background-color: #e7e7e7;
            color: black;
            border-radius: 5px;
        }
        .note-block { 
        padding: 10px;
        .flex { 
            display: flex;
            justify-content: space-between;
            align-items: center;
            .note-name { 
                text-decoration: none;
                color: inherit;
                letter-spacing: 1px;
                width: 85%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .line { 
            background-color: black;
            width: 100%;
            height: 1px;
        }
}
.main { 
    text-align: center;
    width: calc(100vw - 20%);
}
`