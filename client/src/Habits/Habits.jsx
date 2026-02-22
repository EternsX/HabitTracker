import './Habits.css'
import Habit from './Habit/Habit'
import useHabits from '../context/Habits/useHabits'
import useUser from '../context/User/useUser'

export default function Habits() {
    const {habits, delHabit, } = useHabits()
    const { user } = useUser();
    return (
        <>
            {user ?  
                habits.map(h =>
                        <Habit key={h._id} h={h} delHabit={delHabit} />
                )
            : 
                <p></p>
            }
        </>
    )
}