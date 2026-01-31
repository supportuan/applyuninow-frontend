import React from 'react'
import TopStrip from './TopStrip';
import CategoryGrid from './CategoryGrid';
import { industry_categories } from '../utils/helpers';


const GraduateCourses = () => {
    const topString = '3,43,000+ graduate courses to choose from 9 study destinations';

    return (
        <div className='graduate-courses-section'>
            <TopStrip topInfoText={topString} />
            <div className='hero_section'>
                {/* <span className='hero_section__bg'></span> */}

                <div className='hero_section__inner'>
                    <div className='container small-width pad-mob-none'>
                        <h2 className='page-heading'>Choose Your Future</h2>
                        <div className="grid-container">
                            <CategoryGrid categoryDetails={industry_categories} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraduateCourses;
