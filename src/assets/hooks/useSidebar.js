import { useState } from 'react';

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return { isOpen, toggleSidebar, closeSidebar };
};