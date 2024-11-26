import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "../styles/AsNavFor.css";

function AsNavFor({ ImageData }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container nav-slick-in-productdetail">
      {/* Main Slider */}
      <Slider
        arrows={false}
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
      >
        {ImageData?.length > 0 &&
          ImageData.map((image, index) => (
            <div
              key={`main-slider-${index}`}
              className="w-100"
              style={{
                aspectRatio: "1 / 1",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <img
                src={image}
                style={{ height: "100%", objectFit: "cover", width: "100%" }}
                alt="error"
              />
            </div>
          ))}
      </Slider>

      {/* Thumbnail Slider */}
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        style={{ height: "100px" }}
      >
        {ImageData?.length > 0 &&
          ImageData.map((image, index) => (
            <div
              key={`thumbnail-slider-${index}`}
              style={{
                cursor: "pointer",
                overflow: "hidden",
                height: "100px",
              }}
            >
              <img
                src={image}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // Prevent cropping or distortion
                  width: "50%",
                  height: "auto", // Automatically adjust height based on width
                }}
                alt="error"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default AsNavFor;
