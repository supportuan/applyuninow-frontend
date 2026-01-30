import React, { useState } from 'react'
import TopStrip from '../Common/TopStrip';
import ClothCart from '../Common/ClothCart';
import ShopCard from '../Common/ShopCard';
import { shop_products } from '../utils/helpers';

const Shop = () => {
  const topString = 'Shop';
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className='shop-detail-section'>
      <TopStrip topInfoText={topString} goBackStatus={true} />
      <div className='container small-width'>

        <div className="cart-info">
          <div className='cart-length'>
          🛒 <span>{selectedItems.length}</span></div>
          <button className="checkout-btn">Check Out</button>
        </div>
        <div className="product-grid">
          {shop_products.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              isSelected={selectedItems.includes(product.id)}
              onSelect={toggleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shop;
