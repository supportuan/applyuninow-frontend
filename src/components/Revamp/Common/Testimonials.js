
import React, { useEffect, useState } from 'react';
import { testimonialStore } from '../utils/helpers';
import GetUserDetails from './GetUserDetails';
import Image from 'next/image';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = testimonialStore.length;
  const visibleCount = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const getItemIndex = (index) => (index + totalItems) % totalItems;

  const visibleSlides = [];
  for (let i = -visibleCount; i <= visibleCount; i++) {
    visibleSlides.push(getItemIndex(currentIndex + i));
  }

  return (
    <div id="testimonials_sec" className="container testimonials_sec">
      <div className="services-container__inner">
        <div className="module-divider"></div>
        <div className='testPref-container__inner text-center'>
          <div className="module-head">
            <h2 className="module-title">Over 12000+ people trust ApplyUniNow</h2>
          </div>
          <div className="carousel-wrapper">
            <button className="carousel-btn prev" onClick={prevSlide}></button>
            <div className="carousel-track">
              {visibleSlides.map((index, i) => (
                <div
                  key={i}
                  className={`carousel-item ${i === visibleCount ? 'active' : 'inactive'}`}
                >
                  <div className='carousel-item__user-details'>
                    <Image src={testimonialStore[index]?.image} width={100} height={100} alt={`item-${index}`} />
                    <div className='carousel-item__user-info'>
                      <h3>{testimonialStore[index]?.name}</h3>
                      <p>{testimonialStore[index]?.degree}</p>
                      <h4>{testimonialStore[index]?.university}</h4>
                    </div>
                  </div>
                  <div className='carousel-item__user-comment'>
                    {testimonialStore[index]?.quote}
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-btn next" onClick={nextSlide}></button>
          </div>
          <GetUserDetails ctaText={`We'd love to hear what you think!`} ctaClass={`btn primary marginT30`} />
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
