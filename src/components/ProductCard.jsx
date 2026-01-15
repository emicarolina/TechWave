import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const isPublicView = !onEdit && !onDelete;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuy = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue/20 transition-shadow"
      >
        <div className="relative h-56 overflow-hidden bg-gray-700">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500?text=Sem+Imagem";
            }}
          />
          <div className="absolute top-3 right-3 bg-blue px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-white font-raleway">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 font-raleway">
            {product.name}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10 font-raleway">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl text-white font-inter font-light">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-raleway">Estoque</p>
              <p className="text-lg text-white font-inter font-light">
                {product.stock} un.
              </p>
            </div>
          </div>

          {isPublicView ? (
            <div className="flex gap-2">
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBuy}
                className="flex-1 bg-blue hover:bg-blue/80 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-inter font-semibold"
              >
                <FiShoppingBag size={18} />
                Comprar
              </Motion.button>

              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 bg-zinc-600 hover:bg-zinc-500 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-inter font-semibold"
              >
                <FiShoppingCart size={18} />
                Carrinho
              </Motion.button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(product)}
                className="flex-1 bg-zinc-500 hover:bg-zinc-400 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-inter font-semibold"
              >
                <FiEdit2 size={18} />
                Editar
              </Motion.button>

              <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(product)}
                className="flex-1 bg-zinc-900 hover:bg-zinc-950 text-white py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer font-inter font-semibold"
              >
                <FiTrash2 size={18} />
                Deletar
              </Motion.button>
            </div>
          )}
        </div>
      </Motion.div>

      <Toast
        isVisible={showToast}
        message="Adicionado ao carrinho!"
        type="success"
      />

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-zinc-800 border border-zinc-700 w-full max-w-sm p-6 rounded-2xl shadow-2xl text-center"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <div className="w-16 h-16 bg-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-blue" size={32} />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Simulação de Compra
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Você selecionou o produto: <br />
                <strong className="text-white">{product.name}</strong>
              </p>

              <div className="bg-zinc-900/50 p-3 rounded-lg mb-6 border border-zinc-700">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">
                  Status
                </p>
                <p className="text-sm text-blue">
                  Pedido processado com sucesso!
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue text-white py-3 rounded-xl font-bold hover:bg-blue/80 transition-all cursor-pointer"
              >
                Fechar
              </button>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
