import { useEffect, useState } from "react";
import Button from "../../components/Elements/Button";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <>
      <h1 className="text-blue-500 text-2xl font-bold my-2">Product List</h1>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {products.map((product) => {
          return (
            <div
              className="bg-white shadow-xl rounded-lg p-4 w-full"
              key={product.id}
            >
              <div className="group relative w-[80%] h-[350px] mx-auto overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-scale duration-500 ease-in-out"
                />
              </div>
              <div className="flex flex-col gap-6 mt-8">
                <Button
                  type="button"
                  classname="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-3 px-8"
                >
                  BUY NOW
                </Button>
                <h3 className="text-gray-600 text-lg font-medium">
                  {product.title}
                </h3>
                <h4 className="text-gray-400 text-lg font-medium">
                  {product.price}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
