import { useState } from "react";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children }) {
  const [createHabitModalIsOpen, setCreateHabitModalIsOpen] = useState(false);
  const [editHabitModalIsOpen, setEditHabitModalIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        registerIsOpen,
        loginIsOpen,
        createHabitModalIsOpen,
        editHabitModalIsOpen,
        openRegister: () => setRegisterIsOpen(true),
        closeRegister: () => setRegisterIsOpen(false),
        openLogin: () => setLoginIsOpen(true),
        closeLogin: () => setLoginIsOpen(false),
        openCreateHabitModal: () => setCreateHabitModalIsOpen(true),
        closeCreateHabitModal: () => setCreateHabitModalIsOpen(false),
        openEditHabitModal: () => setEditHabitModalIsOpen(true),
        closeEditHabitModal: () => setEditHabitModalIsOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}