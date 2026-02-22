import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './CreateHabitModal.css'
import { useState } from 'react';
import Button from '@mui/material/Button';
import textFieldStyles from '../../styles/textFieldStyles';
import useHabits from '../../context/Habits/useHabits';
import useModal from '../../context/Modals/useModal';

export default function CreateHabitModal() {
    const [habitName, setHabitName] = useState('')
    const selectOptions = ["Daily", 1, 2, 3, 4, 5, 6]
    const [frequency, setFrequency] = useState("")
    const { addHabit } = useHabits();
    const { closeCreateHabitModal, createHabitModalisOpen } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        addHabit(habitName, frequency)
        setHabitName('')
        setFrequency('')
        closeCreateHabitModal();
    }

    return (
        <div className="background" onClick={closeCreateHabitModal}>
            <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className={`habit-form ${createHabitModalisOpen ? 'active' : ''} `}>
                    <div className='inputs'>
                        <TextField
                            id="habit-name"
                            value={habitName}
                            label="Habit Name"
                            variant="outlined"
                            onChange={(e) => setHabitName(e.target.value)}
                            sx={textFieldStyles}
                        />
                        <TextField
                            select
                            label="Frequency"
                            value={frequency}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFrequency(value === "Daily" ? "Daily" : Number(value));
                            }}
                            helperText="Times per Week"
                            sx={textFieldStyles}
                        >
                            {selectOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <Button variant="contained" type='submit'>add</Button>
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={closeCreateHabitModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
