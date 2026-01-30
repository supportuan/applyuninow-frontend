import React from 'react';
import TopStrip from './TopStrip';
import CartLarge from './CartLarge';
import { countryAllData } from '../utils/helpers';

const CountryAll = () => {
    const topString = 'The world is your classroom';
  return (
    <div className='country-detail-section'>
        <TopStrip topInfoText={topString} />
        <div className='container xsmall-width'>
            <h4 className='under_top_strip'></h4>
            <div className="card-container marginT90">
                {countryAllData.map((country, index) => (
                    <CartLarge key={'cardItem_'+index} info={country} />
                ))}
            </div>
            <div className='module-divider'></div>
            <div className='career_goal_section'>
                <p>"Each study destination offers unique advantages, whether it’s the prestige of an Ivy League school in the U.S. or the industry-driven programs in Singapore. Explore your options with <span>ApplyUniNow</span>, and let us help you find the best country and university to reach your goals."</p>
                <a className='route-link' href={'/explore'}>Let’s discuss your careers goals <span>→</span></a>
            </div>
        </div>
      </div>
  )
}

export default CountryAll;
