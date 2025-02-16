import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  currentProduct: {},
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {
        success: false,
        message: "Please fill in all fields.",
      };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    set((state) => ({ products: [...state.products, data.data] }));

    return {
      success: true,
      message: "Product Added",
    };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const { products } = await res.json();
    set({ products });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    set((state) => ({
      products: state.products.filter(({ _id }) => _id !== id),
    }));

    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.image ||
      !updatedProduct.price
    ) {
      return {
        success: false,
        message: "Please fill in all fields.",
      };
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));

    return {
      success: true,
      message: "Product Updated",
    };
  },
}));
