import { useState } from "react";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children }) {
  const [habitModalisOpen, setHabitModalIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        registerIsOpen,
        loginIsOpen,
        habitModalisOpen,
        openRegister: () => setRegisterIsOpen(true),
        closeRegister: () => setRegisterIsOpen(false),
        openLogin: () => setLoginIsOpen(true),
        closeLogin: () => setLoginIsOpen(false),
        openHabitModal: () => setHabitModalIsOpen(true),
        closeHabitModal: () => setHabitModalIsOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}