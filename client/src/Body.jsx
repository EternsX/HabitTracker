import Habits from './Habits/Habits'
import AddHabit from './Habits/AddHabit/AddHabit'
import { useState, useEffect } from 'react'
import './Body.css'

const API_URL = 'http://localhost:3001/habits'

export default function Body() {
    const [habits, setHabits] = useState([])

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setHabits(data))
            .catch(err => console.error(err))
    }, [])

    const delHabit = async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })

        setHabits(prev => prev.filter(h => h._id !== id))
    }

    const addHabit = async (habit, frequency) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ habit, frequency, completed: false }),
        })

        const newHabit = await res.json()
        setHabits(prev => [...prev, newHabit])
    }

    const updateHabit = async (id, habit, frequency) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ habit, frequency }),
        })

        const updatedHabit = await res.json()

        setHabits(prev =>
            prev.map(h => (h._id === id ? updatedHabit : h))
        )
    }

    return (
        <div className='habits-wrapper'>
            <Habits habits={habits} delHabit={delHabit} updateHabit={updateHabit} />
            <AddHabit addHabit={addHabit} />
        </div>
    )
}