import { Task } from "../../context/TaskContext";

interface TaskListProps {
  tasks: Task[];
  editTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  selectedTask: number | null;
  onTaskSelect: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks=[],
  editTask,
  deleteTask,
  selectedTask,
  onTaskSelect,
}) => {
  console.log(localStorage.getItem("tasks")); // ok
  console.log(tasks); // undefined

 

  return (
    <div className="task-list">
      {tasks.length == 0 ? (
        <p>No tasks available</p> // اگر هیچ تسکی وجود نداشت
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.createdAt}
              className={`task ${
                selectedTask === task.createdAt ? "selected" : ""
              } flex flex-col gap-2 bg-white p-4 border rounded shadow-md`}
              onClick={() => onTaskSelect(task.createdAt)}
            >
              <h3>Subject: {task.subject}</h3>
              <p>Description: {task.description}</p>
              <p>Time Remaining: {task.timeRemaining} minutes</p>
              <p>Status: {task.isExpired ? "Expired" : "Active"}</p>
              {/* <p>Status: {task.status}</p> */}
              <div className="flex justify-start gap-3">
                <button
                  className="bg-yellow-500 px-2 py-1 text-white rounded-sm"
                  onClick={() => editTask(task)}
                >
                  {" "}
                  ✏️ Edit
                </button>
                <button
                  className="bg-red-700 px-2 py-1 text-white rounded-sm"
                  onClick={() => deleteTask(task.createdAt)}
                >
                  {" "}
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
