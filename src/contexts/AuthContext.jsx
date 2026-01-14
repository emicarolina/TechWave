import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      loadUser();
    } else {
      setLoading(false);
    }
  }, [loadUser]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer login",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Erro no registro:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao fazer registro",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
