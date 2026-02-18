export function completionsThisWeek(completionDates) {
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  let i = completionDates.length - 1;
  let completed = 0

  completionDates = completionDates.map(d => new Date(d))

  while (i >= 0 && completionDates[i] >= startOfWeek) {

    completed++;
    i--;
  }
  return completed;
}

export function checkIfCompleted(freq, completionDates) {
  if (!completionDates?.length) return false;

  const today = new Date();
  const lastCompletedDay = new Date(completionDates[completionDates.length - 1]);
  const completedToday = compareDates(today, lastCompletedDay)

  if (freq === 'Daily') return completedToday;

  return (
    completedToday ||
    (completionsThisWeek(completionDates) >= Number(freq))
  );
}

function completionsOfWeek(completionDates, weekStart, idx) {
  let completedThisWeek = 0;
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  while (idx >= 0 && completionDates[idx] >= weekStart && completionDates[idx] <= weekEnd) {
    completedThisWeek++;
    idx--; // move pointer backward
  }

  return [completedThisWeek, idx]
}


export function calculateStreak(completionDates, freq) {
  if (!completionDates || completionDates.length === 0) return 0;
  completionDates = completionDates.map(d => new Date(d))
  if (freq == 'Daily') return calculateDailyStreak(completionDates)



  let curWeekStart = getStartOfWeek(new Date());
  let completedThisWeek = completionsThisWeek(completionDates);
  let streak = (completedThisWeek >= freq) ? 1 : 0;

  let i = completionDates.length - 1 - completedThisWeek; // pointer to last date
  curWeekStart.setDate(curWeekStart.getDate() - 7);
  // Loop week by week
  while (i >= 0) {
    let [completedThisWeek, newIdx] = completionsOfWeek(completionDates, curWeekStart, i);
    i = newIdx;

    if (completedThisWeek >= freq) {
      streak++;
      curWeekStart.setDate(curWeekStart.getDate() - 7); // previous week
    } else {
      break; // streak ends
    }
  }

  return streak;
}

function calculateDailyStreak(completionDates) {
  let curDay = new Date();
  let i = completionDates.length - 1;

  let completed = compareDates(curDay, completionDates[i]) ? 1 : 0;
  i--;
  curDay.setDate(curDay.getDate() - 1);

  while (i >= 0 && compareDates(curDay, completionDates[i])) {
    i--;
    completed++;
    curDay.setDate(curDay.getDate() - 1);
  }

  return completed;
}

function compareDates(d1, d2) {
  return (d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate())
}

function getStartOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)

  // Convert Sunday (0) to 7 so math works for Monday-based week
  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0); // normalize time

  return d;
}


