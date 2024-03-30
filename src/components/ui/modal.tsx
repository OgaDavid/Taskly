import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./drawer";

import useMediaQuery from "@/hooks/use-media-query";

// Interface for the props of the Modal component
interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  // Function to handle the change in modal/drawer open state
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Check if the device is desktop
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    // Render a dialog for desktop view
    return (
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  // Render a drawer for mobile view
  return (
    <Drawer open={isOpen} onOpenChange={onChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
