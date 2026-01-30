import React from 'react'
import Image from 'next/image';

const Cart2 = (props) => {
    const service = props?.info;
    return (
        
        <div className="service-card2">
            <div className='service-card2__hover'></div>
            <div className="service-card2__inner">
                <div className='top'>
                    <Image src={service?.icon} className="service-card2__service-icon" alt={service?.title || service?.name} height={50} width={50} />
                    <p className="service-card2__service-text">{service?.title || service?.name}</p>
                </div>
                {service?.description ? (
                    <p className="service-card2__service-desc">{service?.description}</p>
                ) : null}
                {service?.content && service?.content?.map((item, index) => 
                    <p className="service-card2__service-desc">{item}</p>
                )}
            </div>
        </div>
       
    )
}

export default Cart2;
