import { useState } from "react";

const TaskList = ({
  tasks,
  editTask,
  deleteTask,
  selectedTask,
  onTaskSelect,
}) => {
  const [playingTask, setPlayingTask] = useState(null);
  const [audio, setAudio] = useState(null);

  const handlePlayPauseAudio = (task) => {
    if (task.remainingTime === 0) {
      alert("You cannot play audio for an expired task!");
      return;
    }

    if (playingTask === task.createdAt) {
      audio.pause();
      setPlayingTask(null);
    } else {
      if (audio) audio.pause(); // توقف فایل صوتی قبلی
      const audioURL = URL.createObjectURL(task.audioFile);
      const newAudio = new Audio(audioURL);
      setAudio(newAudio);
      setPlayingTask(task.createdAt);
      newAudio.play();
      newAudio.onended = () => setPlayingTask(null); // پایان پخش
    }
  };

  const handleEditClick = (task) => {
    if (task.remainingTime === 0) {
      alert("You cannot edit an expired task!");
      return;
    }
    editTask(task);
  };

  const handleTaskClick = (task) => {
    onTaskSelect(task.createdAt);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a task to get started!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const isSelected = selectedTask === task.createdAt;
            const isExpired = task.remainingTime === 0;

            return (
              <li
                key={task.createdAt}
                onClick={() => handleTaskClick(task)}
                className={`p-4 border rounded cursor-pointer ${
                  isSelected
                    ? "bg-blue-100"
                    : isExpired
                    ? "bg-red-100"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{task.subject}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-600">
                      Max Time: {task.maxTime} minutes
                    </p>
                    <p
                      className={`text-sm ${
                        isExpired ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {isExpired
                        ? "Expired"
                        : `Time Remaining: ${task.remainingTime} minutes`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {task.isCompleted ? "Completed" : "Pending"}
                    </p>
                    {task.audioFile ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPauseAudio(task);
                        }}
                        className={`text-blue-500 hover:text-blue-700 mt-2 ${
                          isExpired ? "cursor-not-allowed text-gray-400" : ""
                        }`}
                        disabled={isExpired}
                      >
                        {playingTask === task.createdAt ? "⏸ Pause" : "▶ Play"}
                      </button>
                    ) : (
                      <p className="text-sm text-gray-500">No Audio File</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(task);
                      }}
                      className={`text-yellow-500 hover:text-yellow-700 ${
                        isExpired ? "cursor-not-allowed text-gray-400" : ""
                      }`}
                      disabled={isExpired}
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.createdAt);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
