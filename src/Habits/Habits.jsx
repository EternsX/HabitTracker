import './Habits.css'
import { useState } from 'react'


export default function Habits({ habits, delHabit, updateHabit }) {
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState('')
    const [editingFrequency, setEditingFrequency] = useState(1)
    const selectOptions = [1, 2, 3, 4, 5, 6, 7]

    const getFrequencyText = (frequency) => {
        return frequency === 7
            ? 'Daily'
            : `${frequency} times per week`
    }

    const update = (id, habit, freq) => {
        updateHabit(id, habit, freq)
        setEditingId(null)

    }

    return (
        <ul>
            {habits.map(h =>
                <li key={h.id} className="habit">
                    {editingId === h.id ? (
                        <>
                            <input name={h.habit} onChange={(e) => setEditingValue(e.target.value)} type="text" value={editingValue} />
                            <select
                                name={h.habit}
                                value={editingFrequency}
                                onChange={(e) => setEditingFrequency(Number(e.target.value))}>
                                {selectOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <span className="habit-name">{h.habit} </span>
                            <span className="habit-frequency">{getFrequencyText(h.frequency)} </span>
                        </>
                    )}
                    <span className="habit-status">
                        {h.completed ? 'Done' : 'Not done'}
                    </span>
                    
                    {editingId === h.id 
                    ?
                        <>
                            <button className="delete" onClick={() => delHabit(h.id)}>x</button>
                            <button onClick={() => update(h.id, editingValue, editingFrequency)} className='submit-update'>K</button>
                            <button onClick={() => setEditingId(null)} className='cancel-update'>C</button>
                        </>
                    :
                        <button className="update"
                            onClick={() => {
                                setEditingId(h.id !== editingId ? h.id : null)
                                setEditingValue(h.habit)
                                setEditingFrequency(h.frequency)
                            }}
                        >!</button>
                    }
            </li>
            )}
        </ul >
    )
}