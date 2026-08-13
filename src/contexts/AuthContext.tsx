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
   RAW BACKEND SHAPES
   Loosely typed on purpose: the backend response
   shape is inconsistent (see extractUser below),
   so every field here is optional/unknown rather
   than asserted.
───────────────────────────────────────────── */
interface RawUser {
  id?: string | number;
  name?: string;
  fullName?: string;
  email?: string;
  role?: string;
  user_role?: string;
}

interface RawAuthResponse {
  user?: RawUser;
  data?: {
    user?: RawUser;
    data?: {
      user?: RawUser;
    };
  };
}

/* ─────────────────────────────────────────────
   RESPONSE NORMALIZATION
   The Laravel backend nests the user under
   `data.user` (not top-level `user`), and names
   the role field `user_role` instead of `role`.
   This is the single place that translates the
   raw backend shape into the AuthUser shape the
   rest of the app expects, so every call site
   stays consistent.
───────────────────────────────────────────── */
function extractUser(raw: RawAuthResponse): AuthUser | null {
  const rawUser = raw?.data?.user ?? raw?.user ?? raw?.data?.data?.user ?? null;

  if (!rawUser) return null;

  const role: Role = (
    rawUser.user_role ??
    rawUser.role ??
    "user"
  ).toLowerCase() as Role;

  return {
    id: String(rawUser.id),
    name: rawUser.name ?? rawUser.fullName ?? "",
    email: rawUser.email ?? "",
    role,
  };
}

/* ─────────────────────────────────────────────
   PROVIDER
   Assumes an httpOnly-cookie session managed by
   your backend, with these routes:
     GET  /api/auth/me      -> { data: { user } } | 401
     POST /api/auth/login   -> { data: { user } }
     POST /api/auth/register-> { data: { user } }
     POST /api/auth/logout  -> 204
   Adjust extractUser() above if the backend shape
   changes.
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
      setUser(extractUser(data));
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
    const nextUser = extractUser(data);
    setUser(nextUser);
    if (!nextUser) {
      throw new Error("Login succeeded but the user could not be loaded.");
    }
    return nextUser;
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
    const nextUser = extractUser(data);
    setUser(nextUser);
    if (!nextUser) {
      throw new Error(
        "Registration succeeded but the user could not be loaded.",
      );
    }
    return nextUser;
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
