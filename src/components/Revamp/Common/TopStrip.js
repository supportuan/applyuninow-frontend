import React, { useEffect } from 'react'
import BackButton from './BackButton'
import { usePageContext } from '../context/PageContext';

const TopStrip = (props) => {
  const {deviceType} = usePageContext();

  useEffect(() => {
    if(props?.type){
      document.querySelector('body')?.attributes?.class ? document.querySelector('body')?.attributes?.removeNamedItem('class') : '';
      document.querySelector('body')?.classList?.add(props?.type);
    }
  },[props]);
  
  return (
    <React.Fragment>
      <div className='container max-width top_strip'>
          <div className='top_strip__inner'>
              <h1>{props ? props?.topInfoText : ''}</h1>
          </div>
      </div>
      {!props?.goBackStatus && (deviceType !== 'mobile') ? (
      <div className='container small-width hide'>
        <BackButton backLink={props?.gobackLink ? props?.gobackLink : ''} />
      </div>
      ): null}
    </React.Fragment>
  )
}

export default TopStrip
