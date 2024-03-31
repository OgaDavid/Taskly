import { usePreviewTaskModalStore } from "@/hooks/use-preview-task-modal";
import { getDueDate } from "@/lib/utils";
import { useTasksStore } from "@/store/tasks-store";

const TaskPreview = () => {
  const taskId = usePreviewTaskModalStore((state) => state.taskId);
  const tasks = useTasksStore((state) => state.tasks);
  const task = tasks.find((task) => task.id === taskId);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2>Task Title</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {task?.taskTitle}
        </p>
      </div>
      <div>
        <h2>Task Description</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {task?.taskDescription}
        </p>
      </div>
      <div>
        <h2>Task is due on</h2>
        <p className="text-sm pt-1 inter-regular text-custom-neutral/60">
          {getDueDate(task?.dueDate as string)}
        </p>
      </div>
    </div>
  );
};

export default TaskPreview;
