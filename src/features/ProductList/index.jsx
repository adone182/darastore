import { useEffect, useState } from "react";
import Button from "../../components/Elements/Button";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDetailProduct } from "../ProductDetails/productDetailSlice";

const ProductList = ({ searchQuery, handleModalProductDetail }) => {
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
    toast.success("Yeay 🤩, Product success add to cart!");
  };

  const handleClickDetailProduct = (product) => {
    dispatch(getDetailProduct(product));
    handleModalProductDetail();
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
          <h1 className="text-blue-500 text-2xl text-center font-bold my-2 italic">
            All Product List
          </h1>

          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-10">
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
                    className="relative bg-white rounded-xl p-4 w-full flex flex-col justify-between shadow-slate-300 border border-gray-200"
                    key={product.id}
                  >
                    <div className="absolute top-3 right-3">
                      <FaHeartCircleCheck size={22} />
                    </div>
                    {/* header */}
                    {/* <div className="group relative w-[90%] lg:w-full h-[300px] lg:h-[120px] mx-auto overflow-hidden border border-red-300"> */}
                    <figure className="mt-4 ">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[100px] object-contain"
                        // className="w-full h-full object-contain group-hover:scale-110 transition-scale duration-500 ease-in-out border border-slate-700"
                      />
                    </figure>
                    {/* </div> */}
                    <p className="text-gray-400 text-sm font-reguler capitalize italic my-2">
                      {product.category}
                    </p>
                    {/* body */}

                    <div className="flex flex-col justify-start gap-2 h-full">
                      <h2 className="text-slate-700 text-sm font-medium  line-clamp-2 hover:line-clamp-none transition duration-500 ease-in-out ">
                        {product.title}
                      </h2>

                      {/* <h3 className="text-slate-500 text-md font-bold">
                        $ {product.price}
                      </h3> */}
                    </div>
                    {/* footer */}
                    {/* <div className="my-5">
                      <Button
                        type="button"
                        classname="bg-blue-600 hover:bg-green-700 transition duration-500 ease-in-out text-white text-sm font-semibold rounded-lg py-3 px-8 w-full"
                        onClick={() => handleClickBuyNow(product)}
                      >
                        BUY NOW
                      </Button>
                    </div> */}

                    <Button
                      type="button"
                      title="See Detail Product"
                      classname="group relative bg-gray-100 text-sm text-left text-gray-700 font-semibold w-full px-4 py-2 rounded-full mt-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 ease-in-out before:bg-lime-500 before:absolute before:inset-0 before:rounded-full before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
                      onClick={() => handleClickDetailProduct(product)}
                    >
                      ${product?.price}
                      <span className="absolute whitespace-nowrap text-gray-100 -z-10 text-center opacity-0 group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-[400ms] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        See Detail
                      </span>
                      <div className="absolute w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center top-0.5 bottom-0.5 right-0.5 group-hover:bg-lime-500 transition-all ease-in-out duration-200 group-hover:-z-10 group-hover:scale-90">
                        <FaEye
                          size={20}
                          className="text-white"
                          aria-label="see detail"
                        />
                      </div>
                    </Button>

                    <Button
                      type="button"
                      title="See Detail Product"
                      classname="group relative bg-gray-100 text-sm text-left text-gray-700 font-semibold w-full px-4 py-2 rounded-full mt-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 ease-in-out before:bg-lime-500 before:absolute before:inset-0 before:rounded-full before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
                      onClick={() => handleClickBuyNow(product)}
                    >
                      ${product?.price}
                      <span className="absolute whitespace-nowrap text-gray-100 -z-10 text-center opacity-0 group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-[400ms] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        Buy Now
                      </span>
                      <div className="absolute w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center top-0.5 bottom-0.5 right-0.5 group-hover:bg-lime-500 transition-all ease-in-out duration-200 group-hover:-z-10 group-hover:scale-90">
                        <GiShoppingCart
                          size={20}
                          className="text-white"
                          aria-label="shopping-cart-icon"
                        />
                      </div>
                    </Button>
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
