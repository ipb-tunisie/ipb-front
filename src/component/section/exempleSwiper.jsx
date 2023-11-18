import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import axios from "axios";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const ExampleSwiper = (img) => {
  const imagesArray = img.img;
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
    height: "10rem",
    objectFit: "cover",
  };
  console.log(img.img);
  return (
    <div style={sliderContainerStyle}>
      <Swiper
        style={{
          "--swiper-pagination-color": "#C21807",
        }}
        spaceBetween={0}
        centeredSlides={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        // Remove the autoplay prop
      >
        {img.img.map((image, index) => (
          <SwiperSlide key={index} style={slideStyle}>
            <img src={image} alt={`Image ${index}`} style={imageStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="swiper-button-next"
        style={{ color: "rgb(194, 24, 7)" }}
      ></div>
      <div
        className="swiper-button-prev"
        style={{ color: "rgb(194, 24, 7)" }}
      ></div>
    </div>
  );
};

export default ExampleSwiper;
