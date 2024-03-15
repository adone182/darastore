import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ banners }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings} className="my-10 w-[90%] mx-auto">
      {banners.map((banner, index) => (
        <div key={index}>
          <img
            src={banner.imageUrl}
            alt={banner.altText}
            className="rounded-xl"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
