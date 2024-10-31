import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../main";
import Signin from "../Signin";
import Login from "../Login";
import Button from "../../shared/ui/Button";

const StyledSideBar = styled.div`
    width:20%;
    min-width: 350px;
    min-height: 100vh;
    height: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;

`

const SideBar: React.FC = () => {
    const { userStore } = useContext(Context)

    const [auth, setAuth] = useState('login')

    return (
        <>
            <StyledSideBar>
                {
                    !userStore.isAuth &&
                    <>
                        <div style={{ display: 'flex', gap: '20px', margin: '0 0 30px 0', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Button background="#56C999" onClick={() => setAuth('login')}>
                                Войти
                            </Button>
                            <Button background="#56C999" onClick={() => setAuth('signin')}>
                                Зарегистрироваться
                            </Button>
                        </div>
                        {
                            auth === 'signin' &&
                            <Signin />
                        }
                        {
                            auth === 'login' &&
                            <Login />
                        }
                    </>
                }
                {
                    userStore.isAuth &&
                    <>
                        <p style={{ fontSize: '32px', margin: '0 0 40px 0' }}>{userStore.user.username}</p>

                        <button
                            onClick={() => userStore.logout()}
                            style={{ cursor: 'pointer', background: '#CC5C5C', padding: '6px', boxSizing: 'border-box', border: 'none', color: 'white', fontSize: '20px', borderRadius: '7px' }}
                        >
                            Выйти
                        </button>
                    </>
                }
            </StyledSideBar>
        </>
    )
}

export default SideBar