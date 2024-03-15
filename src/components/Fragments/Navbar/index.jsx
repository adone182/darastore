import Button from "../../Elements/Button";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../../../features/Cart/cartSlice";

const Navbar = ({ logoName, handleModalCart }) => {
  const cartTotalItems = useSelector(selectCartTotalItems);

  return (
    <header className="bg-white fixed w-full z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-3xl text-blue-600 italic font-bold">
            {logoName}
          </h1>
          <Button
            type="button"
            classname="relative bg-blue-600 rounded-full p-2"
            ariaLabel="button-cart"
            onClick={handleModalCart}
          >
            {cartTotalItems !== 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}

            <GiShoppingCart
              size={25}
              color="white"
              aria-label="shopping-cart-icon"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
