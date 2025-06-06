import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { auth } from "../../firebase"; // firebase.js exports "auth" (getAuth(app))
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * AuthContext provides authentication state and functions using Firebase Auth (real backend).
 */
// PUBLIC_INTERFACE
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
 * AuthProvider uses Firebase Auth for secure email/password authentication.
 * Tracks real auth state and exposes login/signup/logout methods.
 */
export function AuthProvider({ children }) {
  // Session state is tracked by Firebase; keep local user state in sync
  const [user, setUser] = useState(() => auth.currentUser ? mapFirebaseUser(auth.currentUser) : null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!auth.currentUser);
  const [loading, setLoading] = useState(true);

  // Auth state listener: track auth changes (login/logout)
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * LOGIN
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ok: boolean, error?: string}>}
   */
  // PUBLIC_INTERFACE
  const login = useCallback(async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Auth state will update via listener
      return { ok: true };
    } catch (err) {
      // Firebase error codes: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      let msg = "Login failed. Please try again.";
      if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (err.code === "auth/user-disabled") msg = "Account is disabled.";
      else if (err.code === "auth/user-not-found") msg = "No user with that email.";
      else if (err.code === "auth/wrong-password") msg = "Wrong password.";
      return { ok: false, error: msg };
    }
  }, []);

  /**
   * SIGNUP
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ok: boolean, error?: string}>}
   */
  // PUBLIC_INTERFACE
  const signup = useCallback(async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Auth state will update via listener
      return { ok: true };
    } catch (err) {
      let msg = "Signup failed. Please try again.";
      if (err.code === "auth/email-already-in-use") msg = "Email is already registered.";
      else if (err.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (err.code === "auth/operation-not-allowed") msg = "Email-based sign-up is disabled.";
      else if (err.code === "auth/weak-password") msg = "Password is too weak (min 6 chars).";
      return { ok: false, error: msg };
    }
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    signOut(auth);
    // Auth state will update via onAuthStateChanged
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Optionally show a loading spinner while establishing auth state */}
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

/**
 * Helper: Map Firebase Auth User object to lightweight user for app context
 */
function mapFirebaseUser(firebaseUser) {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    emailVerified: firebaseUser.emailVerified,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    providerId: firebaseUser.providerId,
    // You can add more fields if needed (phoneNumber, etc.)
    creationTime: firebaseUser.metadata?.creationTime,
    lastSignInTime: firebaseUser.metadata?.lastSignInTime,
  };
}
