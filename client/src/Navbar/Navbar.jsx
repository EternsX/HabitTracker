import './Navbar.css'
import Button from '@mui/material/Button'

export default function Navbar({ openRegister, openLogin, user, logout }) {

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
