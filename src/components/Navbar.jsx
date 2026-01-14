import { useState } from "react";
import { motion as Motion } from "motion/react";
import { FiUser, FiLogOut, FiSettings, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartDropdown from "./CartDropdown";
import ShinyText from "./ShinyText";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <Motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold font-raleway cursor-pointer"
              >
                <ShinyText
                  text="TechWave"
                  speed={2}
                  delay={0}
                  color="#E1EBEA"
                  shineColor="#47B3AA"
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                />
              </Motion.h1>
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative text-white hover:text-blue transition-colors cursor-pointer"
                  >
                    <FiShoppingCart size={24} />

                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Motion.button>

                  {isAdmin && (
                    <Link to="/admin">
                      <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-inter cursor-pointer"
                      >
                        <FiSettings size={18} />
                        Gerenciar
                      </Motion.button>
                    </Link>
                  )}

                  <div className="flex items-center gap-2 text-white">
                    <FiUser size={20} />
                    <span className="font-inter">{user.name}</span>
                    {isAdmin && (
                      <span className="bg-blue px-2 py-1 rounded text-xs font-semibold">
                        ADMIN
                      </span>
                    )}
                  </div>

                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-inter cursor-pointer"
                  >
                    <FiLogOut size={18} />
                    Sair
                  </Motion.button>
                </>
              ) : (
                <Link to="/auth">
                  <Motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue hover:bg-blue/80 text-white px-6 py-2 rounded-lg transition-colors font-inter font-semibold cursor-pointer"
                  >
                    Entrar
                  </Motion.button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
