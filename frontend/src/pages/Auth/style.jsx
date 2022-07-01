import styled, { createGlobalStyle } from 'styled-components'
import colors from '../../utils/colors'

export const StyledPage = createGlobalStyle`
    body {
        background-image: url(/images/background.jpg);
        background-position: fixed;
    }
`

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${colors.tertiary};
    max-width: 500px;
    align-items: center;
    margin: 50px auto;
    padding: 25px 50px;
`

export const StyledFormTitle = styled.h1`
    font-size: 26px;
    color: #fff;
`

export const StyledFormInput = styled.input`
    width: 100%;
    margin-bottom: 15px;
    padding: 10px 5px;
    outline: none;
`

export const StyledFormSubmit = styled.button`
    padding: 15px 30px;
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
`