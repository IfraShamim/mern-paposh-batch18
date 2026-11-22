import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Signup
  const signup = async (name, email, password) => {
    const response = await API.post("/auth/signup", {
      name,
      email,
      password,
    });

    return response.data;
  };

  // Login
  const login = async (email, password) => {
    const response = await API.post("/auth/login", {
      email,
      password,
    });

    const { token, user: loggedInUser } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);

    return response.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};