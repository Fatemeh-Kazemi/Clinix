import { useState, useEffect } from "react";

const TaskForm = ({ addOrEditTask, editingTask, cancelEdit }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setSubject(editingTask.subject);
      setDescription(editingTask.description);
      setMaxTime(editingTask.maxTime);
      setAudioFile(editingTask.audioFile || null);
    } else {
      setSubject("");
      setDescription("");
      setMaxTime("");
      setAudioFile(null);
    }
  }, [editingTask]);

  const handleCancelEdit = () => {
    setSubject("");
    setDescription("");
    setMaxTime("");
    setAudioFile(null);
    cancelEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !maxTime) return alert("Please fill all required fields!");
    const task = { subject, description, maxTime, audioFile };
    addOrEditTask(task);
    setSubject("");
    setDescription("");
    setMaxTime("");
    setAudioFile(null); // Clear audio file after submission
  };

  return (
    <form
      className="p-4 border rounded shadow-md bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Max Time (in minutes)
        </label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Attach Audio File
        </label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className={`relative inline-flex items-center justify-center font-semibold px-4 py-2  text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg group hover:bg-gradient-to-r hover:from-purple-700 to-blue-700`}
        >
          <span className="absolute inset-0 transition-transform duration-300 rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 group-hover:scale-100 group-hover:opacity-90"></span>
          <span className="relative z-10">
            {editingTask ? "Edit Task" : "Add Task"}
          </span>
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className=" inset-0 transition-transform duration-300 scale-95 rounded-lg bg-gradient-to-r from-gray-700 to-orange-400 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
