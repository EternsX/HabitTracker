import './App.css'
import Navbar from './Navbar/Navbar'
import Body from './Body'
import { useState, useEffect } from 'react'
import RegisterForm from './AuthModals/RegisterModal'
import LoginForm from './AuthModals/LoginModal'

function App() {
  const [registerIsOpen, setRegisterIsOpen] = useState(false)
  const [loginIsOpen, setLoginIsOpen] = useState(false)
  const [user, setUser] = useState(null)

  const fetchMe = async () => {
    const res = await fetch('http://localhost:3001/me', {
      credentials: 'include',
    })

    if (!res.ok) {
      setUser(null)
      return
    }

    const data = await res.json()
    setUser(data.user)
  }
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMe()
  }, [])

  const logout = async () => {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setUser(null)

  }

  return (
    <>
      <Navbar openRegister={() => setRegisterIsOpen(true)} openLogin={() => setLoginIsOpen(true)} user={user} logout={logout} />
      <Body user={user}/>

      {registerIsOpen && <RegisterForm closeRegister={() => setRegisterIsOpen(false)} onRegisterSuccess={fetchMe} />}
      {loginIsOpen && <LoginForm closeLogin={() => setLoginIsOpen(false)} onLoginSuccess={fetchMe} />}

    </>
  )
}

export default App
