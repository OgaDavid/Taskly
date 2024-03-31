import { create } from "zustand";

// This file contains a custom hook for managing the state of a preview task modal.

// Interface defining the shape of the preview task modal store
interface PreviewTaskModalStore {
  taskId: string; // The ID of the task to preview
  setTaskId: (taskId: string) => void; // Function to set the task ID
  isOpen: boolean; // Indicates whether the modal is open or not
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

// Custom hook that previews and initializes the preview task modal store
export const usePreviewTaskModalStore = create<PreviewTaskModalStore>(
  (set) => ({
    taskId: "", // Initial state: empty task ID
    setTaskId: (taskId: string) => set({ taskId }), // Function to set the task ID
    isOpen: false, // Initial state: modal is closed
    onOpen: () => set({ isOpen: true }), // Function to open the modal by setting isOpen to true
    onClose: () => set({ isOpen: false }), // Function to close the modal by setting isOpen to false
  })
);
