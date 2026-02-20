import React, { useState } from "react";
import { pricingData } from "../utils/helpers";
import EnquiryModal from "../modal/EnquiryModal";

const PricingCard = ({ title, price, features, desc, bgColor, cta, benefits }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={`pricing_card_item`} style={{ background: bgColor }}>
      <div className="pricing_card_item__inner">
        <div className="top_section">
          <h2>{title}</h2>
          <h2 className="plan_price">{price}</h2>
          <ul className="normal_view">
            {desc.map((feature, index) => (
              <li key={index} className="">
                - {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="mid_section">
          <ul className="list_view">
            {features.map((feature, index) => (
              <li key={index} className="">
                <span className="check-icon"></span> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom_section">
        
        <p className="benefits">{benefits}</p>
        <button className="btn" onClick={() => setModalOpen(true)}>{cta} →</button>
      </div>


      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} planTitle={title} planPrice={price}></EnquiryModal>
    </div>
  );
};

const PricingCards = () => {
  return (
    <div className="pricing_card_container">
      {pricingData.map((plan, index) => (
        <PricingCard key={index} {...plan} />
      ))}
    </div>
  );
};

export default PricingCards;
