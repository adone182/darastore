import Button from "../../Elements/Button";
import { GiShoppingCart } from "react-icons/gi";

const Navbar = ({ logoName }) => {
  return (
    <header className="bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-3xl text-gray-100 italic font-bold">
            {logoName}
          </h1>
          <Button
            type="button"
            classname="relative bg-blue-800 rounded-full p-2"
          >
            <GiShoppingCart size={32} color="white" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
