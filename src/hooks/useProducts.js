import { useState, useEffect } from "react";
import { productService } from "../services/api.js";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data.data);
    } catch (error) {
      setError("Erro ao carregar produtos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      await productService.create(productData);
      await fetchProducts();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao criar produto",
      };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await productService.update(id, productData);
      await fetchProducts();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao atualizar produto",
      };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productService.delete(id);
      await fetchProducts();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erro ao deletar produto",
      };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
};
