"use client";

import { createContext, useContext, useState } from "react";

const BusinessCardContext = createContext({
  isOpen: false,
  openCard: () => {},
  closeCard: () => {},
  toggleCard: () => {},
});

export function BusinessCardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCard = () => setIsOpen(true);
  const closeCard = () => setIsOpen(false);
  const toggleCard = () => setIsOpen((prev) => !prev);

  return (
    <BusinessCardContext.Provider value={{ isOpen, openCard, closeCard, toggleCard }}>
      {children}
    </BusinessCardContext.Provider>
  );
}

export const useBusinessCard = () => useContext(BusinessCardContext);
