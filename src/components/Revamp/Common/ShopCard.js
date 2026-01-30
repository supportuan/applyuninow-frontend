import Image from 'next/image';
import React, { useState } from 'react'
import InfoModal from '../modal/InfoModal';

const ShopCard = ({ product, isSelected, onSelect }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const statement = "Our payment gateway is currently under development and will be launching soon. Stay tuned!";
    const handleBuy = () => {
        setShowSuccess(true);
    }
    return (
        <div className="product-card">
            <div className="image-container">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(product.id)}
                    className="select-checkbox"
                />
                <Image src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <div className=''>
                    <h3>{product.title}</h3>
                    <p>₹{product.price.toLocaleString()}</p>
                </div>
                <button onClick={handleBuy} className="buy-now">Buy Now</button>
                {showSuccess && <InfoModal message={statement} onClose={() => setShowSuccess(false)} />}
            </div>
        </div>
    );
}

export default ShopCard
