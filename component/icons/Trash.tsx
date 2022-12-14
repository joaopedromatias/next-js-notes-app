import { useEffect, useState } from "react"
import styled from "styled-components"

interface Props { 
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function TrashIcon({ onClick }: Props) { 

    const [color, setColor] = useState('#000000');
    
    return <Wrapper>
            <svg 
                onMouseEnter={() => setColor('#a62727')} 
                onMouseLeave ={() => setColor('#000000')} 
                onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="216" y1="56" x2="40" y2="56" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                </svg>
        </Wrapper>
}

const Wrapper = styled.div`
cursor: pointer;
`