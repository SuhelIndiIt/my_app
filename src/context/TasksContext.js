import { KEYS, loadJSON, saveJSON } from "../utils/storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { compareAsc } from "date-fns";
import { now } from "moment";
import uuid from "react-native-uuid";

const TasksContext = createContext();

/**
 * TasksProvider is a context provider component that manages the state and actions for managing tasks.
 * It provides the following contexts:
 * - tasks: The list of tasks.
 * - setTasks: A function to set the list of tasks.
 * - activityLog: The list of activity logs.
 * - setActivityLog: A function to set the list of activity logs.
 * - outbox: The list of outgoing actions.
 * - setOutbox: A function to set the list of outgoing actions.
 * - hydrated: A boolean indicating if the context is hydrated from storage.
 * - setHydrated: A function to set the hydrated state.
 * - processingRef: A reference to track if the outbox is currently being processed.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {React.ReactElement} The rendered component.
 */
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const processingRef = useRef(false);

  // Load tasks, outbox and activity log from storage on mount
  useEffect(() => {
    (async () => {
      const [savedTasks, savedOutbox, savedActivity] = await Promise.all([
        loadJSON(KEYS.TASKS, []),
        loadJSON(KEYS.OUTBOX, []),
        loadJSON(KEYS.ACTIVITY, []),
      ]);
      setTasks(savedTasks);
      setOutbox(savedOutbox);
      setActivityLog(savedActivity);
      setHydrated(true);
    })();
  }, []);

  // Save tasks, outbox and activity log to storage on change
  useEffect(() => {
    console.log(tasks, "tasks useeffe");
    if (hydrated) saveJSON(KEYS.TASKS, tasks);
  }, [tasks, hydrated]);

  // Save outbox to storage on change
  useEffect(() => {
    if (hydrated) saveJSON(KEYS.OUTBOX, outbox);
  }, [outbox, hydrated]);

  // Save activity log to storage on change
  useEffect(() => {
    if (hydrated) saveJSON(KEYS.ACTIVITY, activityLog);
  }, [activityLog, hydrated]);

  // Process outbox on hydration
  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      await processOutbox();
    })();
  }, [hydrated]);

  // Helper function to append activity log
  const appendActivity = (type, taskId, meta = {}) => {
    const entry = {
      id: uuid.v4(),
      type,
      taskId,
      timestamp: new Date().toISOString(),
      meta,
    };
    setActivityLog((s) => [entry, ...s].slice(0, 500));
  };

  // Helper function to enqueue action
  const enqueueAction = (action) => {
    setOutbox((s) => [action, ...s]);
  };

  // Optimistic create task
  const createTask = (data) => {
    const id = uuid.v4();
    const now = new Date().toISOString();
    const task1 = {
      id,
      title: data.title,
      description: data.description || "",
      priority: data.priority || "Low",
      dueDate: data.dueDate || null,
      status: "open",
      tags: data.tags || [],
      createdAt: now,
      updatedAt: now,
    };

    setTasks((s) => [task1, ...s]);
    appendActivity("create", id, { title: task1.title });
    enqueueAction({
      id: uuid.v4(),
      type: "create",
      payload: task1,
      createdAt: now,
    });

    return task1;
  };

  // Optimistic update task
  const updateTask = (id, patch) => {
    const now = new Date().toISOString();
    setTasks((s) =>
      s.map((t) => (t.id === id ? { ...t, ...patch, updatedAt: now } : t))
    );
    appendActivity("update", id, { patch });
    enqueueAction({
      id: uuid.v4(),
      type: "update",
      payload: { id, patch, updatedAt: now },
      createdAt: now,
    });
  };

  // Optimistic delete task
  const deleteTask = (id) => {
    setTasks((s) => s.filter((t) => t.id !== id));
    appendActivity("delete", id, {});
    enqueueAction({
      id: uuid.v4(),
      type: "delete",
      payload: { id },
      createdAt: new Date().toISOString(),
    });
  };

  // Optimistic toggle task completion
  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus = task.status === "completed" ? "open" : "completed";
    const now = new Date().toISOString();
    setTasks((s) =>
      s.map((t) =>
        t.id === id ? { ...t, status: newStatus, updatedAt: now } : t
      )
    );
    appendActivity(newStatus === "completed" ? "complete" : "reopen", id, {});
    enqueueAction({
      id: uuid.v4(),
      type: "complete",
      payload: { id, status: newStatus, updatedAt: now },
      createdAt: now,
    });
  };

  // Replay action locally
  const replayAction = async (action) => {
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true };
  };

  // Process outbox sequentially
  const processOutbox = async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    try {
      const queue = [...outbox].reverse();
      const remaining = [];
      for (const action of queue) {
        try {
          const res = await replayAction(action);
          if (!res || !res.ok) {
            remaining.push(action);
          } else {
            // success: nothing to do (we already did optimistic local update)
          }
        } catch (e) {
          console.warn("replayAction error", e);
          remaining.push(action);
        }
      }
      setOutbox(remaining.reverse());
    } finally {
      processingRef.current = false;
    }
  };

  // List tasks grouped by due date
  const listGrouped = () => {
    const nowISO = new Date().toISOString();
    const today = [];
    const upcoming = [];
    const overdue = [];
    tasks.forEach((t) => {
      if (t.status === "completed") {
        return;
      }
      if (t.dueDate) {
        const due = new Date(t.dueDate);
        const dueDateOnly = due.toDateString();
        const nowDateOnly = new Date().toDateString();

        if (compareAsc(new Date(t.dueDate), new Date(nowISO)) < 0) {
          overdue.push(t);
        } else {
          const due = new Date(t.dueDate);
          const now = new Date();

          if (due.toDateString() === now.toDateString()) today.push(t);
          else upcoming.push(t);
        }
      } else {
        upcoming.push(t);
      }
    });
    return { today, upcoming, overdue };
  };

  // Search filter tasks
  const searchFilter = ({ q = "", priority = null, status = null }) => {
    const lower = q.trim().toLowerCase();
    return tasks.filter((t) => {
      if (
        q &&
        !(
          t.title.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower)
        )
      )
        return false;
      if (priority && t.priority !== priority) return false;
      if (status && t.status !== status) return false;
      return true;
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        toggleComplete,
        activityLog,
        outbox,
        processOutbox,
        listGrouped,
        searchFilter,
        hydrated,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// Custom hook to access tasks context
export const useTasks = () => useContext(TasksContext);
