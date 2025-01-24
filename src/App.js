import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // تسک انتخاب‌شده

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        const elapsedMinutes = Math.floor(
          (Date.now() - task.createdAt) / 60000
        );
        const remainingTime = task.maxTime - elapsedMinutes;
        return {
          ...task,
          remainingTime: remainingTime > 0 ? remainingTime : 0,
        };
      });
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const saveToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddOrEditTask = (task) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.createdAt === editingTask.createdAt ? { ...editingTask, ...task } : t
      );
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = {
        ...task,
        createdAt: Date.now(),
        isPlaying: false,
        isCompleted: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    }
  };

  const handleEditTask = (task) => {
    if (task.remainingTime === 0) {
      alert("You cannot edit an expired task!");
      return;
    }
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.createdAt !== taskId);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTask(taskId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <TaskForm
          addOrEditTask={handleAddOrEditTask}
          editingTask={editingTask}
          cancelEdit={() => {
            setEditingTask(null);
          }}
        />
        <TaskList
          tasks={tasks}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask}
          selectedTask={selectedTask}
          onTaskSelect={handleTaskSelect}
        />
      </div>
    </div>
  );
};

export default App;
