import { Task } from "@/types";
import TaskCard from "./task-card";

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className="grid max-[475px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksContainer;
