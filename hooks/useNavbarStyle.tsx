'use client';

import { useEffect } from 'react';
import { useNavbar } from '@/context/NavbarContext';

export function useNavbarStyle(color: 'light' | 'dark', showBorder: boolean) {
  const { setNavbarConfig } = useNavbar();

  useEffect(() => {
    setNavbarConfig({ color, showBorder });
  }, [color, showBorder, setNavbarConfig]);
}
