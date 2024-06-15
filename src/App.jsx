import { useState } from "react";
import "./App.css";
import banner1 from "./assets/banner.webp";
import banner2 from "./assets/banner2.webp";
import ProductList from "./features/ProductList";
import CartModal from "./features/Cart/CartModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./features/Search";
import Carousel from "./components/Fragments/Carousel";
// import ProductDetailModal from "./features/ProductDetails/ProductDetailModal";
import WishListModal from "./features/WishList/WishListModal";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";

const banners = [
  { imageUrl: banner1, altText: "Banner Promo One" },
  { imageUrl: banner2, altText: "Banner Promo Two" },
];

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalWishList, setIsOpenModalWishList] = useState(false);
  // const [isopenModalProduct, setIsOpenModalProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleModalCart = () => {
    return setIsOpenModalCart((prevState) => !prevState);
  };

  const handleModalWishList = () => {
    return setIsOpenModalWishList((prevState) => !prevState);
  };

  // const handleModalProductDetail = () => {
  //   return setIsOpenModalProduct((prevState) => !prevState);
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {isOpenModalCart ? <CartModal handleModalCart={handleModalCart} /> : null}
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
        <h1 className="text-center text-2xl text-pink-600 font-bold italic my-10">
          Shopping Product
        </h1>
        <Search onSearch={handleSearch} />
        <ProductList
          searchQuery={searchQuery}
          handleModalWishList={handleModalWishList}
        />
        <ToastContainer />
      </main>

      <Footer />
    </>
  );
}

export default App;
