const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const fetchProducts = async (resource) => {
  const response = await fetch(`${baseUrl}/${resource}`);
  const data = await response.json();
  return data;
};

export const searchProduct = async (resource, keyword) => {
  try {
    const response = await fetch(`${baseUrl}/${resource}?title=${keyword}`);
    if (!response.ok) {
      throw new Error("Gagal memuat data produk");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};
