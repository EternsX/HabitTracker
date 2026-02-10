import { useState } from "react";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children }) {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        registerIsOpen,
        loginIsOpen,
        isAddHabitOpen,
        openRegister: () => setRegisterIsOpen(true),
        closeRegister: () => setRegisterIsOpen(false),
        openLogin: () => setLoginIsOpen(true),
        closeLogin: () => setLoginIsOpen(false),
        openAddHabit: () => setIsAddHabitOpen(true),
        clsoeAddHabit: () => setIsAddHabitOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}