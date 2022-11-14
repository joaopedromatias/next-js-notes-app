import styled from 'styled-components'
import Link from 'next/link'

interface Props { 
    urlNotesNames: string[]
    displayNotesNames: string[]
    children: JSX.Element
}

export default function NavBar ({ urlNotesNames, displayNotesNames, children }: Props): JSX.Element { 
    return <Wrapper>
    <div className='sidebar'>
        {displayNotesNames.map( (noteName, index) => {
            return <div key={index} className='note-block'>
                    <Link className='note-name' href={urlNotesNames[index]}>{ noteName }</Link>
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
        .note-name { 
            text-decoration: none;
            text-transform: capitalize;
            color: inherit;
            letter-spacing: 1px;
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