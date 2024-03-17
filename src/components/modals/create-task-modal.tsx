import { Modal } from "@/components/ui/modal";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";

const CreateTaskModal = () => {
  const createTaskModalStore = useCreateTaskModalStore();
  return (
    <Modal
      title="New Task 🎉"
      description="Create a new task."
      isOpen={createTaskModalStore.isOpen}
      onClose={createTaskModalStore.onClose}
    >
      Create task
    </Modal>
  );
};

export default CreateTaskModal;
