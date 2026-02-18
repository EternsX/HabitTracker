export default function getButtonConfig(h, undoComplete, completeHabit, isCompletedThisDay, isCompletedThisWeek) {
    if (isCompletedThisDay) {
        return {
            text: "Undo",
            disabled: false,
            onClick: () => undoComplete(h._id),
        };
    }

    if (h.frequency === "Daily") {
        return {
            text: "Complete",
            disabled: false,
            onClick: () => completeHabit(h._id),
        };
    }

    if (isCompletedThisWeek) {
        return {
            text: "Completed",
            disabled: true,
        };
    }

    return {
        text: "Complete",
        disabled: false,
        onClick: () => completeHabit(h._id),
    };

}
