import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './CreateHabitModal.css'
import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import textFieldStyles from '../../styles/textFieldStyles';
import useHabits from '../../context/Habits/useHabits';
import useModal from '../../context/Modals/useModal';

export default function UpdateHabitModal() {
    const { habits, updateHabit, editingId, setEditingId } = useHabits();
    const { closeEditHabitModal, editHabitModalisOpen } = useModal();

    const h = useMemo(
        () => habits.find(habit => habit._id === editingId),
        [habits, editingId]
    );

    const [habitName, setHabitName] = useState(h?.habit || "");
    const [frequency, setFrequency] = useState(h?.frequency || "");

    useEffect(() => {
        if (h) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHabitName(h.habit);
            setFrequency(h.frequency);
        }
    }, [h]);

    const selectOptions = ["Daily", 1, 2, 3, 4, 5, 6];


    const handleSubmit = (e) => {
        e.preventDefault()
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
