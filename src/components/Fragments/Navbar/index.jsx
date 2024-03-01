import Button from "../../Elements/Button";

const Navbar = ({ logoName }) => {
  return (
    <header className="bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-3xl font-bold text-gray-100">{logoName}</h1>
          <Button
            type="button"
            className="relative rounded-full bg-blue-800 p-2 text-gray-100"
          >
            Cart
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
