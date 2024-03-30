import { Modal } from "@/components/ui/modal";
import { useEditTaskModalStore } from "@/hooks/use-edit-task-modal";
import { EditTaskForm } from "@/components/forms/edit-task-form";

const EditTaskModal = () => {
  const editTaskModalStore = useEditTaskModalStore();
  return (
    <Modal
      title="Edit Task 📝"
      description="Edit current task."
      isOpen={editTaskModalStore.isOpen}
      onClose={editTaskModalStore.onClose}
    >
      <EditTaskForm />
    </Modal>
  );
};

export default EditTaskModal;
