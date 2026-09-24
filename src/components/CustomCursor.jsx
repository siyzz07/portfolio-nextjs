"use client";

import React from "react";

/**
 * CustomCursor is commented out because updating React state on every 'mousemove'
 * event causes severe frame drops and lagging across the entire site.
 * Leaving the component lightweight/noop ensures the site runs at butter-smooth 60fps.
 */
const CustomCursor = () => {
  return null;

  /* [HEAVY STATE-CHURN CURSOR CODE COMMENTED FOR PERFORMANCE]
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Continuous mousemove listener with setState causing full app re-renders:
  // window.addEventListener('mousemove', updateMousePosition);
  */
};

export default CustomCursor;
