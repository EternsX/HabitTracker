import './Habit.css';
import Button from '@mui/material/Button'
import { completionsThisWeek, checkIfCompleted, calculateStreak } from "../../utils/tracker";
import useHabits from "../../context/Habits/useHabits";
import HabitOptions from "./HabitOptions/HabitOptions"

export default function Habit({ h, delHabit }) {
    const { completeHabit } = useHabits()

    const completions = completionsThisWeek(h?.completionDates ? h.completionDates : [])
    const isCompleted = checkIfCompleted(h.freq, h.completionDates)
    const streak = calculateStreak(h.completionDates, h.frequency)
    const isDaily = h.frequency === 'Daily';
    const unit = isDaily
        ? (streak === 1 ? 'Day' : 'Days')
        : (streak === 1 ? 'Week' : 'Weeks');

    const getFrequencyText = (frequency) => {
        return frequency === "Daily"
            ? 'Daily'
            : `${frequency} times per week`
    }

    return (
        <div className="habits">
            <span className="habit-name">{h.habit}{" "}</span>
            <span className="habit-frequency">{getFrequencyText(h.frequency)} </span>
            <div className="habit-status">
                {Array.from({ length: h.frequency !== "Daily" ? Number(h.frequency) : 1 }).map((_, i) => (
                    <div
                        key={i}
                        className={`status-bar ${i < completions ? "completed" : ""}`}
                    ></div>
                ))}
            </div>

            <Button
                disabled={isCompleted}
                onClick={() => completeHabit(h._id)}
                sx={{
                    "&.Mui-disabled": {
                        color: "#6c8aa3",             // muted blue text
                        opacity: .7,                   // prevent default faded look
                    }
                }}
            >
                {isCompleted ? "Completed" : "Complete"}
            </Button>

            <span>
                {streak > 0 ? `${streak} ${unit} Streak` : 'No streak'}
            </span>

            <HabitOptions h={h} delHabit={delHabit} />

        </div>
    )
}

