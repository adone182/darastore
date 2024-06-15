import Modal from "../../components/Fragments/Modal";
import Button from "../../components/Elements/Button";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../Cart/cartSlice";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { FaStar, FaChevronLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

// import {
//   addItemToWishList,
//   removeItemFromWishList,
//   selectWishListItems,
// } from "../WishList/wishListSlice";

const ProductDetailModal = ({ handleModalProductDetail, product }) => {
  const dispatch = useDispatch();
  // const wishListItems = useSelector(selectWishListItems);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddItemQuantity = (product) => {
    setSelectedProduct({
      ...product,
      quantity: product.quantity + 1,
      totalPrice: (product.quantity + 1) * product.price,
    });
  };

  const handleReduceItemQuantity = (product) => {
    setSelectedProduct({
      ...product,
      quantity: product.quantity - 1,
      totalPrice: (product.quantity - 1) * product.price,
    });
  };

  const handleAddToCart = (product) => {
    console.log({ product });
    dispatch(addItemToCart(product));
    handleModalProductDetail();
    toast.success("Yeay 🤩, Product success add to cart!");
  };

  // const isInWishList = (selectedProduct) =>
  //   wishListItems.some((item) => item.id === selectedProduct.id);

  // const handleWishList = (product) => {
  //   const isInWishList = wishListItems.some((item) => item.id == product.id);
  //   if (!isInWishList) {
  //     dispatch(addItemToWishList(product));
  //     toast.success("Yeay 🤩, Product success add to wishlist!");
  //   } else {
  //     dispatch(removeItemFromWishList(product.id));
  //     toast.success("Product remove in wishlist!");
  //   }
  // };

  useEffect(() => {
    setSelectedProduct(product);
  }, [product]);

  return (
    <>
      <Modal onClick={handleModalProductDetail}>
        <div className="w-full relative">
          <div className="px-5 py-20 overflow-y-auto max-h-[58vh] md:max-h-[62vh]">
            <div className="h-full">
              <div className="absolute w-full top-[10px] left-0 z-[101]">
                <h1 className="text-center text-pink-600 italic font-bold">
                  Detail Product
                </h1>
              </div>

              <div className="absolute top-[10px] left-4 z-[101]">
                <Button
                  type="button"
                  aria-label="Close Detail Product"
                  title="Close Detail Product"
                  classname="w-7 h-7 bg-pink-100 rounded-md flex items-center justify-center hover:bg-gray-300 transition duration-100 ease-in-out"
                  onClick={handleModalProductDetail}
                >
                  <FaChevronLeft size={20} className="text-pink-600" />
                </Button>
              </div>
              <figure className="relative block w-full h-36 rounded-xl overflow-hidden mt-4 mb-5 px-4 py-5 border border-gray-200">
                <img
                  src={selectedProduct?.image}
                  alt={selectedProduct?.title}
                  className="w-full h-full object-contain object-center"
                />
                {/* <div className="absolute top-3 mobile:top-4 right-3 mobile:right-4">
                  <FaRegHeart
                    size={22}
                    onClick={() => handleWishList(selectedProduct)}
                    className={`cursor-pointer ${
                      !isInWishList
                        ? "text-gray bg-white hover:text-pink-500 duration-300"
                        : "text-pink-600 hover:text-pink-500 duration-300"
                    }`}
                  />
                </div> */}
              </figure>
              <div className="flex justify-between mb-4">
                <div className="">
                  <h6 className="text-base font-bold mb-px">
                    {selectedProduct?.title}
                  </h6>
                  <p className="text-sm capitalize text-gray-500  italic">
                    {selectedProduct?.category}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="bg-yellow-100 px-2.5 py-0.75 rounded-full flex items-center">
                    <FaStar
                      size={14}
                      fill="#facc15"
                      className="stroke-yellow-400 inline-block mr-1"
                    />
                    <div className="text-yellow-600 text-sm font-semibold">
                      {selectedProduct?.rating?.rate}
                    </div>
                  </div>
                </div>
              </div>
              <h6 className="font-semibold mb-1 text-sm">Description</h6>
              <p className="mb-4 text-gray-500 text-sm">
                {selectedProduct?.description}
              </p>
              <div className="flex items-center mb-5">
                <h6 className="font-semibold mr-4 text-sm">Quantity</h6>
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <Button
                    type="button"
                    aria-label="Minus Item Cart"
                    classname={`px-3 py-2 leading-normal stroke-gray-800 ${
                      selectedProduct?.quantity <= 1 ? "cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleReduceItemQuantity(selectedProduct)}
                    disabled={selectedProduct?.quantity <= 1}
                  >
                    -
                  </Button>

                  <p className="text-sm text-blue-400">
                    {selectedProduct?.quantity}
                  </p>
                  <Button
                    type="button"
                    aria-label="Plus Item Cart"
                    classname="px-3 py-1.5 leading-normal"
                    onClick={() => handleAddItemQuantity(selectedProduct)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky md:static inset-x-0 mb-4">
            <div className="border-t border-gray-200 px-5 pt-5">
              <Button
                type="button"
                aria-label="Add to Cart"
                classname="bg-pink-600 text-white font-bold w-full px-6 py-3.5 rounded-xl text-center leading-normal text-sm hover:bg-lime-600 transition duration-100 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart{" "}
                <span className="text-white font-normal mx-1.5">|</span> ${" "}
                {selectedProduct?.totalPrice}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetailModal;
