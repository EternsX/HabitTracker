import { useState, useEffect } from "react";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch('http://localhost:3001/me', { credentials: 'include' });
    if (!res.ok) {
      setUser(null);
      return;
    }
    const data = await res.json();
    setUser(data.user);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, [user]);

  const logout = async () => {
    await fetch('http://localhost:3001/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
