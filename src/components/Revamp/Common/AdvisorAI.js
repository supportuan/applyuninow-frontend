import React from 'react'
import TopStrip from './TopStrip'

const AdvisorAI = () => {
    const topString = 'AI Student Advisor';
  return (
    <div className='test-pref-details'>
        <TopStrip topInfoText={topString} goBackStatus={false} />
        <div className='static__container container min-width'>
            <p>Welcome to ApplyUniNow</p>
        </div>
    </div>
  )
}

export default AdvisorAI
