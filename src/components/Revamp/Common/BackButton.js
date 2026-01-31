import React from 'react';
import { useRouter } from 'next/router';

const BackButton = (props) => {
  const router = useRouter();

  const goBack = () => {
    props?.backLink ? router.push(props?.backLink) : router.back(); 
  };
  return (
      <button onClick={goBack} className='goback_btn'></button>
    );
};

export default BackButton;
