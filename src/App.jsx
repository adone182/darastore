import { useState } from "react";
import "./App.css";
import banner1 from "./assets/banner.webp";
import banner2 from "./assets/banner2.webp";
import ProductList from "./features/ProductList";
import CartModal from "./features/Cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "./components/Fragments/Carousel";
import WishListModal from "./features/WishList/WishListModal";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import FilterModal from "./features/FilterProduct/FilterModal";

const banners = [
  { imageUrl: banner1, altText: "Banner Promo One" },
  { imageUrl: banner2, altText: "Banner Promo Two" },
];

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalWishList, setIsOpenModalWishList] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);

  const handleModalCart = () => {
    return setIsOpenModalCart((prevState) => !prevState);
  };

  const handleModalWishList = () => {
    return setIsOpenModalWishList((prevState) => !prevState);
  };

  const handleModalFilterSearch = () => {
    return setIsOpenModalFilter((prevState) => !prevState);
  };

  return (
    <>
      {isOpenModalCart ? <CartModal handleModalCart={handleModalCart} /> : null}
      {isOpenModalFilter ? (
        <FilterModal handleModalFilterSearch={handleModalFilterSearch} />
      ) : null}
      {isOpenModalWishList ? (
        <WishListModal
          handleModalWishList={handleModalWishList}
          handleModalCart={handleModalCart}
        />
      ) : null}
      <Navbar
        logoName="DaraStore"
        handleModalCart={handleModalCart}
        handleModalWishList={handleModalWishList}
      />
      {/* <div className="px-72 py-4 mt-20">
        <Carousel banners={banners} />
      </div> */}
      <main className="max-w-7xl mx-auto px-4 py-4 mt-20">
        <ProductList handleModalFilterSearch={handleModalFilterSearch} />
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
}

export default App;
