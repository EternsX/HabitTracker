import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './AddHabitModal.css'
import { useState } from 'react';
import Button from '@mui/material/Button';
import textFieldStyles from '../../styles/textFieldStyles';
import useHabits from '../../context/Habits/useHabits';
import useModal from '../../context/Modals/useModal';

export default function AddHabitModal() {
    const [habitName, setHabitName] = useState('')
    const selectOptions = [1, 2, 3, 4, 5, 6, 7]
    const [frequency, setFrequency] = useState(1)
    const { addHabit } = useHabits();
    const { closeHabitModal, habitModalisOpen } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ habitName, frequency })
        setHabitName('')
        setFrequency(1)
        addHabit(habitName, frequency)
        closeHabitModal();
    }

    return (
        <div className="background" onClick={closeHabitModal}>
            <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className={`habit-form ${habitModalisOpen ? 'active' : ''} `}>
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
                            id="frequency"
                            select
                            label="Frequency"
                            className='freq'
                            value={frequency}
                            helperText="Times per Week"
                            onChange={(e) => setFrequency(Number(e.target.value))}
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
                            onClick={closeHabitModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
