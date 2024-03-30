import { useEffect } from "react";

import SiteHeader from "@/components/site-header";
import CreateTaskHeader from "@/components/create-task-header";
import TasksContainer from "@/components/tasks-container";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useTasksStore } from "@/store/tasks-store";

import { ToastProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";

function App() {
  const tasks = useTasksStore((state) => state.tasks); // Retrieve tasks from store
  const setTasks = useTasksStore((state) => state.setTasks); // Function to set tasks to store

  // Retrieve tasks from local storage
  const { getTasks } = useLocalStorage("Tasks");

  useEffect(() => {
    const allTasks = getTasks() || [];
    setTasks(allTasks); // Set tasks to store // Add retrieved tasks to Tasks state
  }, []);

  return (
    <div>
      <SiteHeader />
      <div className="container pt-10">
        <CreateTaskHeader />
        <TasksContainer tasks={tasks} />
      </div>
      <ModalProvider />
      <ToastProvider />
    </div>
  );
}

export default App;
