import { useEffect, useState } from "react";
import Button from "../../components/Elements/Button";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
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

  const handleClickBuyNow = (product) => {
    dispatch(addItemToCart(product));
    toast.success("Horee, Produk berhasil di tambahkan ke keranjang");
  };

  return (
    <>
      {loading ? (
        <div>
          <div className="bg-gray-200 h-4 w-1/4 rounded-xl mt-5"></div>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            <div className="bg-white shadow-xl rounded-md p-4 w-full">
              <div className="w-[90%] h-[350px] mx-auto rounded-xl bg-gray-200"></div>
              <div className="flex flex-col gap-6 mt-8">
                <div className="bg-gray-200 h-4 w-full rounded-xl mt-5 py-3 px-8"></div>
                <h3 className="bg-gray-200 h-4 w-full rounded-xl"></h3>
                <h4 className="bg-gray-200 h-4 w-1/2 rounded-xl mt-2"></h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-blue-500 text-2xl font-bold my-2 italic">
            Product List
          </h1>

          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {products
              .filter((product) => {
                if (searchQuery == "") {
                  return product;
                } else if (
                  product.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return product;
                }
              })

              .map((product) => {
                return (
                  <div
                    className="bg-white shadow-xl rounded-lg p-4 w-full"
                    key={product.id}
                  >
                    {/* header */}
                    <div className="group relative w-[80%] h-[270px] mx-auto overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-scale duration-500 ease-in-out"
                      />
                    </div>

                    {/* body */}
                    <div className="my-5">
                      <Button
                        type="button"
                        classname="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-3 px-8 w-full"
                        onClick={() => handleClickBuyNow(product)}
                      >
                        BUY NOW
                      </Button>
                    </div>

                    {/* footer */}
                    <div className="flex flex-col justify-between lg:h-[95px] md:h-[100px] sm:gap-4">
                      <h3 className="text-slate-700 text-sm font-medium">
                        {product.title}
                      </h3>

                      <h4 className="text-slate-400 text-md font-medium">
                        {product.price}
                      </h4>
                    </div>
                  </div>
                );
              })}
            {products.length > 0 &&
              products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <h1 className="text-red-500 text-lg font-medium italic">
                  Sorry...product not found!
                </h1>
              )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
