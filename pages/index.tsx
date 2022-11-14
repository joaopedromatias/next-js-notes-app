import styled from 'styled-components'
import NavBar from '../component/NavBar'
import Button from '../component/button'
import getNotesRaw from '../lib/getNotesRaw'
import setNoteUrl from '../lib/setNoteUrl'
import setNoteDisplay from '../lib/setNoteDisplay'
import Link from 'next/link'

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

export default function Home({ urlNotesNames, displayNotesNames }: Props ): JSX.Element {
  return <NavBar urlNotesNames={urlNotesNames} displayNotesNames={displayNotesNames}>
    <Wrapper>
      <p>Let&apos;s get started in writing some notes!</p>
      <Link href='/write'><Button text='write new note'></Button></Link>
    </Wrapper>
  </NavBar>
}

const Wrapper = styled.div`
margin-top: calc((100vh - 170px)/2);
height: 100px;
p { 
  font-size: 1.5rem;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
`