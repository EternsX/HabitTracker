import useUser from "../User/useUser.js";
import { useState, useEffect, useCallback } from "react";
import HabitsContext from "./HabitsContext.js";

const API_URL = "http://localhost:3001/habits";


export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null)
  const { user, loading } = useUser();
  useEffect(() => {
    if (loading) return;
    if (!user?.userId) {  // <-- check userId, not _id
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
  }, [user?.userId, loading]);

  const delHabit = useCallback(async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE", credentials: "include" });
    setHabits(prev => prev.filter(h => h._id !== id));
  }, []);

  const addHabit = useCallback(async (habit, frequency) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ habit, frequency, completed: false }),
    });
    const newHabit = await res.json();
    console.log(newHabit)
    setHabits(prev => [...prev, newHabit]);
  }, []);

  const updateHabit = useCallback(async (id, habit, frequency) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ habit, frequency }),
    });
    const updatedHabit = await res.json();
    setHabits(prev => prev.map(h => (h._id === id ? updatedHabit : h)));
  }, []);

  const completeHabit = useCallback(async (id) => {
    const res = await fetch(`${API_URL}/${id}/complete`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to complete habit");
      return;
    }

    const completedHabit = await res.json();
    setHabits(prev => prev.map(h => (h._id) === id ? completedHabit : h))
  }, []);

  const undoComplete = useCallback(async (id) => {
    const res = await fetch(`${API_URL}/${id}/undo`, {
      method: "PATCH",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to undo habit");
      return;
    }

    const updatedHabit = await res.json();

    setHabits(prev =>
      prev.map(h => h._id === id ? updatedHabit : h)
    );
  }, []);

  return (
    <HabitsContext.Provider
      value={{ user, habits, addHabit, delHabit, updateHabit, completeHabit, undoComplete, editingId, setEditingId }}
    >
      {children}
    </HabitsContext.Provider>
  );
}
