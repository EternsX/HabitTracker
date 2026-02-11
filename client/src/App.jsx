import './App.css'
import Navbar from './Navbar/Navbar'
import Body from './Body'
import RegisterForm from './Modals/Auth/RegisterModal'
import LoginForm from './Modals/Auth/LoginModal'
import AddHabitModal from './Modals/Habits/AddHabitModal'
import useModal from './context/Modals/useModal'

function App() {
  const { registerIsOpen, loginIsOpen, habitModalisOpen } = useModal();

  return (
    <div className="app">
      <Navbar />
      <Body />
      
      {registerIsOpen && <RegisterForm />}
      {loginIsOpen && <LoginForm />}
      {habitModalisOpen && <AddHabitModal />}
      
    </div>



  )
}

export default App
