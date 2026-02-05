import './App.css'
import Navbar from './Navbar/Navbar'
import Body from './Body'
import { useState } from 'react'
import RegisterForm from './AuthModals/RegisterModal'
import LoginForm from './AuthModals/LoginModal'

function App() {
  const [registerIsOpen, setRegisterIsOpen] = useState(false)
  const [loginIsOpen, setLoginIsOpen] = useState(false)

  return (
    <>
      <Navbar openRegister={() => setRegisterIsOpen(true)} openLogin={() => setLoginIsOpen(true)} />
      <Body />

      {registerIsOpen && <RegisterForm closeRegister={() => setRegisterIsOpen(false)} />}
      {loginIsOpen && <LoginForm closeLogin={() => setLoginIsOpen(false)} />}
      
    </>
  )
}

export default App
