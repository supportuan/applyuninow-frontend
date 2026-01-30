import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { reasonForData } from '../utils/helpers';

const ReasonsForCountry = (props) => {

  const data = props?.reasonInfo;
  const [reasons, setReasons] = useState();

  useEffect(() => {
    if(data){
      setReasons(data);
    }
  }, [data]);

  return (
    <section className='container min-width reason_for_country'>
      <h2>Reasons for Choosing <span>{reasons?.title}</span></h2>
      <div className="services-grid">
        {reasons?.reasonChoosing?.map((item, index) => (
          <Cart key={index} info={item} />
        ))}
      </div>
    </section>
  );
}

export default ReasonsForCountry;
