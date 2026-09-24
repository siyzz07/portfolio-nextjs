"use client";

import { ThemeProvider } from "@/ContextApi/ThemeProvider";
import ProjectSample from "@/ContextApi/ProjectSample";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ProjectSample>
        {children}
      </ProjectSample>
    </ThemeProvider>
  );
}
