import React from 'react';
import TopStrip from './TopStrip';
import { connectTypeDetails } from '../utils/helpers';
import GetUserDetails from './GetUserDetails';
import Cart2 from './Cart2';
import { useRouter } from 'next/router';
import SearchData from './SearchData';

const ConnectDetails = (props) => {

  const router = useRouter();
  const { typeId } = router.query;
  const testJson = {
    'student': 'Student',
    'recruiter': 'Recruiter',
    'schools': 'Schools',
  }
  const topString = 'Connect With Us - ' + testJson[typeId];

  return (
    <div className='test-pref-details'>
      <TopStrip topInfoText={topString} type={`connect-${testJson[typeId]}`} />
      <div className='container small-width'>
        {typeId === 'student' ? (
          <>
            <h4 className="content_under_strip">
              Have you thought about studying abroad? If you have, we’d be more than happy to help you find some options or answer any questions you might have!
            </h4>
            <p className="content_strip">Studying abroad offers a profound opportunity for personal development, career progression, and cultural immersion. Here are some compelling reasons why:</p>

          </>
        ) : null}
        {typeId === 'recruiter' ? (
          <>
            <p className="content_under_strip">Embark on a Global Student Recruitment Journey with Our Proven Platform.<br />
              Elevate your international student enrollment strategies with our comprehensive platform, meticulously designed to facilitate seamless global student mobility.<br />
              Trusted by over 1000+ institutions globally, our platform offers unparalleled advantages for both students and institutions.</p>

          </>
        ) : null}

        {typeId === 'schools' ? (
          <>
            <p className="content_under_strip">Global universities and educational institutions can collaborate with your company to establish in-country partnerships for study abroad services, resulting in substantial benefits for both parties. Here are some key advantages of such collaborations:</p>
          </>
        ) : null}



        {connectTypeDetails[typeId]?.sections.map((item, index) =>
          <>
            <div className={`module-head ${item?.addComponent ? 'search-section' : ''}`}>
              {item?.section && <h2 className="module-title">{item?.link ? <a href={item?.link}>{item?.section}</a> : item?.section}</h2>}
              {item?.addComponent && (
                <>
                  <p>OR</p>
                  <SearchData />
                </>
              )}
              {item?.title && <p className="module-subtitle">{item?.title}</p>}
            </div>
            <div className={`services-grid connect_wid_us ${testJson[typeId]+'_'+index}`}>
              {item?.items?.map((sitem, iidex) =>
                <Cart2 info={sitem} key={iidex} />
              )}
            </div>
          </>
        )}

        <div className='module-divider' style={{ marginBottom: '60px' }}></div>
        <GetUserDetails />
      </div>
    </div>
  )
}

export default ConnectDetails;
