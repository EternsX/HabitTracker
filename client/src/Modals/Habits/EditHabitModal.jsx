import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './CreateHabitModal.css'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import textFieldStyles from '../../styles/textFieldStyles';
import useHabits from '../../context/Habits/useHabits';
import useModal from '../../context/Modals/useModal';

export default function UpdateHabitModal() {
    const { habits, updateHabit, editingId, setEditingId } = useHabits();
    const { closeEditHabitModal, editHabitModalisOpen } = useModal();

    const h = habits.find(habit => habit._id === editingId);

    const [habitName, setHabitName] = useState("");
    const [frequency, setFrequency] = useState("");

    const selectOptions = ["Daily", 1, 2, 3, 4, 5, 6];

    useEffect(() => {
        const habit = habits.find(habit => habit._id === editingId);

        if (habit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHabitName(habit.habit);
            setFrequency(
                habit.frequency === "Daily" ? "Daily" : String(habit.frequency)
            );
        }
    }, [habits, editingId]);


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ habitName, frequency })
        setHabitName('')
        setFrequency('')
        updateHabit(h._id, habitName, frequency)
        closeEditHabitModal();
        setEditingId(null);
    }

    return (
        <div className="background" onClick={closeEditHabitModal}>
            <div className="form-wrapper" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className={`habit-form ${editHabitModalisOpen ? 'active' : ''} `}>
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
                        <Button variant="contained" type='submit'>Update</Button>
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={closeEditHabitModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
