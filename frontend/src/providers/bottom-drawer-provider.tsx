import React, { createContext, useState, useContext } from 'react';

export interface BottomDrawerContextType {
  bottomDrawerOpen: boolean;
  closeBottomDrawer: () => void;
  openBottomDrawer: () => void;
}

const BottomDrawerContext = createContext<BottomDrawerContextType>(null!);

export function BottomDrawerProvider({children}: {children: JSX.Element}) {
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  const closeBottomDrawer = ()  => {
    setBottomDrawerOpen(false);
  }

  const openBottomDrawer = () => {
    setBottomDrawerOpen(true);
  }

  const value: BottomDrawerContextType = {
    bottomDrawerOpen,
    closeBottomDrawer,
    openBottomDrawer
  }

  return <BottomDrawerContext.Provider value={value}>{children}</BottomDrawerContext.Provider>
}

export function useBottomDrawer() {
  return useContext(BottomDrawerContext)
}