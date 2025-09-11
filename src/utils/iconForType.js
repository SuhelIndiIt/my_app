/**
 * Returns an emoji icon for the given activity type.
 * @param {string} type - The activity type.
 * @returns {string} The emoji icon for the activity type.
 */

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

export default iconForType;
