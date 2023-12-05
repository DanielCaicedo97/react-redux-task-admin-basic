import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";

import { Link } from "react-router-dom";
const TaskList = () => {
  const stateTasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="w-4/6 ">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">Tasks {stateTasks.length}</h1>
        <Link
          to="/create-task"
          className="bg-indigo-800 py-2 px-4 rounded-md text-sm hover:bg-indigo-900  font-bold"
        >
          Create Task
        </Link>
      </header>

      <ul className="grid grid-cols-3 gap-4">
        {stateTasks.map((task) => (
          <li key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3 className="text-xl font-bold">{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className=" bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded-md"
                >
                  Edit
                </Link>
                <button
                  className=" bg-red-500 hover:bg-red-700 font-bold py-1 px-2 rounded-md"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
