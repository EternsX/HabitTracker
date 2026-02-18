import getButtonConfig from "./getButtonConfig";
import Button from '@mui/material/Button'
import useHabits from "../../../context/Habits/useHabits";
import { isCompletedToday, isCompletedForWeek } from "../../../utils/tracker";

export default function HabitActionButton({ h }) {
    const { completeHabit, undoComplete } = useHabits()
    const isCompletedThisDay = isCompletedToday(h.completionDates)
    const isCompletedThisWeek = isCompletedForWeek(h.completionDates, h.frequency)

    const { text, disabled, onClick } = getButtonConfig(h, undoComplete, completeHabit, isCompletedThisDay, isCompletedThisWeek);

    

    return (
        <div>
            <Button
                disabled={disabled}
                onClick={onClick}
                sx={{
                    ml: "auto",
                    "&.Mui-disabled": {
                        color: "#6c8aa3",
                        opacity: 0.7,
                    }
                }}
            >
                {text}
            </Button>
        </div>

    )
}