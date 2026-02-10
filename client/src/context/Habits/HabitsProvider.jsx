import { useState, useEffect } from "react";
import HabitsContext from "./HabitsContext.js";
import useUser from "../User/useUser.js";

const API_URL = "http://localhost:3001/habits";


export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHabits([]);
      return;
    }

    const fetchHabits = async () => {
      const res = await fetch(API_URL, {
        credentials: "include",
      });
      if (!res.ok) {
        setHabits([]);
        return;
      }

      const data = await res.json();
      setHabits(data);
    };

    fetchHabits();
  }, [user]);

  const delHabit = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setHabits((prev) => prev.filter((h) => h._id !== id));
  };

  const addHabit = async (habit, frequency) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ habit, frequency, completed: false }),
    });

    const newHabit = await res.json();
    setHabits((prev) => [...prev, newHabit]);
  };

  const updateHabit = async (id, habit, frequency) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habit, frequency }),
      credentials: "include",
    });

    const updatedHabit = await res.json();

    setHabits((prev) =>
      prev.map((h) => (h._id === id ? updatedHabit : h))
    );
  };

  return (
    <HabitsContext.Provider
      value={{ user, habits, addHabit, delHabit, updateHabit }}
    >
      {children}
    </HabitsContext.Provider>
  );
}
