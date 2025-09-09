import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { Text, View } from "react-native";

import ActivityLogScreen from "./screens/ActivityLogScreen";
import AuthScreen from "./screens/AuthScreen";
import React from "react";
import SettingsScreen from "./screens/SettingsScreen";
import TaskFormScreen from "./screens/TaskFormScreen";
import TaskListScreen from "./screens/TaskListScreen";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "./constants/screenNames";
import { useAuthCtx } from "./context/AuthContext";
import { useThemeCtx } from "./context/ThemeContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userEmail, loading } = useAuthCtx();
  const { colors } = useThemeCtx();

  const MyTheme = {
    ...(colors.background === "#ffffff" ? DefaultTheme : DarkTheme),
    colors: {
      ...(colors.background === "#ffffff"
        ? DefaultTheme.colors
        : DarkTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.card,
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    cardStyle: {
      backgroundColor: colors.background,
    },
    headerBackTitleVisible: false,
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        {!userEmail ? (
          <Stack.Screen
            name={screenNames.AuthScreen}
            component={AuthScreen}
            options={{ title: "Login" }}
          />
        ) : (
          <>
            <Stack.Screen
              name={screenNames.TaskListScreen}
              component={TaskListScreen}
              options={{ title: "Tasks List" }}
            />

            <Stack.Screen
              name={screenNames.TaskFormScreen}
              component={TaskFormScreen}
              options={{ title: "Task Form" }}
            />

            <Stack.Screen
              name={screenNames.ActivityLogScreen}
              component={ActivityLogScreen}
              options={{ title: "Activity Log" }}
            />

            <Stack.Screen
              name={screenNames.SettingsScreen}
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
