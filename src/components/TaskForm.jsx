import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-zinc-800 max-w-sm p-4"
      >
        <label htmlFor="title" className="block text-sm font-bold mb-2">
          Task:
        </label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        />
        <label htmlFor="description" className="block text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ></textarea>

        <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
