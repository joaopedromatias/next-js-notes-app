import styled from 'styled-components'

interface Props { 
    text: string
    type?: string
}

interface WrapperProps { 
  type?: string
}

export default function Button ( { text, type }: Props) { 
    return <Wrapper type={type}>
        <button>{text}</button>
    </Wrapper>
}

const Wrapper = styled.div<WrapperProps>`
button { 
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  transition: all .1s ease-in-out;
  border: none;
  border-radius: 5px;
  padding: 15px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: ${({type}) => type === 'secondary' ? '#f2f2f2' : '#202020'};
  color: ${({type}) => type === 'secondary' ? '#101010' : '#f2f2f2'};
  text-transform: capitalize;
  &:hover { 
    background-color: ${({type}) => type === 'secondary' ? '#fff' : '#333'};
  }
}
`