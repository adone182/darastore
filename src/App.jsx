import { useState } from "react";
import "./App.css";
import Navbar from "./components/Fragments/Navbar";
import ProductList from "./features/ProductList";
import CartModal from "./features/Cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isOpenModalCart, setIsOpenModaCart] = useState(false);

  const handleModalCart = () => {
    return setIsOpenModaCart((prevState) => !prevState);
  };

  return (
    <>
      {isOpenModalCart ? <CartModal handleModalCart={handleModalCart} /> : null}
      <Navbar logoName="DaraStore" handleModalCart={handleModalCart} />
      <main className="max-w-7xl mx-auto px-4 lg:px-10">
        <ProductList />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
