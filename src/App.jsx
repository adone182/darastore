import { useState } from "react";
import "./App.css";
import banner1 from "./assets/banner1.png";
import banner2 from "./assets/banner2.png";
import Navbar from "./components/Fragments/Navbar";
import ProductList from "./features/ProductList";
import CartModal from "./features/Cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./features/Search";
import Carousel from "./components/Fragments/Carousel";
import ProductDetailModal from "./features/ProductList/ProductDetailModal";

const banners = [
  { imageUrl: banner1, altText: "Banner Promo One" },
  { imageUrl: banner2, altText: "Banner Promo Two" },
];

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isopenModalProduct, setIsOpenModalProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleModalCart = () => {
    return setIsOpenModalCart((prevState) => !prevState);
  };

  const handleModalProductDetail = () => {
    return setIsOpenModalProduct((prevState) => !prevState);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {isOpenModalCart ? <CartModal handleModalCart={handleModalCart} /> : null}
      {isopenModalProduct ? (
        <ProductDetailModal
          handleModalProductDetail={handleModalProductDetail}
        />
      ) : null}
      <Navbar logoName="DaraWear" handleModalCart={handleModalCart} />
      <main className="max-w-7xl mx-auto px-4 py-4 mt-20">
        <Carousel banners={banners} />
        <Search onSearch={handleSearch} />
        <ProductList
          searchQuery={searchQuery}
          handleModalProductDetail={handleModalProductDetail}
        />
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
