import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import axios from "axios";

type signInProps = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: ({ email, password }: signInProps) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ user: User | null; token: string }>({
    user: null,
    token: "",
  });

  async function signIn({ email, password }: signInProps) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;
      localStorage.setItem("@budgetapp:user", JSON.stringify(user));
      localStorage.setItem("@budgetapp:token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (axios.isAxiosError(error)) alert(error.response?.data.message);
      else console.log(error);
    }
  }

  function signOut() {
    localStorage.removeItem("@budgetapp:token");
    localStorage.removeItem("@budgetapp:user");
    api.defaults.headers.common["Authorization"] = undefined;
    setData({ user: null, token: "" });
  }

  useEffect(() => {
    const token = localStorage.getItem("@budgetapp:token");
    const user = localStorage.getItem("@budgetapp:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
