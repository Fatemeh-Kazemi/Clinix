import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [audio, setAudio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, deadline, audio });
    setTitle('');
    setDescription('');
    setDeadline('');
    setAudio(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
    </form>
  );
};

const TaskList = ({ tasks, selectTask, deleteTask }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <li key={index} className={`border p-2 ${task.selected ? 'bg-yellow-200' : ''}`}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Deadline: {task.deadline}</p>
          <button onClick={() => selectTask(index)} className="bg-green-500 text-white p-1">Select</button>
          <button onClick={() => deleteTask(index)} className="bg-red-500 text-white p-1">Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, selected: false }]);
  };

  const selectTask = (index) => {
    const updatedTasks = tasks.map((task, i) => ({
      ...task,
      selected: i === index ? !task.selected : false,
    }));
    setTasks(updatedTasks);
    setSelectedTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} selectTask={selectTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
