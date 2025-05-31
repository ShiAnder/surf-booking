'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export function useAOS() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
} 