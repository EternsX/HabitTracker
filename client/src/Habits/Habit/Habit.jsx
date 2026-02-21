import './Habit.css';
import { completionsThisWeek, calculateStreak } from "../../utils/tracker";
import HabitOptions from "./HabitOptions/HabitOptions"
import HabitActionButton from './HabitActionButton/HabitActionButton';
import habitFormatters from '../../utils/habitFormatters';

export default function Habit({ h, delHabit }) {
    const completions = completionsThisWeek(h?.completionDates ? h.completionDates : [])
    const streak = calculateStreak(h.completionDates, h.frequency)
    const { getFrequencyText, unit } = habitFormatters(h.frequency, streak)


    return (
        <div className="habit-card">
            <div className="habit-info">
                <span className="habit-name">{h.habit}</span>
                <span className="habit-frequency">
                    {getFrequencyText(h.frequency)}
                </span>

                <span className="habit-streak">
                    {streak > 0 ? `${streak} ${unit} streak` : "No streak"}
                </span>
            </div>

            <div className="habit-right">
                <div className="habit-status">
                    {Array.from({
                        length: h.frequency !== "Daily" ? Number(h.frequency) : 1
                    }).map((_, i) => (
                        <div
                            key={i}
                            className={`status-bar ${i < completions ? "completed" : ""}`}
                        />
                    ))}
                </div>

                <HabitActionButton h={h} />
                <HabitOptions h={h} delHabit={delHabit} />
            </div>
        </div>
    )
}

