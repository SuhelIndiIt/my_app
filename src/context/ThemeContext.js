import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

import { useColorScheme } from "react-native";

const KEYS = {
  THEME: "THEME_PREFERENCES",
};

const lightColors = {
  background: "#ffffff",
  card: "#ffffff",
  text: "#121212",
  border: "#e0e0e0",
  notification: "#ff3b30",
  primary: "#007AFF",
  secondary: "#5856d6",
  success: "#34C759",
  danger: "#FF3B30",
  warning: "#FF9500",
  info: "#5AC8FA",
  light: "#f5f5f5",
  dark: "#1e1e1e",
  gray: "#8e8e93",
  placeholder: "#8e8e93",
  backgroundSecondary: "#f2f2f7",
  textSecondary: "#8e8e93",
};

const darkColors = {
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  border: "#2c2c2e",
  notification: "#ff453a",
  primary: "#0a84ff",
  secondary: "#5e5ce6",
  success: "#30d158",
  danger: "#ff453a",
  warning: "#ff9f0a",
  info: "#64d2ff",
  light: "#2c2c2e",
  dark: "#f5f5f5",
  gray: "#8e8e93",
  placeholder: "#8e8e93",
  backgroundSecondary: "#1c1c1e",
  textSecondary: "#8e8e93",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    getThemeFromStorage();
  }, []);

  const getThemeFromStorage = async () => {
    try {
      const savedTheme = await loadJSON(KEYS.THEME);
      if (savedTheme && savedTheme.mode) {
        setTheme(savedTheme.mode);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  const toggleTheme = async (newTheme) => {
    try {
      const themeToSet = newTheme || (theme === "light" ? "dark" : "light");
      setTheme(themeToSet);
      await saveJSON(KEYS.THEME, { mode: themeToSet });
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  const currentTheme = useMemo(
    () => ({
      mode: theme,
      colors: theme === "dark" ? darkColors : lightColors,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeCtx = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeCtx must be used within a ThemeProvider");
  }
  return context;
};
