import { Task } from "@/types";

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

  return (
    <div className="border-2 border-custom-accent bg-custom-primary py-8 px-4 rounded-lg">
      <h2 className="">{task.taskTitle}</h2>
      <p className="inter-regular">{task.taskDescription}</p>
      <p className="inter-regular">{getDueDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskCard;
