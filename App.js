import { ActivityIndicator, StatusBar, View } from "react-native";
import { AuthProvider, useAuthCtx } from "./src/context/AuthContext";
import { ThemeProvider, useThemeCtx } from "./src/context/ThemeContext";

import React from "react";
import StackNavigator from "./src/navigator/StackNavigator";
import { TasksProvider } from "./src/context/TasksContext";

/**
 * RootProvider is the top-level provider component that wraps the entire app.
 * It provides the following contexts:
 * - TasksProvider: Provides the state and actions for managing tasks.
 * - AuthProvider: Provides the state and actions for managing user authentication.
 * - ThemeProvider: Provides the state and actions for managing the app's theme.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.ReactElement} The rendered component.
 */
function RootProvider({ children }) {
  return (
    <TasksProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </TasksProvider>
  );
}

/**
 * InnerApp is the component that renders the main application UI.
 * It checks if the user authentication is still loading.
 * If loading, it displays a loading screen.
 * If not loading, it renders the main application navigator.
 *
 * @returns {React.ReactElement} The rendered component.
 */
const InnerApp = () => {
  const { loading } = useAuthCtx();
  const { colors } = useThemeCtx();

  // If user authentication is still loading, display a loading screen
  if (loading) {
    return (
      <View
        // Fill the entire screen
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        {/* Display a large loading indicator */}
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // If user authentication is loaded, render the main application navigator
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Set the status bar color based on the background color */}
      <StatusBar
        barStyle={
          colors.background === "#ffffff" ? "dark-content" : "light-content"
        }
      />
      {/* Render the main application navigator */}
      <StackNavigator />
    </View>
  );
};

const App = () => {
  return (
    <RootProvider>
      <InnerApp />
    </RootProvider>
  );
};

export default App;
