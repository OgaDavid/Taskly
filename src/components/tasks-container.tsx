import { Task } from "@/types";
import TaskCard from "./task-card";
import { Button } from "./ui/button";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";

const TasksContainer = ({ tasks }: { tasks: Task[] }) => {
  const onOpen = useCreateTaskModalStore((state) => state.onOpen);
  const isOpen = useCreateTaskModalStore((state) => state.isOpen);

  const openCreateTaskModal = () => {
    if (!isOpen) {
      onOpen();
    }
  };
  if (tasks.length < 1) {
    return (
      <div className="text-center flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-lg md:text-3xl">You don't have any tasks.🙌</h3>
          <Button onClick={openCreateTaskModal}>Create a new Task</Button>
        </div>
        <img
          className="invert w-28"
          src="/images/clipboard.png"
          alt="clipboard"
        />
      </div>
    );
  }

  return (
    <div className="grid max-[475px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksContainer;
