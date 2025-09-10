import { Text, TouchableOpacity, View } from "react-native";

import PrimaryBtn from "./PrimaryBtn";
import React from "react";
import screenNames from "../constants/screenNames";
import { useNavigation } from "@react-navigation/native";

const RenderTask = ({ item, colors, toggleComplete, styles }) => {
  const navigation = useNavigation();
  return (
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
};

export default RenderTask;
