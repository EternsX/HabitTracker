export default function habitFormatters(freq, streak) {
    const isDaily = freq === 'Daily';

    const unit = isDaily
        ? (streak === 1 ? 'Day' : 'Days')
        : (streak === 1 ? 'Week' : 'Weeks');

    const getFrequencyText = (frequency) => {
        return frequency === "Daily"
            ? 'Daily'
            : `${frequency} times per week`
    }

    return {unit, getFrequencyText}
}
