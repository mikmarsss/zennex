
import styled from 'styled-components'
import SideBar from '../widgets/Sidebar'
import './styles/global.css'
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { Context } from '../main'
import 'react-toastify/dist/ReactToastify.css';
import { observer } from 'mobx-react-lite'
import { authRoutes } from './routes/routes'
import { Route, Routes } from 'react-router-dom'

const StyledApp = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: row;
`

const StyledMain = styled.div`
padding-top: 100px;
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: #D9F3FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

function App() {

  const { userStore } = useContext(Context)

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        await userStore.checkAuth();
      }
    };

    checkAuth();
  }, [userStore]);

  return (
    <>

      <div>
        <ToastContainer />
        <StyledApp>
          <SideBar />
          <StyledMain>
            {
              !userStore.isAuth &&
              <p style={{ margin: '100px 0 0 0', fontSize: '32px', textAlign: 'center' }}>Войдите или зарегистрируйтесь, чтобы продолжить</p>
            }
            {
              <Routes>
                {userStore.isAuth && authRoutes.map(({ path, Component }) =>
                  <Route key={path} path={path} Component={Component} />
                )}
              </Routes>
            }
          </StyledMain>
        </StyledApp>
      </div>
    </>
  )
}

export default observer(App)
