import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './RegisterForm.css'
import textFieldStyles from '../styles/textFieldStyles';
import buttonStyles from '../styles/buttonStyles';
import { useState } from 'react';

const API_URL = 'http://localhost:3001/register'

export default function RegisterForm({ closeRegister, onRegisterSuccess }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // 1️⃣ Register user
            const res = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Registration failed')

            // 2️⃣ Immediately login
            const loginRes = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            })

            const loginData = await loginRes.json()
            if (!loginRes.ok) throw new Error(loginData.error || 'Login failed')

            // 3️⃣ Update App state
            await onRegisterSuccess() // <-- same as fetchMe
            closeRegister()

        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <div className="background" onClick={closeRegister}>
            <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                <h2>Register</h2>
                <form className='register-form' onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        type="text"
                        autoComplete="off"
                        required
                        sx={textFieldStyles}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        required
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
                        Register
                    </Button>
                </form>
            </div>
        </div>
    )
}