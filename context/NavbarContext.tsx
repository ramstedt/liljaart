'use client';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface NavbarConfigType {
  color: 'light' | 'dark';
  showBorder: boolean;
}

interface NavbarContextValue {
  navbarConfig: NavbarConfigType;
  setNavbarConfig: Dispatch<SetStateAction<NavbarConfigType>>;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfigType>({
    color: 'light',
    showBorder: true,
  });
  return (
    <NavbarContext.Provider value={{ navbarConfig, setNavbarConfig }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar(): NavbarContextValue {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
