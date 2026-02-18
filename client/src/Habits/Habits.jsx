import './Habits.css'
import Habit from './Habit/Habit'
import useHabits from '../context/Habits/useHabits'
import useUser from '../context/User/useUser'

export default function Habits() {
    const {habits, delHabit, } = useHabits()
    const { user } = useUser();
    return (
        <ul>
            {user ?  
                habits.map(h =>
                    <li key={h._id} className="habit">
                        <Habit h={h} delHabit={delHabit} />
                    </li> 
                )
            : 
                <p></p>
            }
        </ul >
    )
}