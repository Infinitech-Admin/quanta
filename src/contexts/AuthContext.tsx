"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export type Role = "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ─────────────────────────────────────────────
   PROVIDER
   Assumes an httpOnly-cookie session managed by
   your backend, with these routes:
     GET  /api/auth/me      -> { user } | 401
     POST /api/auth/login   -> { user }
     POST /api/auth/register-> { user }
     POST /api/auth/logout  -> 204
   Adjust the fetch calls if you use a different
   auth strategy (e.g. bearer tokens in localStorage).
───────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchMe();
      setLoading(false);
    })();
  }, [fetchMe]);

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? "Invalid email or password");
    }
    const data = await res.json();
    setUser(data.user);
    return data.user as AuthUser;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? "Could not create account");
    }
    const data = await res.json();
    setUser(data.user);
    return data.user as AuthUser;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    refresh: fetchMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}