import React from 'react'
import Image from 'next/image';

const Cart = (props) => {
    const service = props?.info;
    return (
        
        <div className="service-card">
            <div className="service_without_animate">
                <Image src={service?.icon} className="service-icon" alt={service?.title} height={60} width={60} />
                <p className="service-text">{service.title}</p>
            </div>
            <div className="service_animate">
                {/* <p className="service-text">{service.title}</p> */}
                <p className="service-desc">{service.detail || service.desc}</p>
            </div>

        </div>
       
    )
}

export default Cart;
