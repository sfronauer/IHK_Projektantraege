'use client';
import { LoginContext } from "./LoginContext";
import { useContext } from 'react';

const useCheckLogin = (roleAllowed) => {

  const { login } = useContext(LoginContext);

  if (!login.session) return false;        // Wenn es keinen Token gibt dann false

  if (Array.isArray(roleAllowed)) {        // Für mehrere Rollen; Prüft, ob die Rolle vorhanden ist (muss als Array übergeben werden)
    return roleAllowed.includes(login.role);
  }

  return login.role === roleAllowed;
};

export default useCheckLogin;