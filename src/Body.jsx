import Habits from './Habits/Habits'
import AddHabit from './Habits/AddHabit/AddHabit'
import { useState } from 'react'
import './Body.css'



const HABITS = [
    { habit: 'Read', frequency: 7, completed: false, id: crypto.randomUUID() },
    { habit: 'Work out', frequency: 6, completed: false, id: crypto.randomUUID() },
    { habit: 'Run', frequency: 3, completed: true, id: crypto.randomUUID() },
]

export default function Body() {
    const [habits, setHabits] = useState(HABITS)

    const delHabit = (habitId) => {
        setHabits(prevHabits =>
            prevHabits.filter(h => h.id !== habitId)
        )
    }

    const addHabit = ((habit, frequency) => {
        const h = {habit, frequency, completed: false, id: crypto.randomUUID()}
        setHabits(prev => [...prev, h])
    })

    const updateHabit = (id, habit, frequency) => {
        setHabits(prev => 
            prev.map(h => 
                h.id === id
                ? {...h, habit, frequency}
                : h
            )
        )
    }
    
    return (
        <div className='habits-wrapper'>
            <Habits habits={habits} delHabit={delHabit} updateHabit={updateHabit} />
            <AddHabit addHabit={addHabit} />
        </div>
    )
}