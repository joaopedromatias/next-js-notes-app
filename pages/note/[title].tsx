import getNotesFileNames from '../../lib/getNotesFileNames'
import getNoteInfo from '../../lib/getNoteInfo'

export const getStaticPaths = () => { 

    const notesNames = getNotesFileNames();
    const notesInfos = getNoteInfo(notesNames);
    
    const paths = { 
        params: { 
            notesInfos
        }
    }

    return { 
        paths,
        fallback: false
    }
}

//@ts-ignore
export const getStaticProps = ({ params }) => { 

    const { id } = params

    // pegar o conteúdo

    return { 
        props: { 
            id 
        }
    }
}

interface Props { 
    id: string
}

const Note = ({id}: Props): JSX.Element => { 
    return <></>
}

export default Note;