import Button from "../../Elements/Button";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../../../features/Cart/cartSlice";

const Navbar = ({ logoName, handleModalCart }) => {
  const cartTotalItems = useSelector(selectCartTotalItems);

  return (
    <header className="bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-3xl text-gray-100 italic font-bold">
            {logoName}
          </h1>
          <Button
            type="button"
            classname="relative bg-blue-800 rounded-full p-2"
            onClick={handleModalCart}
          >
            <span className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
              {cartTotalItems}
            </span>
            <GiShoppingCart size={32} color="white" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
