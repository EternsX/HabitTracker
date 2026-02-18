import './App.css'
import Navbar from './Navbar/Navbar'
import Body from './Body'
import RegisterForm from './Modals/Auth/RegisterModal'
import LoginForm from './Modals/Auth/LoginModal'
import CreateHabitModal from './Modals/Habits/CreateHabitModal'
import EditHabitModal from './Modals/Habits/EditHabitModal'
import useModal from './context/Modals/useModal'

function App() {
  const { registerIsOpen, loginIsOpen, createHabitModalIsOpen, editHabitModalIsOpen } = useModal();

  return (
    <div className="app">
      <Navbar />
      <Body />
      
      {registerIsOpen && <RegisterForm />}
      {loginIsOpen && <LoginForm />}
      {createHabitModalIsOpen && <CreateHabitModal />}
      {editHabitModalIsOpen && <EditHabitModal />}
      
    </div>



  )
}

export default App
