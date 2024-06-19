import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Fragments/Modal";
import Button from "../../components/Elements/Button";
import cartImg from "../../assets/img/cart-empty.png";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import {
  addQuantityProduct,
  minQuantityProduct,
  removeAllItemFromCart,
  removeItemFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrices,
} from "./cartSlice";
import { FaChevronLeft } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import convertUsdToIdr from "../../utils/convertUsdToIdr";

const CartModal = ({ handleModalCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrices = useSelector(selectCartTotalPrices);

  const handleCheckoutToWhatsapp = (productId) => {
    if (totalItems === 0) return;

    const phoneNumber = "6281210926935";
    const message = encodeURIComponent(
      `Halo DaraStore,\nSaya ingin melakukan checkout untuk pembelian barang dengan detail sebagai berikut:
        ${cartItems?.map(
          (product, index) =>
            `\n[${index + 1}] ${product?.title} (*Qty: ${product?.quantity}*)`
        )}\n\nTotal Barang: *${totalItems}*\nSubtotal: *$${convertUsdToIdr(
        totalPrices
      )}*\n\nMohon bantu konfirmasi ketersediaan stok dan informasi lebih lanjut untuk proses pembayaran. Terima kasih!
        `
    );
    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const handleAddItemQuantity = (productId) => {
    dispatch(addQuantityProduct(productId));
  };

  const handleReduceItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);

    if (item.quantity === 1) {
      confirmAlert({
        message: "Are you sure, want to reduce your product?",
        buttons: [
          {
            label: "Ya",
            onClick: () => {
              dispatch(removeItemFromCart(productId));
              toast.success("Produk berhasil dihapus dari keranjang belanja.");
            },
          },
          {
            label: "Tidak",
            onClick: () => {},
          },
        ],
      });
    } else {
      dispatch(minQuantityProduct(productId));
    }
  };

  const handleRemoveAllItemCart = () => {
    confirmAlert({
      message: "Are you sure, want to remove all product in cart?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(removeAllItemFromCart());
            toast.success("Semua produk berhasil dihapus dari shopping cart.");
          },
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  const handleRemoveItemInCart = (productId) => {
    confirmAlert({
      message: "Are you sure, want to remove product in cart?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(removeItemFromCart(productId));
            toast.success("Produk berhasil dihapus dari keranjang belanja.");
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
      <Modal onClick={handleModalCart}>
        <div className="w-full lg:w-[500px] relative">
          <div className="px-5 py-16 overflow-y-auto max-h-[58vh] md:max-h-[58vh] ">
            <div className="h-full">
              <div className="absolute w-full top-[10px] left-0 z-[101]">
                <h1 className="text-center text-pink-600 italic font-bold">
                  Shopping Cart
                </h1>
              </div>

              <div className="absolute top-[10px] left-5 z-[101]">
                <Button
                  type="button"
                  aria-label="Close Shopping Cart Modal"
                  title="Close Shopping Cart Modal"
                  classname="w-7 h-7 bg-pink-100 rounded-md flex items-center justify-center hover:bg-pink-200 transition duration-100 ease-in-out"
                  onClick={handleModalCart}
                >
                  <FaChevronLeft size={20} className="text-pink-600" />
                </Button>
              </div>

              <div className="absolute top-[10px] right-5 z-[101]">
                <Button
                  type="button"
                  aria-label="Remove All Product in shopping cart"
                  title="Remove All Product in shopping cart"
                  classname="w-7 h-7 bg-red-100 rounded-md flex items-center justify-center hover:bg-red-300 transition duration-100 ease-in-out"
                  onClick={handleRemoveAllItemCart}
                >
                  <IoTrash size={22} className="text-red-500" />
                </Button>
              </div>
              {totalItems == 0 ? (
                <div className="flex w-full h-full items-center justify-center flex-col pb-10 pt-10">
                  <figure>
                    <img
                      src={cartImg}
                      alt="Cart Box Empty"
                      className="w-28 block"
                    />
                  </figure>
                  <p className="mt-3 text-center text-sm font-semibold">
                    Your cart is empty
                  </p>
                  <p className="text-center text-sm text-gray-400 mb-2">
                    Add something to make me happy 😃
                  </p>
                  <Button
                    type="button"
                    aria-label="Continue Shopping"
                    classname="mt-3 block bg-pink-600 hover:bg-lime-500 text-white font-bold px-4 py-1.5 rounded-lg text-center leading-normal text-sm transition duration-100 ease-in-out"
                    onClick={handleModalCart}
                  >
                    Shop Now
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col py-1 px-1 gap-2 max-h-[500px]">
                  {cartItems?.map((product) => {
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
                              onClick={() => handleRemoveItemInCart(product.id)}
                            >
                              <RxCross1 size={20} />
                            </Button>
                          </h2>
                          <p className="text-xs text-gray-400 mb-1 capitalize italic">
                            {product?.category}
                          </p>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">
                              {convertUsdToIdr(product?.price)}
                            </h3>
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                              <Button
                                type="button"
                                aria-label="Minus Item"
                                title="Minus Item"
                                classname={`px-3 py-2 leading-normal stroke-gray-800 ${
                                  product?.quantity <= 1
                                    ? "cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleReduceItemQuantity(product?.id)
                                }
                                disabled={product?.quantity <= 1}
                              >
                                <CiCircleMinus size={16} strokeWidth={3} />
                              </Button>
                              <p className="text-sm">{product?.quantity}</p>
                              <Button
                                type="button"
                                aria-label="Add Item"
                                title="Add Item"
                                classname="px-3 py-1.5 leading-normal"
                                onClick={() =>
                                  handleAddItemQuantity(product?.id)
                                }
                              >
                                <CiCirclePlus size={16} strokeWidth={3} />
                              </Button>
                            </div>
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
        <div className="sticky md:static inset-x-0 bottom-0 py-2">
          <div className="border-t border-gray-200 px-5 mt-4">
            <div className="flex items-center justify-between pt-2">
              <p className="">Total Item</p>
              <p className="font-bold text-lg">{totalItems} pcs</p>
            </div>
            <div className="flex items-center justify-between pb-2">
              <p className="">Total</p>
              <p className="font-bold text-lg">
                {convertUsdToIdr(totalPrices)}
              </p>
            </div>
            <Button
              type="button"
              aria-label="Proceed to Checkout"
              title="Proceed to Checkout"
              classname="bg-pink-700 hover:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-center text-sm leading-normal font-bold w-full px-6 py-3 mb-2 rounded-xl    transition duration-100 ease-in-out"
              onClick={handleCheckoutToWhatsapp}
            >
              Proceed to Checkout (WhatsApp)
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CartModal;
