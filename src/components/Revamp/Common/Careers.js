import React from 'react';
import TopStrip from './TopStrip';
import ClothCart from './ClothCart';

const Careers = (props) => {

  const topString = 'Careers';
  const statement = "There are no current openings available at the moment.";
  return (
    <div className='careers-section'>
      <TopStrip topInfoText={topString} goBackStatus={true} />
      <div className='container small-width'>
        <div className='module-head'>
          <h2 className='page-heading text-center'>Current Openings</h2>
          <p className='module-subtitle'>Explore our current job openings and embark on an exciting career journey with us. Join our team and make a difference!</p>
        </div>
        <div className='container small-width'>
          <ClothCart info={statement} />
        </div>
      </div>
    </div>
  )
}

export default Careers;
