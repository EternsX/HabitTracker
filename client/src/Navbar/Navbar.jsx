import './Navbar.css'
import Button from '@mui/material/Button'
import useModal from '../context/Modals/useModal'
import useUser from '../context/User/useUser'

export default function Navbar() {
    const { openRegister, openLogin } = useModal();
    const { user, logout } = useUser();
    return (
        <>
            <div className="nav-bar">
                <span className="title">Habit Tracker</span>

                <div className="nav-actions">
                    {!user ?
                        <>
                            <Button
                                variant="outlined"
                                onClick={openLogin}
                            >
                                Login
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={openRegister}
                            >
                                Register
                            </Button>
                        </> :
                        <Button
                            variant="outlined"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    }

                </div>
            </div>
        </>
    )
}
