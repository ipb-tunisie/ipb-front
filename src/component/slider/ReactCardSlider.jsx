import React from "react";
import "./Slider.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Modal1 from "../modal/modal1";
const ReactCardSlider = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  return (
    <div id="main-slider-container">
      <MdChevronLeft
        size={40}
        className="slider-icon left"
        onClick={slideLeft}
      />
      <div id="slider">
        {props.slides.map((slide, index) => {
          return (
            <div
              className="slider-card"
              key={index}
              onClick={() => console.log(`${slide.title}`)}
            >
              <div className="mb-2">
                <Modal1
                  id={slide._id}
                  imgUrl={slide.imgUrl}
                  imgAlt={slide.imgAlt}
                  title={slide.title}
                  price={slide.price}
                  desc={slide.desc}
                  page={slide.page}
                  total_quantity={slide.Quantity}
                  header="Concours ECN Tunisie"
                  style="slider"
                />
              </div>
              <div
                className="slider-card-image"
                style={{
                  backgroundImage: `url(${slide.imgUrl})`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="slider-card-title">{slide.title}</p>
              {/* <p className="slider-card-description">{slide.desc}</p> */}
            </div>
          );
        })}
      </div>
      <MdChevronRight
        size={40}
        className="slider-icon right"
        onClick={slideRight}
      />
    </div>
  );
};
export default ReactCardSlider;
