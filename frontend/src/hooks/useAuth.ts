import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await axios.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      }
    };

    if (localStorage.getItem("token")) {
      loadUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return { user, login, register, logout };
}
