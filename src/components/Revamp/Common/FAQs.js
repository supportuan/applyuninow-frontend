
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';
import { usePageContext } from '../context/PageContext';

const FAQs = () => {
  const { BASE_URL } = useAppContext();
  const [activeTab, setActiveTab] = useState("General FAQ's");
  const [expanded, setExpanded] = useState(0);
  const [data, setData] = useState({});
  const [tabs, setTabs] = useState([]);
  const [error, setError] = useState(false);
  const { pageLabelName } = usePageContext();



  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const setFaqTabWise = (faqData) => {
    const tabsArr = [];
    const grouped = faqData.reduce((acc, item) => {



































      const key = item.category_name;
      if (!tabsArr.includes(key)) {
        tabsArr.push(key);
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    setTabs(tabsArr);
    return grouped;
  };

  const getStudyArea = useCallback(async (cname) => {
    try {
      setError(false);
      const url = `${BASE_URL}/faqs/countries`;
      const res = await api.post(url, { country_name: cname });
      const Data = res?.data?.data;
      if (!Data || !Array.isArray(Data)) {
        console.warn('FAQs: No data returned from API');
        setError(true);
        return;
      }
      if (cname === 'HOME') {
        setData(setFaqTabWise(Data));
      } else {
        setData({ "General FAQ's": Data });
      }
    } catch (err) {
      console.warn('FAQs: Failed to fetch data', err?.message);
      setError(true);
    }
  }, [BASE_URL]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setExpanded(0);

    let cname = 'HOME';
    const pathname = window.location.pathname;
    const arr = pathname.split('/');
    if (arr.length > 2 && arr[2] !== '') {
      cname = arr[2].toUpperCase();
    }
    if (cname === 'USA') cname = 'UNITED STATES OF AMERICA';
    if (cname === 'UK') cname = 'UNITED KINGDOM';
    getStudyArea(cname);
  }, [activeTab, getStudyArea]);

  return (
    <div id="faqs_section" className="container testPref-container">
      <div className="services-container__inner faqs_section">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Frequently asked questions</h2>
            {pageLabelName === 'homepage' ? (
              <p className="module-subtitle">Everything you need to know about ApplyUniNow</p>
            ) : null}
          </div>
          <div className="faq-container">
            <div className="faq-container__tabs">
              {tabs.map((tab, index) => (
                <button
                  key={'tab_' + index}
                  className={`faq-container__tabs--tab ${activeTab === tab ? "active" : ""}`}

                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {error ? (
              <p style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                Unable to load FAQs at the moment. Please try again later.
              </p>
            ) : data[activeTab] &&
              data[activeTab].map((item, index) => (
              <div
                key={'ques_' + index}
                className={`ques-ans-container ${expanded === index ? "expanded" : ""}`}
              >
                <h2 className="question" onClick={() => handleToggle(index)}>
                  {item?.query}
                </h2>
                <p className={`answer ${expanded === index ? "open" : "close"}`}>{item?.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;