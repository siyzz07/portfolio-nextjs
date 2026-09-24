"use client";

import { ThemeProvider } from "@/ContextApi/ThemeProvider";
import ProjectSample from "@/ContextApi/ProjectSample";
import { BusinessCardProvider } from "@/ContextApi/BusinessCardContext";
import BusinessCardModal from "@/components/BusinessCardModal";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ProjectSample>
        <BusinessCardProvider>
          {children}
          <BusinessCardModal />
        </BusinessCardProvider>
      </ProjectSample>
    </ThemeProvider>
  );
}
