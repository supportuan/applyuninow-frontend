import React, { useState, useEffect } from "react";
import Image from 'next/image';
const HorizontalCarousel = (props) => {
  const items = props?.imgInfo;
  let visibleSides = 3;

  const [activeIndex, setActiveIndex] = useState(0);

  const totalItems = items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [totalItems]);

  const getSlideIndex = (index) => {
    const adjustedIndex = (index + totalItems) % totalItems;
    return adjustedIndex;
  };

  const visibleSlides = [];
  for (let i = -visibleSides; i <= visibleSides; i++) {
    visibleSlides.push(getSlideIndex(activeIndex + i));
  }
  

  return (
    <div className="carousel-container horizontal">
      <div className="carousel-track">
        {visibleSlides.map((slideIndex, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === visibleSides ? "active" : "inactive"
            }`}
          >
            <Image src={items[slideIndex]?.icon} alt={`slide-${index}`} width={200} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
