import styled from 'styled-components'
import Head from 'next/head'

interface Props { 
    children: JSX.Element
}

const Header = ({ children }: Props): JSX.Element => { 
    return <Wrapper>
        <Head> 
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
        <div className="header"> 
            <p>This project is a practice on NextJs</p>
        </div>
        { children }
    </Wrapper>
}

const Wrapper = styled.div`
// apply mains 
padding: 0;
margin: 0;
.header { 
    display: flex;
    text-align: center;
    width: 100%;
    height: 70px;
    background-color: #000000;
    p { 
        margin: auto;
        color: white;
        letter-spacing: 1.2px;
    }
}
.container { 
    display: flex;
    .sidebar { 
        scroll-behavior: auto;
        display: inline-block;
        width: 20%;
        background-color: #ededed;
        border: .5px black solid; 
        height: calc(100vh - 70px);
    }
    .main { 
        text-align: center;
        width: calc(100vw - 20%);
    }
}
`

export default Header;