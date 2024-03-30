import { getToday } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { useCreateTaskModalStore } from "@/hooks/use-create-task-modal";
import useMediaQuery from "@/hooks/use-media-query";

const CreateTaskHeader = () => {
  const onOpen = useCreateTaskModalStore((state) => state.onOpen);
  const isOpen = useCreateTaskModalStore((state) => state.isOpen);

  const openCreateTaskModal = () => {
    if (!isOpen) {
      onOpen();
    }
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex items-center pb-4 border-custom-accent border-b-2 justify-between">
      <div>
        <h1 className="text-lg md:text-3xl pb-1">My Tasks 🚀</h1>
        <p className="text-custom-neutral/50 flex items-center inter-regular font-medium text-xs md:text-sm">
          <CalendarDays className="w-4 h-4 mr-2" />
          {getToday()}
        </p>
      </div>
      <Button onClick={openCreateTaskModal}>
        {isDesktop ? "Create New Task" : "Add Task"}
        <Plus className="w-4 font h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CreateTaskHeader;
