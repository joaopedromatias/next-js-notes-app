import styled from "styled-components"
import { useEffect, useRef } from "react"

export default function WriteArea (): JSX.Element { 
    
    const noteTitle = useRef({} as HTMLInputElement);
    const noteBody = useRef({} as HTMLTextAreaElement);

    useEffect(() => { 
        noteBody.current.focus();
    }, [])

    return <Wrapper>
        <input className="title" ref={noteTitle} placeholder={'Note Title...'}/>
        <hr />
        <textarea className="note" ref={noteBody} placeholder={'Start writing...'}/>
    </Wrapper>
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