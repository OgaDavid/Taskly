import { useEditTaskModalStore } from "@/hooks/use-edit-task-modal";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTasksStore } from "@/store/tasks-store";
import { Task } from "@/types";
import {
  CalendarDays,
  Circle,
  CircleCheckBig,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { TooltipWrapper } from "./tooltip-wrapper";
import { cn } from "@/lib/utils";

const TaskCard = ({ task }: { task: Task }) => {
  /**
   * Converts a date string to a formatted due date.
   * @param dateString - The date string to convert.
   * @returns The formatted due date.
   */
  const getDueDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { ...options, year: "numeric" });
  };

  const { completeTask, deleteTask } = useLocalStorage("Tasks");
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  const setTaskId = useEditTaskModalStore((state) => state.setTaskId);
  const onOpen = useEditTaskModalStore((state) => state.onOpen);
  const isOpen = useEditTaskModalStore((state) => state.isOpen);

  const openEditTaskModal = () => {
    setTaskId(task.id);
    if (!isOpen) {
      onOpen();
    }
  };

  const handleCompleteTask = (task: Task) => {
    completeTask(task);
    setTasks(
      tasks.map((t: Task) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );

    if (!task.isCompleted) toast.success("Task completed successfully.");
  };

  const handleDeleteTask = (task: Task) => {
    deleteTask(task);
    setTasks(tasks.filter((t: Task) => t.id !== task.id));
    toast.success("Task deleted successfully.");
  };

  return (
    <div className="border-2 flex flex-col justify-between gap-5 border-custom-accent bg-custom-primary py-4 px-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="relative flex h-3 w-3">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              !task.isCompleted ? "bg-yellow-400" : "bg-green-400"
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-3 w-3",
              !task.isCompleted ? "bg-yellow-500" : "bg-green-500"
            )}
          />
        </span>
        <TooltipWrapper
          text={
            task.isCompleted
              ? "Mark task as incomplete"
              : "Mark task as complete"
          }
        >
          <div
            className="cursor-pointer"
            onClick={() => handleCompleteTask(task)}
          >
            {!task.isCompleted ? (
              <Circle className="w-5 h-5 text-custom-neutral/50 hover:text-custom-neutral" />
            ) : (
              <CircleCheckBig className="w-5 h-5 text-custom-neutral" />
            )}
          </div>
        </TooltipWrapper>
      </div>
      <div>
        <div className="mb-3">
          <h2>{task.taskTitle}</h2>
        </div>
        <p className="inter-regular text-sm">
          {task.taskDescription.length > 100
            ? `${task.taskDescription.slice(0, 100)}...`
            : task.taskDescription}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="inter-regular text-custom-neutral/50 flex items-center text-xs">
          <CalendarDays className="w-4 h-4 mr-1" />
          {getDueDate(task.dueDate)}
        </p>
        <div className="flex items-center gap-5">
          <TooltipWrapper text="Edit Task">
            <Pencil
              onClick={openEditTaskModal}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
          <TooltipWrapper text="Delete Task">
            <Trash2
              onClick={() => handleDeleteTask(task)}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
