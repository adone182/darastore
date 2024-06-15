import { useEffect, useState } from "react";
import Button from "../../components/Elements/Button";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import emptyImg from "../../assets/img/empty-box.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addItemToWishList,
  removeItemFromWishList,
  selectWishListItems,
} from "../WishList/wishListSlice";
// import { setProductDetail } from "../ProductDetails/productDetailSlice";
import ProductDetailModal from "../ProductDetails/ProductDetailModal";
import { IoSearchCircleOutline } from "react-icons/io5";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isopenModalProduct, setIsOpenModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const wishListItems = useSelector(selectWishListItems);
  const productCount = 10;

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

  // const handleClickBuyNow = (product) => {
  //   dispatch(addItemToCart(product));
  //   toast.success("Yeay 🤩, Product success add to cart!");
  // };
  const handleModalProductDetail = () => {
    return setIsOpenModalProduct((prevState) => !prevState);
  };

  const handleClickDetailProduct = (product) => {
    // dispatch(setProductDetail(product));
    handleModalProductDetail();
    setSelectedProduct({
      ...product,
      quantity: 1,
      totalPrice: product.price,
    });
  };

  const handleClickWishlist = (product) => {
    const isInWishList = wishListItems.some((item) => item.id == product.id);
    if (!isInWishList) {
      dispatch(addItemToWishList(product));
      toast.success("Yeay 🤩, Product success add to wishlist!");
    } else {
      dispatch(removeItemFromWishList(product.id));
      toast.success("Product remove in wishlist!");
    }
  };

  return (
    <>
      <div className="flex tablet:items-center tablet:justify-between flex-col-reverse tablet:flex-row mb-5 gap-4">
        <div className="flex items-center overflow-x-scroll categories-filter">
          <button
            className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out border-gray-700 hover:bg-gray-200disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
            type="button"
            disabled={!!loading}
            // onClick={() => handleFilterCategory("all")}
          >
            All Products
          </button>

          <button
            className={`capitalize whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-300 ease-in-out border-gray-100 hover:bg-gray-200 hover:border-gray-200
               disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
            type="button"
          >
            jancuk
          </button>
        </div>
        <div className="">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
                placeholder="Search"
                // value={search}
                // onChange={handleSearch}
              />
              <IoSearchCircleOutline
                size={18}
                className="stroke-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
              />
              /
            </div>
            <div className="">
              <button
                className="relative w-[2.375rem] h-[2.375rem] flex items-center justify-center rounded-full bg-gray-900 hover:bg-lime-600 transition duration-100 ease-in-out"
                type="button"
                title="Filter"
                // onClick={handleToggleFilter}
              >
                hemm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* loading section */}
      {loading ? (
        <div>
          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-10">
            {Array.from({ length: productCount }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-md p-4 w-full"
              >
                <div className="w-full h-[100px] mx-auto rounded-xl bg-gray-200"></div>
                <div className="flex flex-col gap-3 mt-2">
                  <div className="bg-gray-200 h-3 w-full rounded-xl mt-3 px-8"></div>
                  <div className="bg-gray-200 h-3 w-full rounded-xl"></div>
                  <div className="bg-gray-200 h-3 w-3/4 rounded-xl"></div>
                  <div className="bg-gray-200 h-3 w-3/4 rounded-xl"></div>
                  <div className="bg-gray-200 h-3 w-1/2 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* <h1 className="text-blue-500 text-2xl text-center font-bold my-2 italic">
            All Product List
          </h1> */}

          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10">
            {products
              .filter((product) => {
                if (searchQuery == "") {
                  return product;
                } else if (
                  product?.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ) {
                  return product;
                }
              })

              .map((product) => {
                const isInWishList = wishListItems.some(
                  (item) => item.id === product.id
                );
                return (
                  <div
                    className="relative bg-white rounded-xl p-4 w-full flex flex-col justify-between shadow-slate-300 border border-pink-100"
                    key={product?.id}
                  >
                    {/* wishlist button */}
                    <div className="absolute top-3 right-3">
                      <Button
                        type="button"
                        onClick={() => handleClickWishlist(product)}
                      >
                        <FaRegHeart
                          size={22}
                          className={`cursor-pointer ${
                            !isInWishList
                              ? "text-gray bg-white hover:text-pink-500 duration-300"
                              : "text-pink-600 hover:text-pink-500 duration-300"
                          }`}
                        />
                      </Button>
                    </div>

                    {/* header */}
                    <figure className="mt-4 ">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[100px] object-contain"
                      />
                    </figure>

                    <p className="text-gray-400 text-sm font-reguler capitalize italic my-2">
                      {product?.category}
                    </p>

                    {/* body */}
                    <div className="flex flex-col justify-start gap-2 h-full">
                      <h2 className="text-slate-700 text-sm font-medium  line-clamp-1 hover:line-clamp-none transition duration-500 ease-in-out">
                        {product?.title}
                      </h2>

                      <div className="flex gap-1 items-center">
                        <FaStar
                          size={16}
                          fill="#facc15"
                          className="stroke-yellow-400"
                        />
                        <p className="text-gray-400 text-sm font-light">
                          {product?.rating?.rate} ({product?.rating?.count}{" "}
                          Review)
                        </p>
                      </div>
                    </div>

                    {/* footer */}
                    <Button
                      type="button"
                      title="See Product Detail"
                      classname="group relative bg-gray-100 text-sm text-left text-gray-700 font-semibold w-full px-4 py-2 rounded-full mt-4 border border-gray-200 hover:bg-gray-200 transition-all duration-300 ease-in-out before:bg-lime-500 before:absolute before:inset-0 before:rounded-full before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
                      onClick={() => handleClickDetailProduct(product)}
                    >
                      ${product?.price}
                      <span className="absolute whitespace-nowrap text-gray-100 -z-10 text-center opacity-0 group-hover:z-10 group-hover:opacity-100 transition-all ease-in-out duration-[400ms] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        See Detail
                      </span>
                      <div className="absolute w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center top-0.5 bottom-0.5 right-0.5 group-hover:bg-lime-500 transition-all  ease-in-out duration-300 group-hover:-z-10 group-hover:scale-90">
                        <GiShoppingCart
                          size={20}
                          className="text-white"
                          aria-label="shopping-cart-icon"
                          title="shopping-cart-icon"
                        />
                      </div>
                    </Button>

                    {/* <Button
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
                    </Button> */}
                  </div>
                );
              })}

            {products.length > 0 &&
              products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <div className="col-span-full">
                  <div className="flex flex-col items-center justify-center min-h-[68vh] mobile:min-h-[62vh]">
                    <img
                      src={emptyImg}
                      alt="Box Product Empty"
                      className="w-24"
                    />
                    <p className="text-gray-400 font-semibold text-lg mt-5">
                      Sorry...No products found!
                    </p>
                  </div>
                </div>
              )}
          </div>
          {isopenModalProduct ? (
            <ProductDetailModal
              handleModalProductDetail={handleModalProductDetail}
              product={selectedProduct}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ProductList;
