import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // LocalStorage se saved theme lo, warna dark (dark-first app)
    return localStorage.getItem('moto-theme') || 'dark';
  });

  useEffect(() => {
    // document root pe class laga do
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('moto-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
