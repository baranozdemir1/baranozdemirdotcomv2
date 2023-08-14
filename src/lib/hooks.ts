import React from "react";
import { useActiveSectionContext } from "@/context/ActiveSectionContextProvider";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";
import { ThemeContext } from "@/context/ThemeContextProvider";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  React.useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000)
      setActiveSection(sectionName);
  }, [inView, sectionName, setActiveSection, timeOfLastClick]);

  return {
    ref,
  };
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }

  return context;
}
