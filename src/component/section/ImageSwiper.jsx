import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
// import image from "./image.json";
import axios from "axios";
// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const ImageSwiper = () => {
  const sliderContainerStyle = {
    maxWidth: "100%",
    margin: "0 auto",
  };

  const slideStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "25rem",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  useEffect(() => {
    axios
      .get("https://api.ipb-tunisie.tn/image")
      .then((response) => {
        console.log(response.data);
        setImage(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  const [image, setImage] = useState([]);
  return (
    <div style={sliderContainerStyle}>
      <Swiper
        style={{
          "--swiper-pagination-color": "#C21807",
        }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {image.map((image, index) => (
          <SwiperSlide key={index} style={slideStyle}>
            <img src={image.img} alt={`Image ${index}`} style={imageStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
