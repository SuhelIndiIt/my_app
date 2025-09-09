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
import React, { useMemo } from "react";

import PrimaryBtn from "../componets/PrimaryBtn";
import screenNames from "../constants/screenNames";
import { useAuthCtx } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import { useThemeCtx } from "../context/ThemeContext";

const Section = ({ title, data, renderItem, colors }) => (
  <View style={{ marginVertical: 8 }}>
    <Text
      style={{
        fontWeight: "700",
        marginBottom: 6,
        color: colors.text,
        fontSize: 16,
      }}
    >
      {title} ({data?.length})
    </Text>
    {data?.length === 0 ? (
      <Text style={{ color: colors.textSecondary, marginLeft: 8 }}>
        No tasks
      </Text>
    ) : (
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        style={{ marginBottom: 16 }}
      />
    )}
  </View>
);

export default function TaskListScreen({ navigation }) {
  const { listGrouped, tasks, toggleComplete } = useTasks();
  const { colors } = useThemeCtx();
  const { userEmail } = useAuthCtx();
  const grouped = useMemo(() => listGrouped(), [tasks]);

  const styles = createStyles(colors);

  const renderTask = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screenNames.TaskFormScreen, { taskId: item.id })
      }
      style={[
        styles.row,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.taskTitle,
            {
              color: colors.text,
              textDecorationLine:
                item.status === "completed" ? "line-through" : "none",
              opacity: item.status === "completed" ? 0.7 : 1,
            },
          ]}
        >
          {item.title}
        </Text>
        <View style={styles.taskMeta}>
          <Text style={[styles.taskMetaText, { color: colors.textSecondary }]}>
            {item.priority} • {item.tags?.join(", ") || "no tags"}
          </Text>
        </View>
      </View>
      <View style={styles.actionButton}>
        <PrimaryBtn
          label={item.status === "completed" ? "Reopen" : "Complete"}
          onPress={() => toggleComplete(item.id)}
          style={{
            backgroundColor:
              item.status === "completed" ? colors.success : colors.primary,
            paddingVertical: 6,
            paddingHorizontal: 12,
            margin: 0,
            width: "auto",
            minWidth: 100,
          }}
          textStyle={{ fontSize: 14 }}
        />
      </View>
    </TouchableOpacity>
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
          <PrimaryBtn
            label="New Task"
            onPress={() => navigation.navigate(screenNames.TaskFormScreen)}
            style={{
              flex: 1,
              marginRight: 8,
              backgroundColor: colors.primary,
              width: "33%",
            }}
          />
          <PrimaryBtn
            label="Activity"
            onPress={() => navigation.navigate(screenNames.ActivityLogScreen)}
            style={{
              backgroundColor: colors.backgroundSecondary,
              marginRight: 8,
              width: "33%",
            }}
            textStyle={{ color: colors.text }}
          />
          <PrimaryBtn
            label="Settings"
            onPress={() => navigation.navigate(screenNames.SettingsScreen)}
            style={{
              backgroundColor: colors.backgroundSecondary,
              width: "33%",
            }}
            textStyle={{ color: colors.text }}
          />
        </View>
      </View>

      <View style={styles.content}>
        <Section
          title="Today"
          data={grouped?.today}
          renderItem={renderTask}
          colors={colors}
        />
        <Section
          title="Upcoming"
          data={grouped?.upcoming}
          renderItem={renderTask}
          colors={colors}
        />
        <Section
          title="Overdue"
          data={grouped?.overdue}
          renderItem={renderTask}
          colors={colors}
        />
      </View>
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
      padding: 16,
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
  });
