import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { API_URL } from "../../api/api";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <--- new

  const fetchUser = async () => {
    setLoading(true); // start loading
    try {
      const res = await fetch(`${API_URL}/me`, { credentials: 'include' });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON");
        setUser(null);
        return;
      } 

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false); // done loading
    }
  }

  useEffect(() => {
    fetchUser(); // only run once
  }, []); // empty dependency array, not [user]

  const logout = async () => {
    await fetch(`${API_URL}/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
