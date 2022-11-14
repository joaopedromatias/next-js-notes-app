import getNotesRaw from '../lib/getNotesRaw'
import setNoteUrl from '../lib/setNoteUrl'
import setNoteDisplay from '../lib/setNoteDisplay'
import NavBar from '../component/NavBar';
import WriteArea from '../component/WriteArea';

export const getServerSideProps = () => {
  
  const notesNames = getNotesRaw();
  const urlNotesNames = setNoteUrl(notesNames);
  const displayNotesNames = setNoteDisplay(urlNotesNames);

  return { 
    props: { 
      urlNotesNames,
      displayNotesNames
    }
  }
}

interface Props { 
    urlNotesNames: string[]
    displayNotesNames: string[]
  }

export default function Write ({ urlNotesNames, displayNotesNames }: Props): JSX.Element { 
    return <NavBar urlNotesNames={urlNotesNames} displayNotesNames={displayNotesNames}>
        <WriteArea></WriteArea>
    </NavBar>
}