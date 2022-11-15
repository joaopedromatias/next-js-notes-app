import styled from 'styled-components'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import Link from 'next/link'
import getNotesFileNames from '../lib/getNotesFileNames'
import getNotesInfos from '../lib/getNotesInfos'
import createUserToken from '../lib/createToken';
import setHttpCookie from '../lib/setHttpCookie';
import auth from '../lib/auth'
import createUserDir from '../lib/createUserDir'
import getTokenSignature from '../lib/getTokenSignature'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = ({ req, res }: GetServerSidePropsContext) => { 

  let { userToken } = req.cookies || null
  let isTokenValid, tokenSignature;
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

export default function Home({ notesInfos }: Props ): JSX.Element {
  return <NavBar notesInfos={notesInfos}>
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