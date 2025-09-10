import { FlatList, Text, View } from "react-native";

import React from "react";

const TaskSection = ({ title, data, renderItem, colors }) => {
  return (
    <View style={{ marginVertical: 8, flex: 1, marginHorizontal: 20 }}>
      {data?.length === 0 ? (
        <Text
          style={{
            color: colors.textSecondary,
            marginLeft: 8,
            textTransform: "capitalize",
            textAlign: "center",
            fontSize: 13,
          }}
        >
          No tasks for {title}
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
};

export default TaskSection;
