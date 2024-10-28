import React from "react";
import styled from "styled-components";


const StyledButton = styled.button<ButtonProps>`
    cursor: pointer;
    background: ${({ background, disabled }) => (disabled ? '#DAE0E4' : background)};
    padding: 6px;
    box-sizing: border-box;
    border: none;
    color: white;
    font-size: 20px; 
    border-radius: 7px;
    height: 40px;
`

interface ButtonProps {
    background: string;
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
    return (
        <>
            <StyledButton disabled={disabled} onClick={onClick} {...props}>
                {children}
            </StyledButton>
        </>
    )
}

export default Button