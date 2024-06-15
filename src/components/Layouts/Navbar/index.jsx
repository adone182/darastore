import Button from "../../Elements/Button";
import { GiShoppingCart } from "react-icons/gi";
import logoImg from "../../../assets/img/dara.png";
import { BsBagHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectCartTotalItems } from "../../../features/Cart/cartSlice";
import { selectWishListTotalItems } from "../../../features/WishList/wishListSlice";

const Navbar = ({ logoName, handleModalCart, handleModalWishList }) => {
  const cartTotalItems = useSelector(selectCartTotalItems);
  const wishListTotalItems = useSelector(selectWishListTotalItems);

  return (
    <header className="bg-white fixed w-full z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center">
            <figure className="flex items-center justify-center">
              <img
                src={logoImg}
                alt="DaraStore"
                className="object-contain -ms-[40px] w-48"
              />
            </figure>
            <h1 className="-ms-[78px] text-3xl text-pink-600 italic font-bold">
              {logoName}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              classname="relative bg-pink-200 rounded-md p-2"
              ariaLabel="button-cart"
              onClick={handleModalWishList}
            >
              {wishListTotalItems !== 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-600 text-white text-sm flex items-center justify-center">
                  {wishListTotalItems}
                </span>
              )}

              <BsBagHeart
                size={25}
                className="text-red-600"
                aria-label="wishlist-icon"
              />
            </Button>

            <Button
              type="button"
              classname="relative p-2"
              ariaLabel="button-cart"
              onClick={handleModalCart}
            >
              {cartTotalItems !== 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-600 text-white text-sm flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}

              <GiShoppingCart
                size={28}
                className="text-pink-600"
                aria-label="Shopping Cart"
                title="Shopping Cart"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
