import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { KEYS, remove } from "../utils/storage";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryBtn from "../components/PrimaryBtn";
import pkg from "../../package.json";
import { useAuthCtx } from "../context/AuthContext";
import { useThemeCtx } from "../context/ThemeContext";

const APP_NAME = "Field Tasks";
const APP_VERSION = pkg?.version || "0.0.0";

export default function SettingsScreen() {
  const { signOut, userEmail } = useAuthCtx();
  const { mode, colors, toggleTheme } = useThemeCtx();
  const [clearing, setClearing] = useState(false);
  const styles = createStyles(colors);

  const handleSignOut = async () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (e) {
            console.warn("SignOut error", e);
            Alert.alert("Error", "Could not sign out. Try again.");
          }
        },
      },
    ]);
  };

  const handleClearLocalData = () => {
    Alert.alert(
      "Clear all local data",
      "This will remove all locally stored tasks, activity log, outbox, session and settings. This cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear data",
          style: "destructive",
          onPress: async () => {
            setClearing(true);
            try {
              const keysToRemove = [
                KEYS.TASKS,
                KEYS.OUTBOX,
                KEYS.ACTIVITY,
                KEYS.SESSION,
                KEYS.THEME,
              ];
              await Promise.all(keysToRemove.map((k) => remove(k)));

              await signOut();

              Alert.alert(
                "Done",
                "Local data cleared. You have been signed out."
              );
            } catch (e) {
              console.warn("clear local data error", e);
              Alert.alert("Error", "Failed to clear local data. See console.");
            } finally {
              setClearing(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={mode === "dark"}
              onValueChange={() => toggleTheme()}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={mode === "dark" ? colors.primary : colors.border}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutRow}>{APP_NAME}</Text>
          <Text style={styles.aboutRow}>Version: {APP_VERSION}</Text>
          <Text style={styles.aboutSmall}>Built by: My Todos App.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.devNote}>
              Danger zone — for development and troubleshooting.
            </Text>

            <View style={{ marginTop: 8 }}>
              <PrimaryBtn
                label={clearing ? "Clearing..." : "Clear data"}
                onPress={handleClearLocalData}
                style={{
                  backgroundColor: colors.danger,
                  width: "100%",
                  paddingVertical: 10,
                  borderRadius: 40,
                  marginBottom: 0,
                }}
                textStyle={{ color: "#fff", fontSize: 12 }}
                disabled={clearing}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 24, paddingHorizontal: 8 }}>
          <Text style={styles.footer}>
            If you want a more conservative "clear only activity" or a
            backup/export feature, I can add that next.
          </Text>
        </View>
      </View>

      <View style={[styles.rowActions, { backgroundColor: colors.background }]}>
        <PrimaryBtn
          label="Sign out"
          onPress={handleSignOut}
          style={{ backgroundColor: colors.danger }}
          textStyle={{ color: "#fff" }}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 16,
      color: colors.text,
    },

    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2.22,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 16,
      color: colors.text,
    },

    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    settingValue: {
      fontSize: 16,
      color: colors.textSecondary,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    rowLabel: {
      fontSize: 15,
      color: colors.text,
    },
    rowValue: {
      fontSize: 15,
      color: colors.textSecondary,
      marginTop: 4,
    },
    rowActions: {
      marginTop: 8,
    },
    aboutRow: {
      fontSize: 15,
      color: colors.text,
    },
    aboutSmall: {
      color: colors.textSecondary,
      marginTop: 6,
    },
    devNote: {
      color: colors.danger,
      fontWeight: "600",
      width: "70%",
    },
    footer: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: "center",
    },
  });
