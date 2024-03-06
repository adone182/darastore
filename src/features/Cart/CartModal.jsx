import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Fragments/Modal";
import Button from "../../components/Elements/Button";
import { IoTrash } from "react-icons/io5";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import {
  addQuantityProduct,
  minQuantityProduct,
  removeItemFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrices,
} from "./cartSlice";

const CartModal = ({ handleModalCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrices = useSelector(selectCartTotalPrices);

  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281210926935";
    const message = encodeURIComponent(
      `Hallo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrices}`
    );

    const URL = `https://api.whatsapp.com/send/?phone=${phoneNumber}?text=${message}`;

    window.open(URL, "_blank");
  };

  const handleAddItemQuantity = (productId) => {
    dispatch(addQuantityProduct(productId));
  };

  const handleReduceItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);

    if (item.quantity === 1) {
      confirmAlert({
        message:
          "Kamu yakin ingin mengurangi produk ini dari keranjang belanja?",
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

  const handleRemoveItemInCart = (productId) => {
    confirmAlert({
      message: "Kamu yakin ingin menghapus produk ini dari keranjang belanja?",
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
      <Modal>
        <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
          <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
            {cartItems.map((product) => {
              return (
                <div className="w-full border-blue-200 pb-4" key={product.id}>
                  <div className="flex items-center w-full">
                    <div className="w-[120px] h-auto overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-10 w-[75%]">
                      <h3 className="capitalize mt-3 text-lg">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm">{product.price}</h4>
                        <h3 className="text-lg font-bold">
                          {product.totalPrice}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 mt-4 ml-auto">
                        <Button
                          type="button"
                          classname="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                          onClick={() => handleReduceItemQuantity(product.id)}
                        >
                          -
                        </Button>
                        <h3 className="mx-2">{product.quantity}</h3>
                        <Button
                          type="button"
                          classname="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                          onClick={() => handleAddItemQuantity(product.id)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleRemoveItemInCart(product.id)}
                    >
                      <IoTrash size={25} color="red" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="text-lg font-bold">Total Item: {totalItems}</h3>
            <h3 className="text-lg font-bold">Total Price : {totalPrices} </h3>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              classname="bg-blue-600 hover:bg-slate-800 text-white px-8 py-3 rounded-xl text-sm"
              onClick={handleModalCart}
            >
              Close
            </Button>
            <Button
              type="button"
              classname="bg-blue-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl text-sm"
              onClick={handleCheckoutToWhatsapp}
            >
              Checkout (whatsapps)
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CartModal;
