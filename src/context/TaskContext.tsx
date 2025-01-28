import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// type of items from each task
export interface Task {
  subject: string;
  description: string;
  maxTime: number;
  audioFile: File | null;
  createdAt: number;
  isPlaying: boolean;
  isCompleted: boolean;
  status: "complete" | "pending";
  timeRemaining: number;
  isExpired: boolean;
}

interface TaskContextType {
  tasks: Task[];
  editingTask: Task | null;
  selectedTask: Task | null;
  addOrEditTask: (task: Task) => void;
  cancelEdit: () => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  taskSelect: (taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: any }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
    console.log(tasks) // ok
  }, []);

  const saveToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addOrEditTask = (task: Task) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.createdAt === editingTask.createdAt ? { ...editingTask, ...task } : t
      );
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    } else {
      const newTask: Task = { 
        ...task,
        createdAt: Date.now(),
        status: "pending", 
        timeRemaining: task.maxTime,
        isExpired: false,
        isPlaying: false,
        isCompleted: false
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
    setEditingTask(null);
  };

  const cancelEdit = () => setEditingTask(null);

  const editTask = (task: Task) => setEditingTask(task);

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.createdAt !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const taskSelect = (taskId: number) => {
    setSelectedTask(tasks.find(task => task.createdAt === taskId) || null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        const elapsedMinutes = Math.floor((Date.now() - task.createdAt) / 60000);
        const remainingTime = task.maxTime - elapsedMinutes;
        const isExpired = remainingTime <= 0;
        return {
          ...task,
          timeRemaining: isExpired ? 0 : remainingTime,
          isExpired,
          status: isExpired ? "complete" : task.status,
        };
      });
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }, 60000); // every minute update

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editingTask,
        selectedTask,
        addOrEditTask,
        cancelEdit,
        editTask,
        deleteTask,
        taskSelect,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};