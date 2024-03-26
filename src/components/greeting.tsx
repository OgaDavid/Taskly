import { getToday } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";

const Greeting = () => {
  const onOpen = useCreateTaskModalStore((state) => state.onOpen);
  const isOpen = useCreateTaskModalStore((state) => state.isOpen);

  const openCreateTaskModal = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl pb-1">My Tasks 🚀</h1>
        <p className="text-custom-neutral/50 flex items-center inter-regular font-medium text-sm">
          <CalendarDays className="w-4 h-4 mr-2" />
          {getToday()}
        </p>
      </div>
      <Button onClick={openCreateTaskModal}>
        Create new task
        <Plus className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default Greeting;
