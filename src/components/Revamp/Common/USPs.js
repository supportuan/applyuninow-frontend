import React from 'react';
import { uspStatsData } from '../utils/helpers';
import Image from 'next/image';
const USPs = () => {
  return (
    <div id="usps" className="container testPref-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Strengths & Expertise</h2>
          </div>
          <div className='usps-container'>
            {uspStatsData.map((item, index) => 
              <div className='usps-container__item' key={'usp_'+index}>
                <Image src={item?.icon} width={70} height={70} alt={item?.label} />
                <p className='num'>{item?.number}</p>
                <h4>{item?.label}</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default USPs
