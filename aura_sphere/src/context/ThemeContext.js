import React, { createContext, useContext, useState } from "react";

// PUBLIC_INTERFACE
/**
 * ThemeContext provides theme state and toggle handler for dark/light mode. Stub implementation.
 */
export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  // Minimal placeholder: theme state with a toggle (future real logic)
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
