import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import RightArrow from "../../assets/leads/RightArrow.svg";

import "./Styles.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
import Card from "../../common/Card";
// import Card from './Card'

export default function Slider({ content, my_swiper, handleSwiper }) {
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="  lg:w-[1290px] m-auto flex justify-center items-center custom-swiper">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        onInit={handleSwiper}
        centeredSlides={screenSize.dynamicWidth < 768 ? true : false}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        breakpoints={{
          "@0.00": {
            spaceBetween: 20,
            slidesPerView: 1.5,
          },
          "@0.37": {
            spaceBetween: 20,
            slidesPerView: 1.5,
          },
          "@0.75": {
            slidesPerView: 3,
          },
          "@1.00": {
            slidesPerView: 4,
          },
          "@1.50": {
            slidesPerView: 4,
          },
        }}
        className="testSlider"
      >
        {content.map((item, index) => {
          return (
            <>
              <SwiperSlide key={"slider" + index}>
                <Card
                  count={item?.stats}
                  label={item?.label}
                  color={item?.color}
                />
              </SwiperSlide>
              <div class="swiper-button-prev-unique">{"<"}</div>
              <div class="swiper-button-next-unique">{">"}</div>
            </>
            
          );
        })}
      </Swiper>
    </div>
  );
}
