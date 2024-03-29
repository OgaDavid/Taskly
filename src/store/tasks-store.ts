/**
 * Represents a store for managing tasks.
 * This store provides a way to store and update tasks.
 */
import { Task } from "@/types";
import { create } from "zustand";

// Props for the RatesStore.
interface TasksStoreProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void; // Function to set the tasks to a new value.
}

// Create and initializes the TasksStore.
export const useTasksStore = create<TasksStoreProps>((set) => ({
  tasks: [],
  setTasks: (newTasks) => set(() => ({ tasks: newTasks })),
}));
