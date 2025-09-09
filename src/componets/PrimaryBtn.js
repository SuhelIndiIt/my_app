import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { useThemeCtx } from "../context/ThemeContext";

const PrimaryBtn = ({ onPress, label, style, textStyle }) => {
  const { colors } = useThemeCtx();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.primary }, style]}
    >
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
