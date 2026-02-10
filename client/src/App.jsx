import './App.css'
import Navbar from './Navbar/Navbar'
import Body from './Body'
import RegisterForm from './Modals/Auth/RegisterModal'
import LoginForm from './Modals/Auth/LoginModal'
import useModal from './context/Modals/useModal'

function App() {
  const { registerIsOpen, loginIsOpen } = useModal();
  
  return (
    <>
      <Navbar />
      <Body />

      {registerIsOpen && <RegisterForm />}
      {loginIsOpen && <LoginForm />}

    </>
  )
}

export default App
