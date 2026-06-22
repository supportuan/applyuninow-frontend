import React from 'react';
import { industry_categories } from '../utils/helpers';
import CategoryGrid from './CategoryGrid';


const IndustryList = () => {
    return (
        <div className="container services-container">
            <div className="services-container__inner">
                {/* <div className="module-divider"></div> */}

                <div className="module-head pad0">
                    <h2 className="module-title industry-hero-title">more power, more magic, more you</h2>
                    <p className="module-subtitle"> We offer 3,43,000+ career upskilling study options to choose from the popular study destinations</p>
                </div>
                <div className='container small-width pad-mob-none'>
                    <div className="grid-container">
                        <CategoryGrid categoryDetails={industry_categories} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndustryList
