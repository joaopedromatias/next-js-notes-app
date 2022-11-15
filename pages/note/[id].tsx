import NavBar from '../../component/NavBar';
import getNotesFileNames from '../../lib/getNotesFileNames'
import getNoteInfo from '../../lib/getNotesInfos'
import getNoteInfoById from '../../lib/getNotesInfosById';

export const getStaticPaths = () => { 

    const notesNames = getNotesFileNames();
    const notesInfos: NotesInfos[] = getNoteInfo(notesNames) as NotesInfos[];
    
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
    console.log(params)

    const { id } = params
    
    const {title, content} = getNoteInfoById(id) as NotesInfos;

    return { 
        props: { 
            title,
            content,
            id
        }
    }
}

interface Props { 
    title: string
    content: string
    id: string
}

const Note = (props: Props): JSX.Element => { 
    const {title, content, id} = props
    return <h1>{title}</h1>
}

export default Note;