import { ActivityIndicator, StatusBar, View } from "react-native";
import { AuthProvider, useAuthCtx } from "./src/context/AuthContext";
import { ThemeProvider, useThemeCtx } from "./src/context/ThemeContext";

import AppNavigator from "./src/navigation";
import React from "react";
import { TasksProvider } from "./src/context/TasksContext";

function RootProvider({ children }) {
  return (
    <TasksProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </TasksProvider>
  );
}

const InnerApp = () => {
  const { loading } = useAuthCtx();
  const { colors } = useThemeCtx();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={
          colors.background === "#ffffff" ? "dark-content" : "light-content"
        }
      />
      <AppNavigator />
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
