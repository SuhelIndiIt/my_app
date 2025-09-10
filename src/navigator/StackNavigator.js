import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { Text, View } from "react-native";

import AuthScreen from "../screens/AuthScreen";
import React from "react";
import TabNavigator from "./TabNavigator";
import TaskFormScreen from "../screens/TaskFormScreen";
import { createStackNavigator } from "@react-navigation/stack";
import screenNames from "../constants/screenNames";
import { useAuthCtx } from "../context/AuthContext";
import { useThemeCtx } from "../context/ThemeContext";

const Stack = createStackNavigator();

/**
 * StackNavigator is the root navigator for the application.
 * It contains multiple screens and defines the navigation structure.
 *
 * Screens:
 * - AuthScreen: The login screen.
 * - TaskFormScreen: The screen to create new tasks.
 * - TabNavigator: The main application navigator with tabs.
 *
 * Navigation:
 * - The initial screen is AuthScreen if the user is not logged in.
 * - If the user is logged in, the initial screen is TabNavigator.
 * - The stack navigator uses the default theme if the background color is white.
 * - The stack navigator uses the dark theme if the background color is black.
 */

const StackNavigator = () => {
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
              name="MainTabs"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screenNames.TaskFormScreen}
              component={TaskFormScreen}
              options={{ title: "Task Form" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
