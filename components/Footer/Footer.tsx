import styled from "styled-components";

const FooterStyle = styled.div`
    padding: 20px 0;
    text-align: center;
    font-size: 16px;
    border-top: 3px solid black;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export const Footer = () => (
    <FooterStyle>Copyright 2022 - Dominik Majka, Grzegorz Pach</FooterStyle>
)
