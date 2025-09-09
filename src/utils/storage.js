import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  SESSION: "session_v1",
  TASKS: "task_v1",
  THEME: "theme_v1",
  OUTBOX: "outbox_v1",
  ACTIVITY: "activity_v1",
};

export async function loadJSON(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.log(error, "loadJSON");
    return fallback;
  }
}

export async function saveJSON(key, value) {
  let valueToSave = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, valueToSave);
    console.log("saved", key);
  } catch (error) {
    console.log(error, "saveJSON");
  }
}

export async function removeJSON(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error, "removeJSON");
  }
}
