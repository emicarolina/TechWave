import { useState } from "react";
import { motion as Motion } from "motion/react";
import { FiPlus } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";

const AdminPage = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return product.name.toLowerCase().startsWith(searchLower);
  });

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja deletar "${product.name}"?`
    );

    if (confirmed) {
      const result = await deleteProduct(product._id);
      if (result.success) {
        alert("Produto deletado com sucesso!");
      } else {
        alert(result.error || "Erro ao deletar produto");
      }
    }
  };

  const handleSubmit = async (formData) => {
    let result;

    if (selectedProduct) {
      result = await updateProduct(selectedProduct._id, formData);
    } else {
      result = await createProduct(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      alert(
        selectedProduct
          ? "Produto atualizado com sucesso!"
          : "Produto criado com sucesso!"
      );
    } else {
      alert(result.error || "Erro ao salvar produto");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-15">
        <div className="flex items-center justify-between mb-12">
          <Motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold text-white font-raleway"
          >
            Gerenciamento de Produtos
          </Motion.h1>

          <Motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewProduct}
            className="bg-blue hover:bg-blue/80 text-white font-semibold py-3 px-6 rounded-3xl transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <FiPlus size={20} />
            Novo Produto
          </Motion.button>
        </div>

        {!loading && !error && products.length > 0 && (
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearSearch={handleClearSearch}
          />
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue"></div>
          </div>
        )}

        {error && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-900 text-red-900 px-6 py-4 rounded-lg mb-8"
          >
            {error}
          </Motion.div>
        )}

        {!loading && !error && products.length === 0 && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl mb-4">
              Nenhum produto cadastrado ainda
            </p>
            <button
              onClick={handleNewProduct}
              className="text-blue hover:text-blue/80 font-medium transition-colors"
            >
              Clique aqui para criar o primeiro produto
            </button>
          </Motion.div>
        )}

        {!loading &&
          !error &&
          products.length > 0 &&
          filteredProducts.length === 0 && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-xl mb-4">
                Nenhum produto encontrado para "{searchTerm}"
              </p>
              <button
                onClick={handleClearSearch}
                className="text-blue hover:text-blue/80 font-medium transition-colors"
              >
                Limpar busca
              </button>
            </Motion.div>
          )}

        {!loading && !error && filteredProducts.length > 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <Motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Motion.div>
            ))}
          </Motion.div>
        )}
      </div>

      <ProductModal
        key={selectedProduct?._id || "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        product={selectedProduct}
      />
    </div>
  );
};

export default AdminPage;
