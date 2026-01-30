import React, { useState, useEffect } from "react";

const VerticalCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = props?.items;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="slider-container">
      <ul className="slider">
        {items.map((item, index) => (
          <li key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VerticalCarousel;
