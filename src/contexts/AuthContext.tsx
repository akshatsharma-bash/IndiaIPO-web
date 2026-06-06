import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);


import { authApi } from "../services/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) {
        // Optimistically set the user and token first to prevent layout flashing
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setToken(savedToken);
          } catch (e) {
            console.error("Failed to parse saved user:", e);
          }
        }

        try {
          const response = await authApi.getProfile();
          if (response.user) {
            setUser(response.user);
            setToken(savedToken);
            localStorage.setItem("user", JSON.stringify(response.user));
          } else {
            logout();
          }
        } catch (error: any) {
          console.error("Auth init error:", error);
          
          // Do not log the user out on network errors, request aborts (browser refresh), or fetch type errors.
          // Only log out if it is an actual authentication failure (e.g. 401/403 status).
          const isNetworkError = 
            error.message?.includes("Failed to fetch") || 
            error.message?.includes("Load failed") ||
            error.name === "AbortError" ||
            error.name === "TypeError";

          if (!isNetworkError) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register({ name, email, password });
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const userRole = (user?.role || "").toLowerCase();
  const isAdmin = userRole === "super_admin" || userRole === "admin" || userRole === "super admin";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
