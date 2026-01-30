import React from 'react'
import { testPrefOptions } from './utils/helpers';
import Link from 'next/link';

const TestPref = () => {

  return (
    <div id="test_pref" className="container testPref-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Test preferences</h2>
            <p className='module-subtitle'>These assessments evaluate your English language proficiency, a crucial requirement for non-native English speakers applying to universities, in conjunction with additional evaluations.</p>
          </div>
          <div className="color-card-container">
            {testPrefOptions.map((item, index) => {
              if (!item?.href) {
                console.warn('Missing href in item:', item);
                return null; 
              }

              return (
                <a
                  href={'/testpref/' + item.href}
                  key={'test_pref_' + index}
                  className="color-card-container__item"
                >
                  <h2>{item?.title}</h2>
                  <div className="color-card-container__item--details">
                    {item?.details?.map((subItem, inndex) => (
                      <p key={'details_' + inndex + '_' + item.href}>
                        <span>{subItem?.short}</span> {subItem?.full}
                      </p>
                    ))}
                  </div>
                  <div className="arrow">→</div>
                </a>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TestPref;
