import { z } from "zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn, generateTaskId } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";
import { useTasksStore } from "@/store/tasks-store";
import { toast } from "sonner";

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

export function CreateNewTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
    },
  });

  const { setTasks, getTasks } = useLocalStorage("Tasks");

  const setTasksStore = useTasksStore((state) => state.setTasks); // Function to set tasks to store
  const onClose = useCreateTaskModalStore((state) => state.onClose); // Function to close the modal

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get all tasks from local storage
      const allTasks = getTasks() || [];

      // Generate a unique task ID
      const taskId = generateTaskId();

      // Adjust the due date to fix the issue with the date picker returning the day before the selected due date
      // const dueDate = new Date(values.dueDate);
      // dueDate.setDate(dueDate.getDate() + 1);
      // values.dueDate = dueDate;

      // Create a new task object
      const newTask = {
        id: taskId,
        ...values,
        isCompleted: false,
      };

      // Append the new task to the existing tasks or create a new array with the new task
      const updatedTasks = [...allTasks, newTask];

      // Store the updated tasks in local storage and tasks store
      setTasksStore(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.log("CREATE_TASK_ERROR", error);
    } finally {
      // close modal
      onClose();
      toast("Task created successfully🎉");
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
          Create Task
        </Button>
      </form>
    </Form>
  );
}
