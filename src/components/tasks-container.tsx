import { Task } from "@/types";

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      {tasks.map((task, i) => (
        <p key={i}>{task.taskTitle}</p>
      ))}
    </div>
  );
};

export default TasksContainer;
