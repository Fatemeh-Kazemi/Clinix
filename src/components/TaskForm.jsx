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
    setAudioFile(null);
  };

  return (
    <form className="p-4 border rounded shadow-md bg-white" onSubmit={handleSubmit}>
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
        <label className="block text-sm font-medium mb-2">Max Time (in minutes)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={maxTime}
          onChange={(e) => setMaxTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Attach Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className={`${
            editingTask ? "bg-yellow-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded hover:${
            editingTask ? "bg-yellow-600" : "bg-blue-600"
          }`}
        >
          {editingTask ? "Edit Task" : "Add Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;