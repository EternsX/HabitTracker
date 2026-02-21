import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './LoginModal.css'
import textFieldStyles from '../../styles/textFieldStyles';
import buttonStyles from '../../styles/buttonStyles';
import { useState } from 'react';
import useModal from '../../context/Modals/useModal';
import useUser from '../../context/User/useUser';
import Typography from '@mui/material/Typography';
import { API_URL } from '../../api/api';

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { closeLogin } = useModal();
    const { fetchUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // 👈 REQUIRED
                body: JSON.stringify({ username, password }),
            })


            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Wrong username or password")
                return
            }

            setError("");
            await fetchUser()
            closeLogin()
        } catch (err) {
            setError("Something went wrong. Please try again.")
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
                    <div style={{ minHeight: 24, marginTop: 8 }}>
                        {error && (
                            <Typography variant="caption" color="error">
                                {error}
                            </Typography>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}