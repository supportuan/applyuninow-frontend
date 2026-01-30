import React from 'react'
import { usePageContext } from '../context/PageContext';
import TopStrip from '../Common/TopStrip';
import PricingCards from '../Common/PricingCards';
import GetUserDetails from '../Common/GetUserDetails';

const Pricing = (props) => {
  const { pageLabelName } = usePageContext();
  return (
    <div className='pricing_section'>
      <TopStrip topInfoText={'Pricing'} goBackStatus={true} />
      <div className='pricing_section__inner container small-width'>
        <h4>Each package is designed to cater to diverse needs and financial constraints, enabling students to select the level of support that most aligns with their objectives and circumstances. Should you require further assistance, I am available to guide you through exploring specific services.</h4>
        <PricingCards />
        <p className='bottom_text'>The benefits associated with each study abroad service package generally correspond to the level of support and customization provided. Please refer to ApplyUniNow’s 
Terms & Conditions and Refund Policy before proceeding for validation / making the payment.</p>
      </div>
      <div className='module-divider' style={{ marginBottom: '60px' }}></div>
        <GetUserDetails />
    </div>
  )
}

export default Pricing;
