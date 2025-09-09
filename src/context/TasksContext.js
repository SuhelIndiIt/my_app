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

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const processingRef = useRef(false);

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

  useEffect(() => {
    console.log(tasks, "tasks useeffe");
    if (hydrated) saveJSON(KEYS.TASKS, tasks);
  }, [tasks, hydrated]);

  useEffect(() => {
    if (hydrated) saveJSON(KEYS.OUTBOX, outbox);
  }, [outbox, hydrated]);

  useEffect(() => {
    if (hydrated) saveJSON(KEYS.ACTIVITY, activityLog);
  }, [activityLog, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      await processOutbox();
    })();
  }, [hydrated]);

  // Helpers
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

  const enqueueAction = (action) => {
    setOutbox((s) => [action, ...s]);
  };

  // optimistic create
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

export const useTasks = () => useContext(TasksContext);
