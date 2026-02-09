import { useState } from "react";

export default function Habit ({ h, updateHabit, delHabit }) {
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
            if (!habit.trim()) return
            updateHabit(id, habit, freq)
            setEditingId(null)
        }
    
    return (
        <>
        {editingId === h._id ? (
                        <>
                            <input name="habit" onChange={(e) => setEditingValue(e.target.value)} type="text" value={editingValue} />
                            <select
                                name="frequency"
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

                    {editingId === h._id
                        ?
                        <>
                            <button className="delete" onClick={() => delHabit(h._id)}>✖</button>
                            <button onClick={() => update(h._id, editingValue, editingFrequency)} className='submit-update'>💾</button>
                            <button onClick={() => setEditingId(null)} className='cancel-update'>C</button>
                        </>
                        :
                        <button className="update"
                            onClick={() => {
                                setEditingId(h._id)
                                setEditingValue(h.habit)
                                setEditingFrequency(h.frequency)
                            }}
                        >✏</button>
                    }
        </>
    )
}