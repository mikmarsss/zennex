import { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../main";
import Button from "../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/ui/Input";

const StyledLogin = styled.div`
   width: 80%;
    height:auto;
    border:solid #33A6CC 2px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:20px;
    box-sizing: border-box;
`



const Login: React.FC = () => {

    const navigate = useNavigate()

    const { userStore } = useContext(Context)

    const [email, setEmail] = useState('')
    const [textEmailError, setTextEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [textPasswordError, setTextPasswordError] = useState('')

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (e.target.value === '') {
            setTextEmailError('')
        } else if (!re.test(String(e.target.value).toLowerCase())) {
            setTextEmailError('Некорректный email')
        } else {
            setTextEmailError('')
        }
    }

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value.length === 0) {
            setTextPasswordError('')
        } else if (e.target.value.length >= 6) {
            setTextPasswordError('')
        } else {
            setTextPasswordError('Пароль должен быть не меньше 6 символов')
        }
    }

    const loginHandler = async () => {
        await userStore.login(email, password)
        navigate('/')
    }

    return (
        <>
            <StyledLogin>
                <p style={{ fontSize: "28px" }}>Войдите</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '30px 0 0 0', width: "80%" }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <p>Почта</p>
                        <Input
                            type="email"
                            onChange={(e) => emailHandler(e)}
                            placeholder="Введите почту"
                            value={email}
                        />
                        <p style={{ color: 'red', fontSize: '14px' }}>{textEmailError}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <p>Пароль</p>
                        <Input
                            type="password"
                            onChange={(e) => passwordHandler(e)}
                            placeholder="Введите пароль"
                            value={password}
                        />

                        <p style={{ color: 'red', fontSize: '14px' }}>{textPasswordError}</p>
                    </div>

                    <Button background="#56C999" onClick={loginHandler} disabled={textEmailError === '' && textPasswordError === '' && password.length !== 0 && email.length !== 0 ? false : true}>
                        Войти
                    </Button>

                </div>
            </StyledLogin>
        </>
    )
}

export default Login