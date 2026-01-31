import React, { useEffect } from 'react'
import TopStrip from '../Common/TopStrip';
import { resourcePgaeContent } from '../utils/helpers';
import TopContainer from '../Common/TopContainer';
import CartLarge2 from '../Common/CartLarge2';
import GetUserDetails from '../Common/GetUserDetails';

const Resources = () => {
    const topString = 'Visas';
    useEffect(() => {
    }, []);
    return (
        <div className='country-detail-section'>
            <TopStrip topInfoText={topString} goBackStatus={true} />
            <div className='container small-width'>
                <h4 className='under_top_strip'>Employ our meticulously crafted and industrial prototypes to elevate your overseas applications, ensuring clarity, coherence, and a compelling narrative. We are committed to assisting you in making the most suitable decision for your requirements.
                </h4>
                <div className='resource-page-container'>
                    <div className='bottom_container'>
                        {resourcePgaeContent.slice(1, 4).map((resources, index) => (
                            <CartLarge2 key={'cardItem_' + index} info={resources} />
                        ))}
                    </div>
                    
                    <div className="module-divider"></div>
                    <div className='top_container'>
                        {resourcePgaeContent.slice(0, 1).map((resources, index) => (
                            <TopContainer key={'cardItem_' + index} info={resources} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='module-divider' style={{ marginBottom: '60px' }}></div>
        <GetUserDetails />
        </div>
    )
}

export default Resources;
