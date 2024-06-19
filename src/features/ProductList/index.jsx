import React, { useEffect, useMemo, useState } from "react";
import Button from "../../components/Elements/Button";
import { FaRegHeart, FaHeart, FaStar, FaSearch } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";
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
import ProductDetailModal from "../ProductDetails/ProductDetailModal";
import {
  setProductsError,
  setProductsStart,
  setProductsSuccess,
} from "./productSlice";

import { setCategory, setSearch } from "../FilterProduct/filterSlice";
import convertUsdToIdr from "../../utils/convertUsdToIdr";
import { RxCross1 } from "react-icons/rx";
import Input from "../../components/Elements/Input/Input";
const ProductList = ({ handleModalFilterSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isopenModalProduct, setIsOpenModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const wishListItems = useSelector(selectWishListItems);
  const { productItems, loading, categories, error } = useSelector(
    (state) => state.product
  );
  const {
    category: selectedCategory,
    sortBy,
    search,
  } = useSelector((state) => state.filter.filters);

  const productCount = 10;

  const handleModalProductDetail = () => {
    return setIsOpenModalProduct((prevState) => !prevState);
  };

  const handleClickDetailProduct = (product) => {
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

  const isInWishList = (product) =>
    wishListItems.find((item) => item.id === product.id);

  const handleFilterCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleToggleFilter = () => {
    handleModalFilterSearch();
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(setSearch(value));
  };

  const filteredProducts = useMemo(() => {
    const filtered = productItems.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "a_z":
        return filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
      case "z_a":
        return filtered.slice().sort((a, b) => b.title.localeCompare(a.title));
      case "highest":
        return filtered.slice().sort((a, b) => b.price - a.price);
      case "lowest":
        return filtered.slice().sort((a, b) => a.price - b.price);
      case "top_rated":
        return filtered.slice().sort((a, b) => b.rating.rate - a.rating.rate);
      case "most_reviewed":
        return filtered.slice().sort((a, b) => b.rating.count - a.rating.count);
      case "relevance":
      default:
        return filtered;
    }
  }, [productItems, search, selectedCategory, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        dispatch(setProductsStart());
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        dispatch(setProductsSuccess(data));
      } catch (error) {
        dispatch(setProductsError(error.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <h1 className="text-center text-2xl text-pink-600 font-bold italic my-10">
        Shopping Product
      </h1>
      <div className="flex tablet:items-center tablet:justify-between flex-col-reverse tablet:flex-row mb-5 gap-4">
        <div className="flex items-center categories-filter">
          <button
            className={`whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-100 ease-in-out ${
              selectedCategory === "all"
                ? "border-gray-700 hover:bg-gray-200"
                : "border-gray-100 hover:bg-gray-200 hover:border-gray-200"
            } disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
            type="button"
            disabled={!!(error || loading)}
            onClick={() => handleFilterCategory("all")}
          >
            All Products
          </button>
          {categories?.map((category) => (
            <button
              className={`capitalize whitespace-nowrap border-2 bg-gray-100 text-sm text-left w-auto px-3 py-1.5 rounded-full text-gray-700 font-medium mr-2 transition duration-300 ease-in-out ${
                selectedCategory === category
                  ? "border-gray-700 hover:bg-gray-200"
                  : "border-gray-100 hover:bg-gray-200 hover:border-gray-200"
              } disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-transparent`}
              key={category}
              onClick={() => handleFilterCategory(category)}
              disabled={!!(error || loading)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="">
          <div className="flex items-center space-x-2.5">
            <div className="relative w-full">
              <Input
                type="text"
                classname="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
              <FaSearch
                size={18}
                className="stroke-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none"
              />
              {search && (
                <RxCross1
                  size={15}
                  className="stroke-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:stroke-gray-500"
                  onClick={() => dispatch(setSearch(""))}
                />
              )}
            </div>
            <div className="">
              <button
                className="relative w-[2.375rem] h-[2.375rem] flex items-center justify-center rounded-full bg-gray-900 hover:bg-lime-600 transition duration-100 ease-in-out"
                type="button"
                title="Filter"
                onClick={handleToggleFilter}
              >
                <LuSlidersHorizontal
                  strokeWidth={2.5}
                  size={18}
                  className="w-5 stroke-gray-100"
                />
                {sortBy !== "relevance" ? (
                  <div className="bg-red-500 rounded-full w-3.5 h-3.5 flex items-center justify-center absolute -top-px -right-0.75 border-2 border-white" />
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* loading section */}
      {isLoading ? (
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
          <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10">
            {filteredProducts?.length > 0 ? (
              filteredProducts?.map((product) => {
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
                            !isInWishList(product)
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
                      {convertUsdToIdr(product?.price)}
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
                  </div>
                );
              })
            ) : (
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
