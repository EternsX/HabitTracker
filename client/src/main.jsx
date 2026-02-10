import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HabitsProvider } from './context/Habits/HabitsProvider.jsx'
import UserProvider from './context/User/UserProvider.jsx'
import ModalProvider from './context/Modals/ModalProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ModalProvider>
        <HabitsProvider>
          <App />
        </HabitsProvider>
      </ModalProvider>
    </UserProvider>
  </StrictMode>,
)
