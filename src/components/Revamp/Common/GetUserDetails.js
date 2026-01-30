import React, { useState } from 'react'
import EnquiryModal from '../modal/EnquiryModal'

const GetUserDetails = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="cta-section">
            {!props?.ctaText ? (
                <>
                    <h3 className="cta-title">You're one step away</h3>
                    <p className="cta-text">Register to receive your complimentary official guide - sample test and valuable tips from experts.</p>
                </>
            ) : null}
            <button className={props?.ctaClass ? props?.ctaClass : 'btn'} onClick={() => setModalOpen(true)}>{props?.ctaText ? props?.ctaText : 'Enter your details'}</button>
            <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}

export default GetUserDetails
