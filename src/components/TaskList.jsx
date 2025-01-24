import { useState } from "react";

const TaskList = ({
  tasks,
  editTask,
  deleteTask,
  selectedTask,
  onTaskSelect,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [playingTask, setPlayingTask] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0); // موقعیت فعلی صدا

  const handlePlayPauseAudio = (task) => {
    if (task.remainingTime === 0) {
      alert("You cannot play audio for an expired task!");
      return;
    }

    if (playingTask === task.createdAt) {
      // اگر در حال پخش است، صدا را متوقف کرده و موقعیت ذخیره می‌کنیم
      audio.pause();
      setAudioCurrentTime(audio.currentTime);
      setPlayingTask(null);
    } else {
      if (audio) audio.pause(); // توقف صدای قبلی
      const audioURL = URL.createObjectURL(task.audioFile);
      const newAudio = new Audio(audioURL);
      newAudio.currentTime = audioCurrentTime; // شروع از موقعیت ذخیره‌شده
      setAudio(newAudio);
      setPlayingTask(task.createdAt);
      newAudio.play();
      newAudio.onended = () => {
        setPlayingTask(null);
        setAudioCurrentTime(0); // بازنشانی موقعیت پس از پایان
      };
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

  const handleStatusChange = (task) => {
    task.isCompleted = !task.isCompleted;
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "expired") return task.remainingTime === 0;
    if (activeTab === "active") return task.remainingTime > 0;
    return true;
  });

  // رفع مشکل undefined برای remainingTime
  tasks.forEach((task) => {
    if (typeof task.remainingTime === "undefined") {
      task.remainingTime = task.maxTime; // مقداردهی اولیه به زمان باقی‌مانده
    }
  });

  return (
    <div className="p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setActiveTab("expired")}
          className={`px-4 py-2 rounded ${
            activeTab === "expired" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Expired Tasks
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${
            activeTab === "active" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Active Tasks
        </button>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks available in this category.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => {
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
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(task);
                        }}
                        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        disabled={isExpired} // غیر فعال کردن برای تسک‌های منقضی شده
                      />
                      <label
                        className="ml-2 text-sm text-gray-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {task.isCompleted ? "Completed" : "Pending"}
                      </label>
                    </div>
                    {task.audioFile ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPauseAudio(task);
                        }}
                        className={`text-blue-500 hover:text-blue-700 mt-2 ${
                          isExpired ? "cursor-not-allowed text-gray-400" : ""
                        }`}
                        disabled={isExpired} // غیر فعال کردن برای تسک‌های منقضی شده
                      >
                        {playingTask === task.createdAt ? "⏸ Pause" : "▶️ Play"}
                      </button>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">
                        No Audio File
                      </p>
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
                      disabled={isExpired} // غیر فعال کردن برای تسک‌های منقضی شده
                    >
                      ✏️ Edit
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
