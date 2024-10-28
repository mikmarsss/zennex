import React from "react";
import styled from "styled-components";


const StyledInput = styled.input<InputProps>`
    height: 35px;
    width: ${({ width }) => (width || 'auto')};
    border: solid black 1px; 
    border-radius: 10px;
    padding: 7px; 
    box-sizing: border-box;
    font-size: 16px;
`

interface InputProps {
    width?: string;
    type: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, onChange, value, ...props }) => {
    return (
        <>

            <StyledInput
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                {...props}
            />

        </>
    )
}

export default Input