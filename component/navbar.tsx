import styled from 'styled-components'
import Link from 'next/link'
import TrashIcon from '../component/icons/Trash'
import { useEffect, useState } from 'react'

interface Props { 
    notesInfos: NotesInfos[]
    children: JSX.Element
}

export default function NavBar ({ notesInfos, children }: Props): JSX.Element { 

    const [updatedNotesInfos, setUpdatedNotesInfos] = useState<NotesInfos[]>(notesInfos);

    useEffect(() => { 
        setUpdatedNotesInfos(notesInfos)
    }, [ notesInfos ])

    const handleDeleteNote = async (id: string) => { 
        const res = await fetch('/api/delete-note', { 
            method: 'DELETE',
            body: JSON.stringify({ id })
        })

        if (res.status === 200) { 
            const res = await fetch('/api/get-notes');
            const newNotesData: NotesInfos[] = await res.json();
            setUpdatedNotesInfos(newNotesData);
        }
    }

    return <Wrapper>
    <div className='sidebar'>
        {updatedNotesInfos.map( (noteInfo, index) => {
            const { title, id } = noteInfo;
            return <div key={index} className='note-block'>
                    <div className='flex'>
                        <Link className='note-name' href={`/note/${id}`}>{ title }</Link>
                        <TrashIcon onClick={() => handleDeleteNote(id)}/>
                    </div>
                    <div className='line'></div>
                </div>
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
    background-color: #ededed;
    border: .5px black solid; 
    height: calc(100vh - 70px);
    .note-block { 
        padding: 5px;
        margin: 10px 10px;
        .flex { 
            display: flex;
            justify-content: space-between;
            align-items: center;
            .note-name { 
                text-decoration: none;
                text-transform: capitalize;
                color: inherit;
                letter-spacing: 1px;
                width: 85%;
        }
        }
        
        .line { 
            background-color: black;
            width: 100%;
            height: 1px;
            margin-top: 10px;
        }
    }
}
.main { 
    text-align: center;
    width: calc(100vw - 20%);
}
`