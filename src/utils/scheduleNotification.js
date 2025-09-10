import { Platform } from "react-native";
import notifee from "@notifee/react-native";

/**
 * Requests notification permission on iOS.
 * On Android, does nothing.
 * const requestNotificationPermission = async () => {
  if (Platform.OS === "ios") {
    let resp = await notifee.requestPermission();
    // console.log(resp, "resp");
  }
};
 */

/**
 * Schedules a notification for a task.
 * The notification will be scheduled to trigger at the task's due date.
 * If the task does not have a due date, no notification will be scheduled.
 *
 * @param {Object} task - The task object containing the task details.
 * @param {string} task.title - The title of the task.
 * @param {string} [task.description] - The description of the task.
 * @param {string} task.dueDate - The due date of the task, in ISO 8601 format.
 * @returns {Promise<void>} A promise that resolves when the notification is scheduled.
 */

const requestNotificationPermission = async () => {
  if (Platform.OS === "ios") {
    let resp = await notifee.requestPermission();
    console.log(resp, "resp");
  }
};

const scheduleNotification = async (task) => {
  try {
    await requestNotificationPermission();

    if (task.dueDate) {
      const channelId = await notifee.createChannel({
        id: "task-reminder",
        name: "Task Reminders",
      });

      // Schedule notification for due date
      await notifee.createTriggerNotification(
        {
          title: task.title,
          body: task.description || "Task due now!",
          android: {
            channelId,
            pressAction: {
              id: "default",
            },
          },
          ios: {
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },
          },
        },
        {
          timestamp: new Date(task.dueDate).getTime(),
          type: 0, // timestamp trigger
        }
      );
    }
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};

export default scheduleNotification;
