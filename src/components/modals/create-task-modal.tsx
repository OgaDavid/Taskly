import { Modal } from "@/components/ui/modal";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";
import { CreateNewTaskForm } from "../forms/create-new-task-form";
const CreateTaskModal = () => {
  const createTaskModalStore = useCreateTaskModalStore();
  return (
    <Modal
      title="New Task 🎉"
      description="Create a new task."
      isOpen={createTaskModalStore.isOpen}
      onClose={createTaskModalStore.onClose}
    >
      <CreateNewTaskForm />
    </Modal>
  );
};

export default CreateTaskModal;
