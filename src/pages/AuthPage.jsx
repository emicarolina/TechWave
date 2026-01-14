import { useState } from "react";
import { motion as Motion } from "motion/react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let result;

    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2 font-raleway">
          {isLogin ? "Bem-vindo de volta!" : "Criar conta"}
        </h2>
        <p className="text-gray-400 text-center mb-8 font-inter">
          {isLogin
            ? "Entre com suas credenciais"
            : "Preencha os dados para se cadastrar"}
        </p>

        {error && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-900 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm"
          >
            {error}
          </Motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-2 font-raleway">
                Nome completo
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-700 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter"
                  placeholder="João Silva"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-2 font-raleway">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-zinc-700 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2 font-raleway">
              Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-zinc-700 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter"
                placeholder="••••••"
              />
            </div>
          </div>

          <Motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue hover:bg-blue/80 text-white font-semibold py-3 rounded-lg transition-colors mt-6 font-inter cursor-pointer"
          >
            {isLogin ? "Entrar" : "Criar conta"}
          </Motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 font-inter">
            {isLogin ? (
              <>
                Não tem uma conta?{" "}
                <span
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-blue font-semibold cursor-pointer hover:text-blue/70 transition-colors"
                >
                  Cadastre-se
                </span>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <span
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-blue font-semibold cursor-pointer hover:text-blue/70 transition-colors"
                >
                  Faça login
                </span>
              </>
            )}
          </p>
        </div>
      </Motion.div>
    </div>
  );
};

export default AuthPage;
