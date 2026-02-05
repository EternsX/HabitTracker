import './Navbar.css'
import Button from '@mui/material/Button'

export default function Navbar({ openRegister, openLogin }) {

    return (
        <>
            <div className="nav-bar">
                <span className="title">Habit Tracker</span>

                <div className="nav-actions">
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
                </div>
            </div>
        </>
    )
}
