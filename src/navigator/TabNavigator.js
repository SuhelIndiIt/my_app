import { StyleSheet, Text, View } from "react-native";

import ImageImport from "../constants/imageImport";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import screenNames from "../constants/screenNames";
import { useThemeCtx } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

/**
 * TabNavigator is the navigator for the main application tabs.
 * It contains multiple screens and defines the tab navigation structure.
 *
 * Screens:
 * - TaskListScreen: The screen to display and manage tasks.
 * - ActivityLogScreen: The screen to display the activity log.
 * - SettingsScreen: The screen to display and manage settings.
 *
 * Navigation:
 * - The tabs are displayed at the bottom of the screen.
 * - The active tab is highlighted with the primary color.
 * - The inactive tabs are displayed with gray color.
 * - The tab bar is styled based on the background color.
 * - The header is not shown for each screen.
 * - The tab bar icons are hidden.
 */

const TabNavigator = () => {
  const { mode, colors } = useThemeCtx();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors?.primary || "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: colors?.card || "#fff",
          borderTopColor: colors?.border || "#ddd",
        },
        headerShown: false,

        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen
        name={screenNames.TaskListScreen}
        component={require("../screens/TaskListScreen").default}
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused }) => (
            <ImageImport.taskSvg
              color={mode === "dark" ? "#fff" : "#000"}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.ActivityLogScreen}
        component={require("../screens/ActivityLogScreen").default}
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => (
            <ImageImport.activitySvg
              color={mode === "dark" ? "#fff" : "#000"}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.SettingsScreen}
        component={require("../screens/SettingsScreen").default}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <ImageImport.settingSvg
              color={mode === "dark" ? "#fff" : "#000"}
              style={{ opacity: focused ? 1 : 0.7 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
