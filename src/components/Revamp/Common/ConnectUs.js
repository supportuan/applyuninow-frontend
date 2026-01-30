import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { connectStore } from '../utils/helpers';
import carrow from "../../../Images/rev/control_arrow.svg";

const ConnectUs = () => {
  return (
    <div id="connect_us" className="container testPref-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Connect With Us</h2>
          </div>

          <div className='connect-container'>
            {connectStore.map((item, index) =>{
              if(index === 0){
                return (
                  <a href={'/connect'+item?.routename} key={'connect_'+index} className='connect-container__item'>
                    <h2>{item?.name}</h2>
                    <Image src={item?.icon} width={70} height={70} alt={item?.name} />
                    <div className='controls'>
                      <Image src={carrow} width={25} height={24} className='before_hover' alt='Hover' />
                      <button className='btn'>{item?.btnName}</button>
                    </div>
                  </a>
                )
              } 
              if(index === 1) {
                return(
                  <div className='connect_group' key={'group'}>
                    {connectStore.slice(1).map((subItem, subIndex) => (
                      <a href={'/connect' + subItem?.routename} key={'connect_' + (subIndex + 1)} className='connect-container__item'>
                        <h2>{subItem?.name}</h2>
                        <Image src={subItem?.icon} width={70} height={70} alt={subItem?.name} />
                        <div className='controls'>
                          <Image src={carrow} width={25} height={24} className='before_hover' alt='Hover' />
                          <button className='btn'>{subItem?.btnName}</button>
                        </div>
                      </a>
                    ))}
                  </div>
                )
              }
            }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectUs;
