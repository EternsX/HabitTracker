import Habits from './Habits/Habits'
import './Body.css'
import AddHabit from './Habits/AddHabit/AddHabit';

export default function Body() {
    
    return (
        <div className='body-wrapper'>
            <Habits />
            <AddHabit />
        </div>
    );
}
