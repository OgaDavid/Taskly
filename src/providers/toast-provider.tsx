import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";

/**
 * ToastProvider renders a Toaster component from "@/components/ui/sonner".
 * It manages the mounting state of the component using the useState and useEffect hooks from React.
 * The Toaster component is rendered only when the component is mounted.
 * It accepts a position prop to specify the position of the toaster and a className prop to add custom styling.
 */

export const ToastProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Toaster position="bottom-right" className="bg-custom-primary" />;
};
