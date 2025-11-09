/**
 * Custom hook for window size
 * Hook מותאם אישית לבדיקת גודל החלון
 */

import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Hook that returns the current window size and updates on resize
 * Hook שמחזיר את גודל החלון הנוכחי ומתעדכן בעת שינוי גודל
 */
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook that returns whether the screen is mobile size
 * Hook שמחזיר האם המסך הוא בגודל מובייל
 */
export const useIsMobile = (breakpoint: number = 960): boolean => {
  const { width } = useWindowSize();
  return width <= breakpoint;
};

