import { KEYS, loadJSON, removeJSON, saveJSON } from "../utils/storage";
import { createContext, useContext, useEffect, useState } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext();

/**
 * AuthProvider is a context provider component that manages the user's authentication state.
 * It provides the following contexts:
 * - userEmail: The user's email address, or null if the user is not logged in.
 * - setUserEmail: A function to set the user's email address.
 * - loading: A boolean indicating if the authentication state is currently being loaded.
 * - setLoading: A function to set the loading state.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.ReactElement} The rendered component.
 */

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on mount
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

  // Sign in with email and save session
  const signIn = async (email) => {
    const session = { email, createdAt: new Date().toISOString() };
    setUserEmail(email);
    await saveJSON(KEYS.SESSION, session);
  };

  // Sign out and remove session
  const signOut = async () => {
    setUserEmail(null);
    GoogleSignin.signOut();
    await removeJSON(KEYS.SESSION);
  };

  // Return auth context provider with user email, loading state, sign in and sign out functions
  return (
    <AuthContext.Provider
      value={{ userEmail, setUserEmail, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuthCtx = () => useContext(AuthContext);
