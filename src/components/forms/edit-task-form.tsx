import { z } from "zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Task } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useTasksStore } from "@/store/tasks-store";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEditTaskModalStore } from "@/hooks/use-edit-task-modal";

const formSchema = z.object({
  taskTitle: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  taskDescription: z
    .string()
    .min(2, {
      message: "Task description must be at least 2 characters.",
    })
    .max(150, {
      message: "Task Description is too long.",
    }),
  dueDate: z.date({
    required_error: "Select a due date for your task.",
  }),
});

export function EditTaskForm() {
  const taskId = useEditTaskModalStore((state) => state.taskId);
  const { setTasks, getTasks } = useLocalStorage("Tasks");

  const allTasks = getTasks() || [];
  const task = allTasks.find((task: Task) => task.id === taskId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: task?.taskTitle || "",
      taskDescription: task?.taskDescription || "",
      dueDate: task?.dueDate || null,
    },
  });

  const setTasksStore = useTasksStore((state) => state.setTasks); // Function to set tasks to store
  const onClose = useEditTaskModalStore((state) => state.onClose); // Function to close the modal

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Find the index of the task to edit
      const taskIndex = allTasks.findIndex((task: Task) => task.id === taskId);
      // Update the task with the new values
      allTasks[taskIndex] = {
        ...allTasks[taskIndex],
        ...values,
      };
      // Set the updated tasks to local storage
      setTasks(allTasks);
      // Set the updated tasks to the store
      setTasksStore(allTasks);
    } catch (error) {
      console.log("EDIT_TASK_ERROR", error);
    } finally {
      // close modal
      onClose();
      toast("Task edited successfully🎉");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="taskTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Task Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left inter-regular font-normal",
                        !field.value && "text-custom-neutral/35"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-custom-secondary rounded-lg border-2 border-custom-accent"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" variant="ghost" type="submit">
          Edit Task
        </Button>
      </form>
    </Form>
  );
}
