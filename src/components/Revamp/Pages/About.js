import React from 'react';
import TopStrip from '../Common/TopStrip';
import { aboutMainContent, aboutCoreValues } from '../utils/helpers';
import CartLarge from '../Common/CartLarge';

const About = (props) => {

  const topString = 'About Us';
  return (
    <div className='test-pref-details about_us'>
      <TopStrip topInfoText={topString} />
      <div className='container xsmall-width'>
        <h4 className='under_top_strip'>Empower the global community to make informed decisions regarding their educational choices.</h4>
        <div className='card-container'>
          {aboutMainContent.map((resources, index) => (
            <CartLarge key={'cardItem_' + index} info={resources} />
          ))}
        </div>
        <div className='about_us__mid-section'>
          <h2>Our core values serve as the secret force that makes ApplyUniNow awesome!</h2>
          <p>What are the things that we bring to work with us every day?</p>
          <p>What are the principles that bolster our team and keep us focused on the mission?</p>
      </div>
      <div className='card-container'>
          {aboutCoreValues.map((resources, index) => (
            <CartLarge key={'cardItem_' + index} info={resources} />
          ))}
        </div>
    </div>
    </div >
  )
}

export default About;
