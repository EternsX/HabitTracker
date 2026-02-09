import './Habits.css'
import Habit from './Habit/Habit'


export default function Habits({ user, habits, delHabit, updateHabit }) {
    return (
        <ul>
            {user ?  
                habits.map(h =>
                    <li key={h._id} className="habit">
                        <Habit h={h} delHabit={delHabit} updateHabit={updateHabit}/>
                    </li> 
                )
            : 
                <p>Login</p>
            }
        </ul >
    )
}