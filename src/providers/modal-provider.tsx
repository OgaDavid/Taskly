import CreateTaskModal from "@/components/modals/create-task-modal";
import EditTaskModal from "@/components/modals/edit-task-modal";
import PreviewTaskModal from "@/components/modals/preview-task-modal";
import { useState, useEffect } from "react";

/**
 * ModalProvider renders a CreateTaskModal component from "@/components/modals/create-task-modal".
 * It manages the mounting state of the component using the useState and useEffect hooks from React.
 * The CreateTaskModal component is rendered only when the component is mounted.
 */

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateTaskModal />
      <EditTaskModal />
      <PreviewTaskModal />
    </>
  );
};
