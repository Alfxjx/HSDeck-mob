// Hook to detect clicks outside of a component.

import { useEffect } from "react";

// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
    ref: React.RefObject<HTMLDivElement>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback: Function
  ) => {
    useEffect(() => {
      const listener = (event: any) => {
        // DO NOTHING if the element being clicked is the target element or their children
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        callback(event);
      };
  
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
  
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, callback]);
  };
  