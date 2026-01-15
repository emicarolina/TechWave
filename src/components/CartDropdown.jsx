import { motion as Motion, AnimatePresence } from "motion/react";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import Toast from "./Toast";

const CartDropdown = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  const [showToast, setShowToast] = useState(false);
  const listScrollRef = useRef(null);
  const dropdownRef = useRef(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  useEffect(() => {
    return () => {
      if (window.lenis) window.lenis.start();
    };
  }, []);

  const handleCheckout = () => {
    if (window.lenis) window.lenis.start();
    onClose();
    setShowToast(true);
    clearCart();
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    const wrapper = listScrollRef.current;
    if (!isOpen || !wrapper) return;

    let isAnimating = false;
    let targetScroll = wrapper.scrollTop;
    let animationFrameId;

    const animate = () => {
      isAnimating = true;
      const diff = targetScroll - wrapper.scrollTop;
      wrapper.scrollTop += diff * 0.15;

      if (Math.abs(diff) > 0.5) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(wrapper.scrollHeight - wrapper.clientHeight, targetScroll)
      );
      if (!isAnimating) animate();
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      wrapper.removeEventListener("wheel", onWheel);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, cartItems.length]);

  const handleMouseEnter = () => {
    if (window.lenis && isOpen) window.lenis.stop();
  };

  const handleMouseLeave = () => {
    if (window.lenis) window.lenis.start();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                if (window.lenis) window.lenis.start();
                onClose();
              }}
            />

            <Motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="fixed right-4 top-20 z-50 w-96 max-h-[80vh] bg-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-700 shrink-0 z-10 bg-zinc-800 relative">
                <h3 className="text-xl font-bold text-white font-raleway flex items-center gap-2">
                  <FiShoppingCart size={24} />
                  Meu Carrinho
                </h3>
              </div>

              <div
                ref={listScrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 relative"
              >
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FiShoppingCart
                      size={48}
                      className="mx-auto mb-3 opacity-50"
                    />
                    <p className="font-inter">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <Motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-zinc-700 rounded-lg p-3 flex gap-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />

                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm line-clamp-1 font-raleway">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-xs font-inter">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            className="bg-zinc-600 hover:bg-zinc-500 text-white p-1 rounded transition-colors cursor-pointer"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="text-white font-inter text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                            className="bg-zinc-600 hover:bg-zinc-500 text-white p-1 rounded transition-colors cursor-pointer"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-400 hover:text-red-300 transition-colors self-start cursor-pointer"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </Motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t border-zinc-700 space-y-3 shrink-0 bg-zinc-800 z-10 relative">
                  <div className="flex items-center justify-between text-white">
                    <span className="font-raleway font-semibold">Total:</span>
                    <span className="text-2xl font-inter font-light">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue hover:bg-blue/80 text-white font-semibold py-3 rounded-lg transition-colors font-inter cursor-pointer"
                  >
                    Finalizar Compra
                  </button>
                </div>
              )}
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      <Toast
        isVisible={showToast}
        message="Compra realizada com sucesso!"
        type="success"
      />
    </>
  );
};

export default CartDropdown;
