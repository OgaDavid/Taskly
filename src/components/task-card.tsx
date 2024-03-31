import { useEditTaskModalStore } from "@/hooks/use-edit-task-modal";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTasksStore } from "@/store/tasks-store";
import { Task } from "@/types";
import {
  CalendarDays,
  Circle,
  CircleCheckBig,
  Expand,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { TooltipWrapper } from "./tooltip-wrapper";
import { cn } from "@/lib/utils";
import { usePreviewTaskModalStore } from "@/hooks/use-preview-task-modal";
import { getDueDate } from "@/lib/utils";

const TaskCard = ({ task }: { task: Task }) => {
  const { completeTask, deleteTask } = useLocalStorage("Tasks");
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  const setEditTaskId = useEditTaskModalStore((state) => state.setTaskId);
  const onOpenEditTaskModal = useEditTaskModalStore((state) => state.onOpen);
  const isEditTaskModalOpen = useEditTaskModalStore((state) => state.isOpen);

  const setPreviewTaskId = usePreviewTaskModalStore((state) => state.setTaskId);
  const onOpenPreviewTaskModal = usePreviewTaskModalStore(
    (state) => state.onOpen
  );
  const isPreviewTaskModalOpen = usePreviewTaskModalStore(
    (state) => state.isOpen
  );

  const openEditTaskModal = () => {
    setEditTaskId(task.id);
    if (!isEditTaskModalOpen) {
      onOpenEditTaskModal();
    }
  };

  const openPreviewTaskModal = () => {
    setPreviewTaskId(task.id);
    if (!isPreviewTaskModalOpen) {
      onOpenPreviewTaskModal();
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
    toast("Task deleted successfully.", {
      icon: <Trash2 className="w-4 h-4 text-custom-neutral" />,
    });
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
          <TooltipWrapper text="Preview Task">
            <Expand
              onClick={openPreviewTaskModal}
              className="w-4 h-4 text-custom-neutral/50 hover:text-custom-neutral cursor-pointer"
            />
          </TooltipWrapper>
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
