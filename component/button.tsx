import styled from 'styled-components'

interface Props { 
    text: string
}

export default function Button ( { text }: Props) { 
    return <Wrapper>
        <button>{text}</button>
    </Wrapper>
}

const Wrapper = styled.div`
button { 
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  transition: all .1s ease-in-out;
  border: none;
  border-radius: 5px;
  padding: 15px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #202020;
  color: rgb(238, 238, 238);
  text-transform: capitalize;
  &:hover { 
    background-color: #333333;
  }
}
`