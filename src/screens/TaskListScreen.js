import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";

import PrimaryBtn from "../components/PrimaryBtn";
import RenderTask from "../components/RenderTask";
import TaskSection from "../components/TaskSection";
import screenNames from "../constants/screenNames";
import { useAuthCtx } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import { useThemeCtx } from "../context/ThemeContext";

const tabList = [
  { label: "Today", value: "today" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Overdue", value: "overdue" },
];

export default function TaskListScreen({ navigation }) {
  const { listGrouped, tasks, toggleComplete } = useTasks();
  const { colors } = useThemeCtx();
  const { userEmail } = useAuthCtx();
  const [activeTab, setActiveTab] = useState("today");

  const grouped = useMemo(() => listGrouped(), [tasks]);

  const styles = createStyles(colors);

  const renderTask = ({ item }) => (
    <RenderTask
      item={item}
      colors={colors}
      toggleComplete={toggleComplete}
      styles={styles}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
          {userEmail}
        </Text>

        <View style={styles.actions}>
          {/* tabs  */}
          {tabList?.map((item, index) => (
            <PrimaryBtn
              key={index}
              label={`${item.label} ${grouped?.[item.value]?.length}`}
              onPress={() => setActiveTab(item.value)}
              style={{
                flex: 1,
                marginRight: 8,
                backgroundColor:
                  activeTab === item.value
                    ? colors.primary
                    : colors.backgroundSecondary,
                width: "33%",
                marginBottom: 15,
              }}
              textStyle={{ color: colors.text }}
            />
          ))}
        </View>
      </View>

      <View style={styles.content}>
        {/* today tasks */}
        {activeTab === "today" && (
          <TaskSection
            title="Today"
            data={grouped?.today}
            renderItem={renderTask}
            colors={colors}
          />
        )}
        {activeTab === "upcoming" && (
          <TaskSection
            title="Upcoming"
            data={grouped?.upcoming}
            renderItem={renderTask}
            colors={colors}
          />
        )}

        {/* upcoming tasks */}
        {activeTab === "overdue" && (
          <TaskSection
            title="Overdue"
            data={grouped?.overdue}
            renderItem={renderTask}
            colors={colors}
          />
        )}
      </View>

      <PrimaryBtn
        label="Add"
        onPress={() => navigation.navigate(screenNames.TaskFormScreen)}
        style={styles.addTaskBtn}
        textStyle={{ color: colors.text, fontSize: 12 }}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 16,
      paddingBottom: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
    },
    userEmail: {
      fontSize: 14,
      marginBottom: 12,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    taskMeta: {
      flexDirection: "row",
      alignItems: "center",
    },
    taskMetaText: {
      fontSize: 13,
    },
    actionButton: {
      marginLeft: 12,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: colors.text,
    },
    emptyState: {
      textAlign: "center",
      marginTop: 20,
      color: colors.textSecondary,
    },
    addTaskBtn: {
      position: "absolute",
      bottom: 0,
      right: 10,
      alignSelf: "flex-end",
      width: 50,
      height: 50,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
  });
