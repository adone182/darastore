import Modal from "../../components/Fragments/Modal";
import Button from "../../components/Elements/Button";
import { useSelector } from "react-redux";
import { selectedItemDetail } from "../ProductDetails/productDetailSlice";

const ProductDetailModal = ({ handleModalProductDetail }) => {
  const product = useSelector(selectedItemDetail);
  console.log({ product });

  return (
    <>
      <Modal>
        <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
          <div className="flex flex-col py-2 lg:py-14 gap-6 max-h-[500px] overflow-auto">
            <h3 className="text-blue-700 text-md text-center font-semibold italic underline">
              Product Details
            </h3>
            <button
              className="w-12 h-12 bg-red-600 rounded-full text-xl font-bold text-white"
              onClick={handleModalProductDetail}
            >
              X
            </button>
            <div
              className="w-full border-b-2 border-blue-200 pb-6"
              key={product.id}
            >
              <div className="flex items-center w-full">
                <div className="w-[120px] h-auto overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-10 w-[75%]">
                  <h3 className="capitalize mt-3 text-md">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm">{product.price}</h4>
                    <h3 className="text-lg font-bold">{product.totalPrice}</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-4 ml-auto">
                    <Button
                      type="button"
                      classname="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                      // onClick={() => handleReduceItemQuantity(product.id)}
                    >
                      -
                    </Button>
                    <h3 className="mx-2">{product.quantity}</h3>
                    <Button
                      type="button"
                      classname="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                      // onClick={() => handleAddItemQuantity(product.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
              <h3 className="text-lg font-bold">Total Item: {totalItems}</h3>
              <h3 className="text-lg font-bold">
                Total Price : {totalPrices}{" "}
              </h3>
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
            </div> */}
        </div>
      </Modal>
    </>
  );
};

export default ProductDetailModal;
