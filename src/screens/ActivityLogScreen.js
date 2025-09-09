import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";

import screenNames from "../constants/screenNames";
import { useTasks } from "../context/TasksContext";
import { useThemeCtx } from "../context/ThemeContext";

const iconForType = (type) => {
  switch (type) {
    case "create":
      return "✨";
    case "update":
      return "✏️";
    case "delete":
      return "🗑️";
    case "complete":
      return "✅";
    case "reopen":
      return "↩️";
    default:
      return "ℹ️";
  }
};

const labelForActivity = (act, taskTitle) => {
  const title = taskTitle || (act.meta && act.meta.title) || "Unknown task";
  switch (act.type) {
    case "create":
      return `Created "${title}"`;
    case "update": {
      const patch = act.meta?.patch || act.payload?.patch;
      if (patch) {
        const keys = Object.keys(patch).join(", ");
        return `Updated "${title}" (${keys})`;
      }
      return `Updated "${title}"`;
    }
    case "delete":
      return `Deleted "${title}"`;
    case "complete":
      return `Marked "${title}" as complete`;
    case "reopen":
      return `Reopened "${title}"`;
    default:
      return `${act.type} "${title}"`;
  }
};

export default function ActivityLogScreen({ navigation }) {
  const { activityLog, tasks, outbox, processOutbox } = useTasks();
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useThemeCtx();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await processOutbox();
    } catch (e) {
      console.warn("processOutbox error", e);
      Alert.alert("Sync error", "Could not process outbox. Try again later.");
    } finally {
      setRefreshing(false);
    }
  }, [processOutbox]);

  const goToTask = (taskId) => {
    const found = tasks.find((t) => t.id === taskId);
    if (found) {
      navigation.navigate(screenNames.TaskFormScreen, { taskId });
    } else {
      Alert.alert("Task not found", "This task no longer exists locally.");
    }
  };

  const renderItem = ({ item }) => {
    const task = tasks.find((t) => t.id === item.taskId);
    const title = task?.title || item.meta?.title || "Unknown task";
    const message = labelForActivity(item, title);
    const time = new Date(item.timestamp).toLocaleString();

    return (
      <TouchableOpacity
        style={[
          styles.row,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
        onPress={() => (item.taskId ? goToTask(item.taskId) : null)}
      >
        <Text style={styles.icon}>{iconForType(item.type)}</Text>
        <View style={styles.content}>
          <Text style={[styles.message, { color: colors.text }]}>
            {message}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {time}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={
          colors.background === "#ffffff" ? "dark-content" : "light-content"
        }
      />
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>Activity Log</Text>
        <View style={styles.headerActions}>
          <Button
            title={`Process Outbox (${outbox?.length || 0})`}
            onPress={async () => {
              setRefreshing(true);
              try {
                await processOutbox();
                Alert.alert("Sync", "Outbox processed (or attempted).");
              } catch (e) {
                console.warn(e);
                Alert.alert("Error", "Failed to process outbox.");
              } finally {
                setRefreshing(false);
              }
            }}
          />
        </View>
      </View>

      {activityLog.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: colors.background }]}>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No Activity Yet
          </Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Your activity log will appear here as you create and update tasks.
          </Text>
        </View>
      ) : (
        <FlatList
          data={activityLog}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={refreshing}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    alignItems: "center",
    width: "94%",
    alignSelf: "center",
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    fontWeight: "600",
  },
  time: {
    marginTop: 4,
    fontSize: 12,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyText: {
    textAlign: "center",
  },
});
