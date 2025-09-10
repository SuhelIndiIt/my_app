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
