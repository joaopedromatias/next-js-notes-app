import styled from 'styled-components'

interface Props { 
    children: JSX.Element
}

const Layout = ({ children }: Props): JSX.Element => { 
    return <Wrapper>
        <div className="header">
            <p>This project is a study on NextJs</p>
        </div>

        <div className="sidebar">

        </div>

        <div className="main">
            { children }
        </div>
    </Wrapper>
}

const Wrapper = styled.div`
// apply mains 
padding: 0;
margin: 0;
div.header { 
    display: flex;
    text-align: center;
    width: 100%;
    height: 70px;
    background-color: #4d359b;
    p { 
        margin: auto;
        color: white;
        letter-spacing: 1.2px;
    }
}
div.sidebar { 
    
}
`

export default Layout;