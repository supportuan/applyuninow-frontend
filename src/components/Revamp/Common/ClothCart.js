import React from 'react'

const ClothCart = (props) => {
    const msg = props?.info;
    return (
        <div className='shop-section'>
            <div class="grid-container">
                <div class="grid_item norecord">
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default ClothCart
