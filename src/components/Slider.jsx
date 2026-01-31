import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/slider.css";
import {uuid} from '../utils/helpers'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Slider({ content }) {
  return (
    <div className="block m-6 mx-6 text-xl rounded  swiper_container h-40  sm:h-36 ">
      <Swiper
        slidesPerView={1.2}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 1.2,
          },
          768: {
            width: 768,
            slidesPerView: 3,
          },
          1025: {
            width: 500,
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {content.map((item, index) => {
          return (
            <>
              <SwiperSlide key={uuid()}>
                <div>
                  <p className="text-darkred">{item.title}</p>
                  <p className="inline-block text-darkblue"> {item.detail}</p>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
      {/* <div>jjjjjjjj</div> */}
    </div>
  );
}
