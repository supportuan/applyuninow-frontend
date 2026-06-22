import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { services } from "../utils/helpers";
import Cart from "./Cart";
import GetUserDetails from "./GetUserDetails";

const MOBILE_BREAKPOINT = 768;
const AUTO_PLAY_INTERVAL = 3500;
const CARD_WIDTH = 280;
const CARD_GAP = 16;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const isAutoScrollingRef = useRef(false);
  const isPausedRef = useRef(false);

  const getScrollOffset = useCallback((index) => {
    const container = scrollRef.current;
    if (container?.children?.[index]) {
      return container.children[index].offsetLeft - container.offsetLeft;
    }
    return index * (CARD_WIDTH + CARD_GAP);
  }, []);

  const scrollToIndex = useCallback((index, behavior = "smooth") => {
    const container = scrollRef.current;
    if (!container) return;

    isAutoScrollingRef.current = true;
    container.scrollTo({
      left: getScrollOffset(index),
      behavior,
    });
    setActiveIndex(index);

    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, behavior === "smooth" ? 500 : 0);
  }, [getScrollOffset]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || isPaused) return;

    const timer = window.setInterval(() => {
      if (isPausedRef.current) return;

      setActiveIndex((prev) => {
        const nextIndex = prev >= services.length - 1 ? 0 : prev + 1;
        const isLoopReset = nextIndex === 0 && prev === services.length - 1;
        const container = scrollRef.current;
        if (container) {
          isAutoScrollingRef.current = true;
          container.scrollTo({
            left: container.children[nextIndex]
              ? container.children[nextIndex].offsetLeft - container.offsetLeft
              : nextIndex * (CARD_WIDTH + CARD_GAP),
            behavior: isLoopReset ? "auto" : "smooth",
          });
          window.setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, isLoopReset ? 0 : 500);
        }
        return nextIndex;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isMobile, isPaused]);

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;

    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const distance = Math.abs(child.offsetLeft - container.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handleDotClick = (index) => {
    scrollToIndex(index);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="container services-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>

        <div className="module-head">
          <h2 id="services" className="module-title"><span>Designed for much more</span></h2>
          <p className="module-subtitle">Your achievement is our success</p>
        </div>

        <div className="services-grid services-desktop-only">
          {services.map((service, index) => (
            <Cart key={index} info={service} />
          ))}
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="services-horizontal-scroll services-mobile-only"
          role="list"
        >
          {services.map((service, index) => {
            const iconSrc =
              typeof service?.icon === "string"
                ? service.icon
                : service?.icon?.src || service?.icon;
            return (
              <div
                key={`${service?.title}_${index}`}
                className="service-mobile-card"
                role="listitem"
              >
                <div className="service-mobile-card__icon-wrapper">
                  {iconSrc ? (
                    <Image
                      src={iconSrc}
                      alt={service?.title || "Service"}
                      width={38}
                      height={38}
                    />
                  ) : null}
                </div>
                <h3 className="service-mobile-card__title">{service?.title}</h3>
                <p className="service-mobile-card__desc">{service?.detail || service?.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="carousel-controls services-mobile-only">
          <div className="carousel-dots-pill">
            <div className="carousel-dots">
              {services.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`carousel-dot${activeIndex === index ? " active" : ""}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                />
              ))}
            </div>
            <span className="carousel-divider" aria-hidden="true" />
            <button
              type="button"
              className="carousel-play-pause"
              onClick={togglePause}
              aria-label={isPaused ? "Play carousel" : "Pause carousel"}
            >
              {isPaused ? (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <GetUserDetails />
      </div>

      <style jsx>{`
        .services-mobile-only {
          display: none;
        }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .services-desktop-only {
            display: none !important;
          }
          .services-mobile-only {
            display: flex;
          }
          .services-horizontal-scroll {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding: 16px 20px 24px;
            width: calc(100% + 40px);
            margin-left: -20px;
            margin-right: -20px;
            margin-top: 10px;
            margin-bottom: 10px;
            box-sizing: border-box;
            scroll-padding: 20px;
          }
          .services-horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
          .services-horizontal-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .service-mobile-card {
            scroll-snap-align: start;
            flex: 0 0 280px;
            max-width: 82vw;
            background: #ffffff;
            border-radius: 20px;
            padding: 24px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            border: 1px solid rgba(30, 65, 124, 0.06);
            box-shadow: 0 8px 24px rgba(30, 65, 124, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .service-mobile-card:active {
            transform: scale(0.97);
            box-shadow: 0 4px 12px rgba(30, 65, 124, 0.03);
          }
          .service-mobile-card__icon-wrapper {
            width: 52px;
            height: 52px;
            border-radius: 14px;
            background: linear-gradient(135deg, rgba(47, 111, 235, 0.08) 0%, rgba(106, 161, 255, 0.08) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }
          .service-mobile-card__title {
            font-family: "Poppins", sans-serif;
            font-weight: 600;
            font-size: 1.05rem;
            color: #1e417c;
            margin: 0 0 10px 0;
            line-height: 1.35;
            text-align: left;
          }
          .service-mobile-card__desc {
            font-family: "Poppins", sans-serif;
            font-size: 0.86rem;
            line-height: 1.5;
            color: #555555;
            margin: 0;
            text-align: left;
          }
          .carousel-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 28px;
            width: 100%;
          }
          .carousel-dots-pill {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: rgba(0, 0, 0, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 10px 14px;
            border-radius: 999px;
          }
          .carousel-dots {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.22);
            border: none;
            padding: 0;
            cursor: pointer;
            transition: width 0.3s ease, background-color 0.3s ease, opacity 0.3s ease;
          }
          .carousel-dot.active {
            width: 22px;
            background: #1e417c;
          }
          .carousel-divider {
            width: 1px;
            height: 18px;
            background: rgba(0, 0, 0, 0.12);
            flex-shrink: 0;
          }
          .carousel-play-pause {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: none;
            background: transparent;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            transition: background-color 0.2s ease, transform 0.15s ease;
          }
          .carousel-play-pause:active {
            background: rgba(0, 0, 0, 0.08);
            transform: scale(0.94);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-dot {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
