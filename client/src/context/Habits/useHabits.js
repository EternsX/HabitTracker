import { useContext } from "react";
import HabitsContext from "./HabitsContext";

export default function useHabits() {
  const context = useContext(HabitsContext);

  if (!context) {
    throw new Error("useHabits must be used inside a HabitsProvider");
  }

  return context;
}
