/**
 * Returns a label for the given activity.
 *
 * @param {Object} act - The activity object.
 * @param {string} [taskTitle] - The title of the task associated with the activity (optional).
 * @returns {string} The label for the activity.
 */

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

export default labelForActivity;
