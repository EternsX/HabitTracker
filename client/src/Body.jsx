import Habits from './Habits/Habits'
import './Body.css'
import useModal from './context/Modals/useModal'
import Button from '@mui/material/Button';

const buttonStyle = {
    px: 4,
    py: 1.5,
    fontSize: "1.1rem",
    borderRadius: 3,
}

export default function Body() {
    const { openHabitModal } = useModal()
    return (
        <div className='body-wrapper'>
            <Habits />
            <div className="open-form" >
                <Button sx={buttonStyle} size="large" variant="outlined" onClick={() => openHabitModal(true)}>Add a Habit</Button>
            </div>
        </div>
    )
}