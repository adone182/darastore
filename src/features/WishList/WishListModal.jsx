import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Fragments/Modal";
import {
  removeAllItemFromWishList,
  removeItemFromWishList,
  selectWishListItems,
  selectWishListTotalItems,
} from "./wishListSlice";
import wishlistImg from "../../assets/img/package.png";
import Button from "../../components/Elements/Button";
import { IoTrash } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { FaChevronLeft } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { addItemToCart } from "../Cart/cartSlice";

const WishListModal = ({ handleModalWishList, handleModalCart }) => {
  const dispatch = useDispatch();
  const wishListItems = useSelector(selectWishListItems);
  const totalWishListItem = useSelector(selectWishListTotalItems);

  const handleRemoveWishList = (productId) => {
    confirmAlert({
      message: "Are you sure, want to remove product in wishlist?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(removeItemFromWishList(productId));
            toast.success("Produk berhasil dihapus dari wishlist.");
          },
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    handleModalCart();
    handleModalWishList();
  };

  const handleRemoveAllWishList = () => {
    confirmAlert({
      message: "Are you sure, want to remove all product in wishlist?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(removeAllItemFromWishList());
            toast.success("Semua produk berhasil dihapus dari wishlist.");
          },
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      <Modal onClick={handleModalWishList}>
        <div className="w-full relative">
          <div className="px-5 py-16 overflow-y-auto max-h-[58vh] md:max-h-[68vh] ">
            <div className="h-full">
              <div className="absolute w-full top-[10px] left-0 z-[101]">
                <h1 className="text-center text-pink-600 italic font-bold">
                  Your Wishlist Product
                </h1>
              </div>

              <div className="absolute top-[10px] left-5 z-[101]">
                <Button
                  type="button"
                  aria-label="Close Wishlist Modal"
                  title="Close Wishlist Modal"
                  classname="w-7 h-7 bg-pink-100 rounded-md flex items-center justify-center hover:bg-pink-200 transition duration-100 ease-in-out"
                  onClick={handleModalWishList}
                >
                  <FaChevronLeft size={20} className="text-pink-600" />
                </Button>
              </div>

              <div className="absolute top-[10px] right-9 z-[101]">
                <Button
                  type="button"
                  aria-label="Remove All Product in wishlist"
                  title="Remove All Product in wishlist"
                  classname="w-7 h-7 bg-red-100 rounded-md flex items-center justify-center hover:bg-red-300 transition duration-100 ease-in-out"
                  onClick={handleRemoveAllWishList}
                >
                  <IoTrash size={22} className="text-red-500" />
                </Button>
              </div>
              {totalWishListItem == 0 ? (
                <div className="flex w-full h-full items-center justify-center flex-col pb-10 pt-10">
                  <figure>
                    <img
                      src={wishlistImg}
                      alt="Wishlist Blue Box Empty"
                      className="w-28 block"
                    />
                  </figure>
                  <p className="mt-3 text-center text-sm font-semibold">
                    Your wishlist is empty
                  </p>
                  <p className="text-center text-sm text-gray-400 mb-2">
                    Tap the heart on any item to start saving your favorites ✨.
                  </p>
                  <Button
                    type="button"
                    aria-label="Continue Shopping"
                    classname="mt-3 block bg-pink-600 hover:bg-lime-500 text-white font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm  transition duration-100 ease-in-out"
                    onClick={handleModalWishList}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col py-1 px-1 gap-2 max-h-[500px]">
                  {wishListItems?.map((product) => {
                    return (
                      <div
                        className="border-b-2 border-dashed border-pink-200 py-4 flex items-center space-x-3"
                        key={product?.id}
                      >
                        <div className="border border-pink-200 rounded-lg">
                          <figure className="w-20 h-20 px-2 py-2 overflow-hidden">
                            <img
                              src={product?.image}
                              alt={product?.title}
                              className="w-full h-full object-contain object-center"
                            />
                          </figure>
                        </div>
                        <div className="w-full">
                          <h2 className="relative font-bold text-sm text-gray-800 pr-8 line-clamp-2 hover:line-clamp-none mb-px">
                            {product?.title}
                            <Button
                              type="button"
                              aria-label="Remove Wishlist Product"
                              title="Remove Wishlist Product"
                              classname="absolute top-0 right-0 cursor-pointer  hover:text-red-500"
                              role="presentation"
                              onClick={() => handleRemoveWishList(product.id)}
                            >
                              <RxCross1 size={20} />
                            </Button>
                          </h2>
                          <p className="text-xs text-gray-400 mb-1 capitalize italic">
                            {product?.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              ${product?.price} USD
                            </h3>
                            <Button
                              type="button"
                              aria-label="Add to Cart"
                              title="Add to Cart"
                              classname="cursor-pointer bg-pink-600 hover:bg-lime-600 text-white text-center text-sm font-bold px-4 py-1.5 rounded-lg  leading-normal transition duration-100 ease-in-out"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add To Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WishListModal;
