import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';
import { usePageContext } from '../context/PageContext';

const FAQs = () => {
  const { BASE_URL } = useAppContext();
  const [activeTab, setActiveTab] = useState("General FAQ’s");
  const [expanded, setExpanded] = useState(0);
  const [data, setData] = useState([])
  const [tabs, setTabs] = useState([])
  const { pageLabelName } = usePageContext();



  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // const handleToggle = (index) => {
  //   setExpanded(prev => ({
  //     ...prev,
  //     [index]: !prev[index]
  //   }));
  // };

  useEffect(() => {

    setExpanded(0);

    let cname = 'HOME'
    const pathname = window.location.pathname;
    const arr = pathname.split('/');
    if(arr.length>2 && arr[2]!=''){
      cname = arr[2].toUpperCase()
    }
    if(cname=='USA') cname = 'UNITED STATES OF AMERICA';
    if(cname=='UK') cname = 'UNITED KINGDOM';
    getStudyArea(cname)

  }, [activeTab]);

  const getStudyArea = async (cname) => { 
    const url = `${BASE_URL}/faqs/countries`;
    const res = await api.post(url,{country_name:cname});
    const Data = res?.data?.data;
    if(cname=='HOME'){
      setData(setFaqTabWise(Data))
    }else{
      setData({'General FAQ’s':Data});
    }

  }

  const setFaqTabWise = (data) =>{
    const tabsArr = []
    const grouped = data.reduce((acc, item) => {
      const key = item.category_name;
      if (!tabsArr.includes(key)) {
        tabsArr.push(key);
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    setTabs(tabsArr)
    return grouped;
  }

  

  return (
    <div id="faqs_section" className="container testPref-container">
      <div className="services-container__inner faqs_section">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Frequently asked questions</h2>
            {pageLabelName == 'homepage' ? (
            <p className="module-subtitle">Everything you need to know about ApplyUniNow</p>
          ) : null}
          </div>
          <div className="faq-container">
            <div className="faq-container__tabs">
              {tabs.map((tab, index) => ( 
                <button
                  key={'tab_'+index}
                  className={`faq-container__tabs--tab ${activeTab === tab ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} 
                </button>
              ))}
            </div>

            {data[activeTab] && 
              data[activeTab].map((item, index) => ( 
              <div key={'ques_'+index}
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
  )
}

export default FAQs
