import { Modal } from "@/components/ui/modal";
import { usePreviewTaskModalStore } from "@/hooks/use-preview-task-modal";
import TaskPreview from "@/components/task-preview";

const PreviewTaskModal = () => {
  const previewTaskModalStore = usePreviewTaskModalStore();
  return (
    <Modal
      title="Preview Task 📝"
      description=""
      isOpen={previewTaskModalStore.isOpen}
      onClose={previewTaskModalStore.onClose}
    >
      <div className="mt-4">
        <TaskPreview />
      </div>
    </Modal>
  );
};

export default PreviewTaskModal;
