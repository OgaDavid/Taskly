import { useEffect } from "react";
import SiteHeader from "@/components/site-header";
import { ModalProvider } from "@/providers/modal-provider";
import CreateTaskHeader from "@/components/create-task-header";
import TasksContainer from "@/components/tasks-container";
import { useLocalStorage } from "./hooks/use-local-storage";
import { useTasksStore } from "@/store/tasks-store";

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
    </div>
  );
}

export default App;
