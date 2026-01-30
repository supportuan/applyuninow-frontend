import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import TopStrip from './Common/TopStrip';
import { testPrefUniqueDetails } from './utils/helpers';
import Cart2 from './Common/Cart2';
import GetUserDetails from './Common/GetUserDetails';

const TestPrefUniqueDetails = () => {
  const router = useRouter();
  const {prefId, prefSubId} = router.query;

  const testJson = {
    'adaptive': 'Adaptive',
    'language_test': 'English Language Test',
  }
  const topString = 'Test Preferences - '+testJson[prefId];

  useEffect(() => {
    console.log(testPrefUniqueDetails[prefSubId]);
  }, [prefSubId]);

  return (
    <>
    <div className='test-pref-details'>
      <TopStrip topInfoText={testPrefUniqueDetails[prefSubId]?.title} type={`test-pref-${prefId}`} />
      <div className='container xsmall-width'>
        <h4 className='under_top_strip'>{testPrefUniqueDetails[prefSubId]?.mainDesc}</h4>
        {testPrefUniqueDetails[prefSubId]?.sections.map((item, index) => 
          <>
            {item?.heading ? (
            <div className="module-head" key={'module_'+index}>
              <h2 className="module-title" key={'title_'+index}>{item?.heading}</h2>
              {item?.description && <p key={'subtitle_'+index} className="module-subtitle">{item?.description}</p>}
            </div>
            ) : null}


            {item?.items ? (
              <div className='services-grid services-grid2' key={'grid_'+index}>
                {item?.items?.map((sitem, iidex) => 
                  <Cart2 info={sitem} key={'kk_'+iidex}/>
                )}
              </div>
            ) : null}


            {item?.scoring ? (
              <div key={'scroring'+index} className={`scoring-grid score_val_${item?.types?.length}`}>
                <div className=''>

                  <ul className='score_head'>
                    {item?.types?.map((sitem, iidex) => 
                      <li key={iidex}>{sitem}</li>
                    )}
                  </ul>

                  <ul>
                    {item?.scoring?.map((sitem, iidex) => 
                      <>
                        <li className='' key={'band_'+iidex}>{sitem?.band}</li>
                        {sitem?.description && <li className='' key={'band_'+iidex}>{sitem?.description}</li>}
                        {sitem?.time && <li className='' key={'band_'+iidex}>{sitem?.time}</li>}
                        {sitem?.questions && <li className='' key={'band_'+iidex}>{sitem?.questions}</li>}
                        <li className='' key={'band_'+iidex}>{sitem?.skill}</li>
                      </>
                    )}
                  </ul>
                </div>

                <p className='under_top_strip'>
                {item?.note && item?.note.map((sitem, iidex) =>
                    <span key={'check_'+iidex}>{sitem}</span>
                )}
              </p>
              </div>
            ) : null}
              {item?.checklist &&
                <div className='checklist_content'>
                  {item?.checklist && item?.checklist.map((sitem, iidex) =>
                      <p className='under_top_strip' key={'check_'+iidex}>{sitem}</p>
                  )}
                </div>
              }
          </>
        )}
      </div>
    </div>
    <div className='module-divider' style={{ marginBottom: '60px' }}></div>
    <GetUserDetails />
    </>
  )
}

export default TestPrefUniqueDetails;
