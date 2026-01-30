import React, { useEffect } from 'react'
import TopStrip from './TopStrip';
//import { useParams } from 'react-router-dom';
import GetUserDetails from './GetUserDetails';
import { useRouter } from 'next/router';

const ResourceDetail = () => {
  const router = useRouter();
  const {resourceId} = router.query;
  const topString = `Resources - ${resourceId}`;

  return (
    <div className='country-detail-section'>
        <TopStrip topInfoText={topString} type={`resources-${resourceId}`} />
        <div className='container min-width'>
            <div className='para-details'>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..</p>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..</p>
            </div>
            <div className='module-divider' style={{marginBottom:'60px'}}></div>
            <GetUserDetails />
        </div>
    </div>
  )
}

export default ResourceDetail;
