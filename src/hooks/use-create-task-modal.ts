import { create } from "zustand";

// This file contains a custom hook for managing the state of a create task modal.

// Interface defining the shape of the create task modal store
interface CreateTaskModalStore {
  isOpen: boolean; // Indicates whether the modal is open or not
  onOpen: () => void; // Function to open the modal
  onClose: () => void; // Function to close the modal
}

// Custom hook that creates and initializes the create task modal store
export const useCreateTaskModalStore = create<CreateTaskModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Function to open the modal by setting isOpen to true
  onClose: () => set({ isOpen: false }), // Function to close the modal by setting isOpen to false
}));
