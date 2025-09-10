import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
  SESSION: "session_v1",
  TASKS: "task_v1",
  THEME: "theme_v1",
  OUTBOX: "outbox_v1",
  ACTIVITY: "activity_v1",
};

/**
 * loadJSON - loads a JSON object from AsyncStorage under the given key,
 *            or returns the fallback value if the object does not exist
 *
 * @param {string} key - the key to load the JSON object from
 * @param {Object} fallback - the value to return if the object does not exist
 * @return {Promise} - a promise that resolves with the loaded JSON object,
 *                     or rejects with an error if the load fails
 */

export async function loadJSON(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.log(error, "loadJSON");
    return fallback;
  }
}

/**
 * saveJSON - saves a JSON object to AsyncStorage under the given key
 *
 * @param {string} key - the key to store the JSON object under
 * @param {Object} value - the JSON object to store
 * @return {Promise} - a promise that resolves when the object has been saved,
 *                     or rejects with an error if the save fails
 */

export async function saveJSON(key, value) {
  let valueToSave = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, valueToSave);
    console.log("saved", key);
  } catch (error) {
    console.log(error, "saveJSON");
  }
}

/**
 * removeJSON - removes a JSON object from AsyncStorage under the given key
 *
 * @param {string} key - the key of the JSON object to remove
 * @return {Promise} - a promise that resolves when the object has been removed,
 *                     or rejects with an error if the remove fails
 */

export async function removeJSON(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error, "removeJSON");
  }
}
