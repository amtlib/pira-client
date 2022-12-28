import React from "react";
import Pira from "../../public/images/pira.svg";
import Image from 'next/image';
import styled from "styled-components";


const Wrapper = styled.div`
    width: 100px;
    max-height: 100%;
    & > svg {
        max-width:100%;
        height: 100%;
        max-height:100%;
        object-fit: contain
    }
`

export const Logo = () => {
    return (
        <Wrapper>
            <Pira />
        </Wrapper>
    )
}