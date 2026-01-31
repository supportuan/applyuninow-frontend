import React from 'react'
import TopStrip from './Common/TopStrip';
import { testPrefsDetails } from './utils/helpers';
import CartLarge from './Common/CartLarge';
import { useRouter } from 'next/router';
import GetUserDetails from './Common/GetUserDetails';

const TestPrefDetails = (props) => {

  const router = useRouter();
  const {prefId} = router.query;

  const testJson = {
    'adaptive': 'Adaptive',
    'language_test': 'English Language Test',
  }
  const topString = 'Test Preferences - '+testJson[prefId];

  return (
    <div className='test-pref-details'>
        <TopStrip topInfoText={topString} type={`test-pref-${prefId}`} />
        <div className='container xsmall-width'>
          <h4 className='under_top_strip'>{testPrefsDetails[prefId]?.description}</h4>
          <div className="card-container">
                {testPrefsDetails[prefId]?.tests.map((resources) => (
                    <CartLarge key={'cardItem_'+resources?.id} info={resources} />
                ))}
            </div>
            <GetUserDetails ctaText={"Schedule your call now"} ctaClass={"btn primary marginT70"} />
        </div>
    </div>
  )
}

export default TestPrefDetails;
