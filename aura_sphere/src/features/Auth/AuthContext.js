import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// PUBLIC_INTERFACE
/**
 * AuthContext provides authentication state and functions for sign in/up using email & password.
 */
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async (_email, _password) => {},
  signup: async (_email, _password) => {},
  logout: () => {},
});

/**
 * PUBLIC_INTERFACE
 * Hook to use authentication context.
 */
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
/**
 * AuthProvider implements local-only email/password authentication and session for demo/dev purposes.
 * In production, real backend/Firebase integration should replace this.
 */
export function AuthProvider({ children }) {
  // Persist session in localStorage (dev only: does not validate password securely!)
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("aura_auth_user");
    return u ? JSON.parse(u) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // For security demo, all users and passwords stored in plaintext in localStorage (not for production!)
  const getUsers = useCallback(() => {
    const users = localStorage.getItem("aura_auth_users");
    return users ? JSON.parse(users) : {};
  }, []);
  const setUsers = useCallback((users) => {
    localStorage.setItem("aura_auth_users", JSON.stringify(users));
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    // Simulate async call
    await new Promise((r) => setTimeout(r, 400));
    const users = getUsers();
    if (users[email] && users[email].password === password) {
      const u = { email, createdAt: users[email].createdAt };
      setUser(u);
      setIsAuthenticated(true);
      localStorage.setItem("aura_auth_user", JSON.stringify(u));
      return { ok: true };
    }
    return { ok: false, error: "Invalid email or password" };
  };

  // PUBLIC_INTERFACE
  const signup = async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const users = getUsers();
    if (users[email]) {
      return { ok: false, error: "Email already registered" };
    }
    users[email] = {
      password,
      createdAt: Date.now(),
    };
    setUsers(users);
    // Log in user after signup.
    const u = { email, createdAt: Date.now() };
    setUser(u);
    setIsAuthenticated(true);
    localStorage.setItem("aura_auth_user", JSON.stringify(u));
    return { ok: true };
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("aura_auth_user");
  };

  // Keep authenticated state in sync with localStorage/session
  useEffect(() => {
    if (!user) {
      setIsAuthenticated(false);
      localStorage.removeItem("aura_auth_user");
    } else {
      setIsAuthenticated(true);
      localStorage.setItem("aura_auth_user", JSON.stringify(user));
    }
  }, [user]);

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
