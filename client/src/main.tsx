import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import UserStore from './app/store/UserStore.ts'

import { BrowserRouter } from 'react-router-dom';
import NoteStore from './app/store/NoteStore.ts';


interface State {
  userStore: UserStore,
  noteStore: NoteStore
}

const userStore = new UserStore();
const noteStore = new NoteStore()

export const Context = createContext<State>({
  userStore, noteStore
})
createRoot(document.getElementById('root')!).render(
  <Context.Provider value={{ userStore, noteStore }}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ Context.Provider>,
)
