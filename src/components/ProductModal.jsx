import { motion as Motion, AnimatePresence } from "motion/react";
import { FiX } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const ProductModal = ({ isOpen, onClose, onSubmit, product = null }) => {
  const getInitialFormData = () => {
    if (product) {
      return {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageUrl: product.imageUrl,
      };
    }
    return {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      imageUrl: "",
    };
  };

  const wrapperRef = useRef(null);
  const descriptionRef = useRef(null);
  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !isOpen) return;

    let isAnimating = false;
    let targetScroll = wrapper.scrollTop;

    const animate = () => {
      isAnimating = true;
      wrapper.scrollTop += (targetScroll - wrapper.scrollTop) * 0.11;
      if (Math.abs(targetScroll - wrapper.scrollTop) > 0.5) {
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      targetScroll += e.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(wrapper.scrollHeight - wrapper.clientHeight, targetScroll)
      );
      if (!isAnimating) animate();
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", onWheel);
  }, [isOpen]);

  useEffect(() => {
    const textarea = descriptionRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.description]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.description.trim())
      newErrors.description = "Descrição é obrigatória";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Preço deve ser maior que zero";
    if (!formData.category.trim())
      newErrors.category = "Categoria é obrigatória";
    if (!formData.stock || formData.stock < 0)
      newErrors.stock = "Estoque não pode ser negativo";
    if (!formData.imageUrl.trim())
      newErrors.imageUrl = "URL da imagem é obrigatória";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const dataToSubmit = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };
    await onSubmit(dataToSubmit);
  };

  const handleClose = () => {
    setFormData(getInitialFormData());
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative mt-10"
              ref={wrapperRef}
            >
              <div className="sticky top-0 z-20 bg-zinc-800 flex items-center justify-between p-6 border-b border-zinc-700">
                <h2 className="text-2xl font-bold text-white font-raleway">
                  {product ? "Editar Produto" : "Novo Produto"}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-raleway font-medium">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light"
                    placeholder="Ex: Mouse Gamer RGB"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-raleway">
                    Descrição *
                  </label>
                  <textarea
                    ref={descriptionRef}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all resize-none font-inter font-light overflow-hidden min-h-30 leading-relaxed block"
                    placeholder="Descreva o produto..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-raleway">
                      Preço (R$) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-raleway">
                      Estoque *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-raleway">
                    Categoria *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-raleway">
                    URL da Imagem *
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full bg-zinc-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue focus:outline-none transition-all font-inter font-light"
                  />
                  {formData.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 bg-zinc-500 hover:bg-zinc-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-zinc-900 hover:bg-zinc-950 text-white py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    {product ? "Atualizar" : "Criar Produto"}
                  </button>
                </div>
              </form>
            </Motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
