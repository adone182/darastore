import { useState } from "react";
import "./App.css";
import Navbar from "./components/Fragments/Navbar";
import ProductList from "./features/ProductList";
import CartModal from "./features/Cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./features/Search";
import { searchProduct } from "./api";

function App() {
  const [isOpenModalCart, setIsOpenModaCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleModalCart = () => {
    return setIsOpenModaCart((prevState) => !prevState);
  };

  const handleSearch = (query) => {
    searchProduct(query);
    setSearchQuery(query);
  };

  return (
    <>
      {isOpenModalCart ? <CartModal handleModalCart={handleModalCart} /> : null}
      <Navbar logoName="DaraStore" handleModalCart={handleModalCart} />
      <main className="max-w-5xl lg:max-w-7xl mx-auto px-4 py-4">
        <Search onSearch={handleSearch} />
        <ProductList searchQuery={searchQuery} />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
