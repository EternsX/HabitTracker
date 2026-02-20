import './AddHabit.css'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import useUser from '../../context/User/useUser';
import useModal from '../../context/Modals/useModal';
import Typography from '@mui/material/Typography';

const buttonStyle = {
    px: 4,
    py: 1.5,
    fontSize: "1.1rem",
    borderRadius: 3,
}

export default function AddHabit() {
    const { openCreateHabitModal } = useModal();
    const [error, setError] = useState("");
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError(""); // clear the error whenever the user logs in
        }
    }, [user]);

    const handleOpen = () => {
        if (!user) {
            setError("You need to log in to create a habit.");
            return;
        }

        setError("");
        openCreateHabitModal(true);
    };

    return (
        <div className="open-form">
            <Button
                sx={buttonStyle}
                size="large"
                variant="outlined"
                onClick={handleOpen}
            >
                Add a Habit
            </Button>

            <div style={{ minHeight: 24, marginTop: 8 }}>
                {error && (
                    <Typography variant="caption" color="error">
                        {error}
                    </Typography>
                )}
            </div>
        </div>
    )
}