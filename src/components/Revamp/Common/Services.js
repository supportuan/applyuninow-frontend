import React from "react";
import { services } from "../utils/helpers";
import Cart from "./Cart";
import GetUserDetails from "./GetUserDetails";

export default function Services() {
  

  return (
    <div className="container services-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>

        <div className="module-head">
          <h2 id="services" className="module-title">And <span>so much more</span></h2>
          <p className="module-subtitle">Your achievement is our success</p>
        </div>

        
        <div className="services-grid">
          {services.map((service, index) => (
            <Cart key={index} info={service} />
          ))}
        </div>

        <GetUserDetails />
      </div>
    </div>
  );
}
