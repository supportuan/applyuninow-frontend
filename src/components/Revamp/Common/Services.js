import React, { useState } from "react";
import Image from "next/image";
import { services } from "../utils/helpers";
import Cart from "./Cart";
import GetUserDetails from "./GetUserDetails";

const MOBILE_BREAKPOINT = 768;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle(index);
    } else if (event.key === "Escape") {
      setActiveIndex(null);
    }
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

        <div className="services-vertical services-mobile-only" role="list">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            const iconSrc =
              typeof service?.icon === "string"
                ? service.icon
                : service?.icon?.src || service?.icon;
            return (
              <button
                type="button"
                key={`${service?.title}_${index}`}
                className={`service-card-v${isActive ? " is-active" : ""}`}
                onClick={() => handleToggle(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-expanded={isActive}
                aria-label={service?.title}
                role="listitem"
              >
                <div className="service-card-v__head">
                  <div className="service-card-v__icon">
                    {iconSrc ? (
                      <Image
                        src={iconSrc}
                        alt={service?.title || "Service"}
                        width={40}
                        height={40}
                      />
                    ) : null}
                  </div>
                  <p className="service-card-v__title">{service?.title}</p>
                  <span className="service-card-v__chevron" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
                <div className="service-card-v__desc" aria-hidden={!isActive}>
                  <p>{service?.detail || service?.desc}</p>
                </div>
              </button>
            );
          })}
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
        }
        .services-vertical {
          flex-direction: column;
          gap: 12px;
          width: 100%;
          margin: 20px auto 28px;
        }
        .service-card-v {
          position: relative;
          width: 100%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 14px;
          background: #fff;
          padding: 0;
          cursor: pointer;
          text-align: left;
          font: inherit;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.25s ease, background-color 0.25s ease,
            border-color 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }
        .service-card-v::before {
          content: "";
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 12px;
          width: 3px;
          border-radius: 3px;
          background: linear-gradient(180deg, #2f6feb 0%, #6aa1ff 100%);
          transform: scaleY(0);
          transform-origin: top center;
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .service-card-v.is-active::before {
          transform: scaleY(1);
        }
        .service-card-v:focus-visible {
          outline: 2px solid #2f6feb;
          outline-offset: 2px;
        }
        .service-card-v.is-active {
          background: linear-gradient(135deg, #f5f8ff 0%, #ffffff 100%);
          border-color: rgba(47, 111, 235, 0.35);
          box-shadow: 0 8px 22px rgba(47, 111, 235, 0.12);
        }
        .service-card-v__head {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
        }
        .service-card-v__icon {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .service-card-v__title {
          flex: 1;
          font-size: 0.96rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
        }
        .service-card-v__chevron {
          flex: 0 0 32px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #2f6feb;
          background: rgba(47, 111, 235, 0.08);
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
            background-color 0.25s ease, color 0.25s ease,
            box-shadow 0.25s ease;
        }
        .service-card-v__chevron svg {
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .service-card-v:hover .service-card-v__chevron {
          background: rgba(47, 111, 235, 0.14);
        }
        .service-card-v.is-active .service-card-v__chevron {
          background: linear-gradient(135deg, #2f6feb 0%, #6aa1ff 100%);
          color: #fff;
          box-shadow: 0 6px 14px rgba(47, 111, 235, 0.35);
        }
        .service-card-v.is-active .service-card-v__chevron svg {
          transform: rotate(-180deg);
        }
        .service-card-v__desc {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease 0.05s,
            padding 0.3s ease;
          padding: 0 16px;
        }
        .service-card-v__desc p {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
          color: #444;
        }
        .service-card-v.is-active .service-card-v__desc {
          max-height: 600px;
          opacity: 1;
          padding: 0 16px 16px 16px;
        }
      `}</style>
    </div>
  );
}
