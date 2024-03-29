import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  task: z.string().min(2, {
    message: "Task title must be at least 2 characters.",
  }),
  description: z
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
      task: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // shadcn date picker returns day before dueDate selected.
    // Fix this issue by adding one day to the dueDate.

    const dueDate = new Date(values.dueDate);
    dueDate.setDate(dueDate.getDate() + 1);
    values.dueDate = dueDate;

    // Store the form data in local storage
    localStorage.setItem("formData", JSON.stringify(values));

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="task"
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
          name="description"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
