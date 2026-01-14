import { useState } from "react";
import { motion as Motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";

const HomePage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return product.name.toLowerCase().startsWith(searchLower);
  });

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pt-15">
        <Motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-5 font-raleway"
        >
          Nossos Produtos
        </Motion.h1>

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-900 text-red-400 px-6 py-4 rounded-lg text-center"
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
            <p className="text-gray-400 text-xl">
              Nenhum produto disponível no momento
            </p>
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
                className="text-blue hover:text-blue/70 font-medium transition-colors cursor-pointer"
              >
                Limpar busca
              </button>
            </Motion.div>
          )}

        {!loading && !error && filteredProducts.length > 0 && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <Motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </Motion.div>
            ))}
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
