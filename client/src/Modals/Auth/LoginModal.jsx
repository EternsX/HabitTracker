import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './LoginModal.css'
import textFieldStyles from '../../styles/textFieldStyles';
import buttonStyles from '../../styles/buttonStyles';
import { useState } from 'react';
import useModal from '../../context/Modals/useModal';
import useUser from '../../context/User/useUser';

const API_URL = 'http://localhost:3001/login'


export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { closeLogin } = useModal();
    const { fetchUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // 👈 REQUIRED
                body: JSON.stringify({ username, password }),
            })


            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Registration failed')
            }
            await fetchUser()
            closeLogin()
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="background" onClick={closeLogin}>
            <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                <h2>Login</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        type="text"
                        autoComplete="off"
                        sx={textFieldStyles}
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        required
                        autoComplete='current-password'
                        sx={textFieldStyles}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={buttonStyles}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}