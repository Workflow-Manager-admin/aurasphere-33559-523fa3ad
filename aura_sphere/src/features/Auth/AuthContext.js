import React, { createContext, useContext } from "react";

// PUBLIC_INTERFACE
/**
 * AuthContext provides minimal authentication state; stub for future real implementation.
 */
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Stub: no actual authentication logic
  const authValue = {
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}
