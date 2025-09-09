import { KEYS, loadJSON, removeJSON, saveJSON } from "../utils/storage";
import { createContext, useContext, useEffect, useState } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const loggedUser = await loadJSON(KEYS.SESSION, null);

        if (loggedUser && loggedUser.email) {
          setUserEmail(loggedUser.email);
        }

        setLoading(false);
      } catch (error) {
        console.log(error, "error");
      }
    })();
  }, []);

  const signIn = async (email) => {
    const session = { email, createdAt: new Date().toISOString() };
    setUserEmail(email);
    await saveJSON(KEYS.SESSION, session);
  };

  const signOut = async () => {
    setUserEmail(null);
    GoogleSignin.signOut();
    await removeJSON(KEYS.SESSION);
  };

  return (
    <AuthContext.Provider
      value={{ userEmail, setUserEmail, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => useContext(AuthContext);
