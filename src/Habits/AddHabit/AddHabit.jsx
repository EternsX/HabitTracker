import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './AddHabit.css'
import { useState } from 'react';
import Button from '@mui/material/Button';

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#1f3a57',           // input background
        color: '#ffffff',                     // text color
        '& fieldset': { borderColor: '#4a90e2' },        // default border
        '&:hover fieldset': { borderColor: '#74b9ff' },  // hover border
        '&.Mui-focused fieldset': { borderColor: '#1abc9c' }, // focused border
    },
    '& label': { color: '#a0c4ff' },       // default label color
    '& label.Mui-focused': { color: '#1abc9c' }, // focused label
    '& .MuiInputBase-input': { color: '#ffffff' }, // text input color
    '& .MuiFormHelperText-root': {
        color: '#a0c4ff', // pick your color
    },
}


export default function AddHabit({ addHabit }) {
    const [habitName, setHabitName] = useState('')
    const selectOptions = [1, 2, 3, 4, 5, 6, 7]
    const [frequency, setFrequency] = useState(1)
    const [visibleForm, setVisibleForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ habitName, frequency })
        setHabitName('')
        setFrequency(1)
        // Later: call parent onAdd function
        addHabit(habitName, frequency)
        setVisibleForm(false);
    }

    return (
        <div className='wrapper'>
            <Button className="open-form" variant="outlined" onClick={() => setVisibleForm(true)}>Add a Habit</Button>
            <form onSubmit={handleSubmit} className={`habit-form ${visibleForm ? 'active' : ''} `}>
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
                        onClick={() => setVisibleForm(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}