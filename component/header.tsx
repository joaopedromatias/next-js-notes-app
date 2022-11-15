import styled from 'styled-components'
import Head from 'next/head'
import Button from './Button'
import Link from'next/link'

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
                <div className='hold-button'>
                    <Link href='/write'><Button type='secondary' text='New note'></Button></Link>
                </div>
            </div>
        { children }
    </Wrapper>
}

const Wrapper = styled.div`
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
    .hold-button { 
        position: absolute;
        margin-top: 11.75px;
        margin-left: 10px;
    }
}
`

export default Header;