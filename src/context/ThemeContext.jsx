import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themePreference, setThemePreference] = useState(() => {
    return localStorage.getItem('prashnify_theme') || 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('prashnify_theme', themePreference);

    const applyTheme = () => {
      let next = themePreference;
      if (themePreference === 'auto') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        next = prefersDark ? 'dark' : 'light';
      }
      setResolvedTheme(next);
      document.documentElement.setAttribute('data-theme', next);
    };

    applyTheme();

    if (themePreference === 'auto' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    return undefined;
  }, [themePreference]);

  const toggleTheme = () => {
    setThemePreference((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ themePreference, resolvedTheme, setThemePreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
