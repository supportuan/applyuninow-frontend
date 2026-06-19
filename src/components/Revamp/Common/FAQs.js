
import React, { useEffect, useMemo, useState } from 'react';
import { usePageContext } from '../context/PageContext';

const FAQ_DATA = [
  // ---------------- General ----------------
  {
    category_name: 'General',
    query: 'What services does ApplyUniNow provide to aspiring international students?',
    solution:
      "ApplyUniNow is your one-stop shop for all your university application needs. They've got you covered with career counseling, university shortlisting assistance, application guidance, test preparation, visa guidance, education loan assistance, pre-departure and post arrival support.",
  },
  {
    category_name: 'General',
    query: 'Which countries does ApplyUniNow specialize in for overseas education?',
    solution:
      "We've got you covered with expert advice on the best study spots: the US, the UK, Ireland, Switzerland, Sweden, the Netherlands, Germany, Australia, and Canada.",
  },
  {
    category_name: 'General',
    query: 'Does ApplyUniNow charge a consultation fee for its services?',
    solution:
      "ApplyUniNow offers both free and paid consultation packages, depending on how much support you need. Just let us know what you're looking for and we'll send you a personalized quote!",
  },
  {
    category_name: 'General',
    query: 'Can ApplyUniNow assist me even if I am uncertain about selecting a course or country?',
    solution:
      'Absolutely! Our certified counselors provide personalized advice based on your academic background, career goals, and financial situation to help you make informed choices.',
  },
  {
    category_name: 'General',
    query: 'How experienced is ApplyUniNow in handling international student applications?',
    solution:
      'ApplyUniNow has been helping students get into top universities around the world for years, covering at least 5,000+ applications.',
  },
  {
    category_name: 'General',
    query: 'Does ApplyUniNow provide support after admission as well?',
    solution:
      "Certainly! We've got you covered with pre-departure briefings, accommodation support, travel assistance, and all the guidance you need to settle into your new home abroad.",
  },

  // ---------------- Study Abroad ----------------
  {
    category_name: 'Study Abroad',
    query: 'How can I select the appropriate country and university for my academic pursuits?',
    solution:
      "Our certified counselors are here to help you figure out the best school for you. We'll help you set your academic goals, figure out how much money you can afford, and explore different career paths. We'll also help you find job opportunities after graduation.",
  },
  {
    category_name: 'Study Abroad',
    query: 'What are the primary intake requirements for universities located abroad?',
    solution:
      "Most universities have two main intakes: Fall (August/September) and Spring (January/February). Some schools also offer summer intakes. We'll do our best to match your dream career with the recruitment cycles - campus placements.",
  },
  {
    category_name: 'Study Abroad',
    query: 'Are entrance exams such as IELTS, TOEFL, GRE, or GMAT necessary?',
    solution:
      "Certainly, English proficiency tests and other standardized exams might be needed, depending on the country and course. But don't worry, we've got your back! We offer guidance and coaching services to help you ace those exams.",
  },
  {
    category_name: 'Study Abroad',
    query: 'Is it permitted to engage in part-time employment while pursuing studies at an international university?',
    solution:
      'Most countries allow you to work part-time during school breaks. The most you can work each week is usually 20 hours. And you can usually work full-time during school breaks.',
  },
  {
    category_name: 'Study Abroad',
    query: 'Are online or hybrid courses offered by universities to non-immigrant students?',
    solution:
      "Typically, full-time and on-campus courses are the only ones that qualify for student visas. We'll help you pick a visa-compliant program if you need one. But we can also give you info on how to stay compliant and find a job after you finish your studies.",
  },
  {
    category_name: 'Study Abroad',
    query: 'How should I select the appropriate country for my academic pursuits?',
    solution:
      'Think about your past studies, what you want to study in the future, how much money you can afford, how likely it is to get a visa, and what kind of jobs you might find after you graduate.',
  },
  {
    category_name: 'Study Abroad',
    query: 'Which academic disciplines are most popular among students seeking to study abroad?',
    solution:
      'STEM, Business, Healthcare, Computer Science, and Arts & Humanities are among the most sought-after courses.',
  },

  // ---------------- Visa Processing ----------------
  {
    category_name: 'Visa Processing',
    query: 'What are the required documents for a student visa?',
    solution:
      "Here are the usual things you'll need to apply: an offer letter, proof of money, school records, a passport, a visa application form, and English test scores. But it's always a good idea to check with the school or the visa office to see if they need anything else and we can be confidently assistive as required.",
  },
  {
    category_name: 'Visa Processing',
    query: 'How long does the visa application process typically take?',
    solution:
      "Just a heads up, processing times can vary a lot depending on where you live. So, it's best to plan ahead, because the application process can take anywhere from two weeks to several months.",
  },
  {
    category_name: 'Visa Processing',
    query: 'Does ApplyUniNow assist with visa interview preparation?',
    solution:
      'Absolutely! We provide mock interview prep and expert advice to boost your visa chances.',
  },
  {
    category_name: 'Visa Processing',
    query: 'Can I include dependents on my student visa?',
    solution:
      "Some countries, like the UK, Canada, and Australia, let dependents, especially for postgrad students with limited research courses. But remember, visa rules can change a lot depending on the country and what you're doing there.",
  },
  {
    category_name: 'Visa Processing',
    query: 'What are the prevalent reasons for student visa rejection?',
    solution:
      'Here are some common reasons why student visas might get rejected: not enough money, unclear goals, not enough proof on supporting the application made, or not doing well in the interview.',
  },
  {
    category_name: 'Visa Processing',
    query: 'Will I receive a refund if my visa application is rejected?',
    solution:
      "Universities might give back your tuition money (except for administrative fees). But this depends on the institution's refund policy and immigration rules. However, visa application fees are usually non-refundable.",
  },
  {
    category_name: 'Visa Processing',
    query: 'How can I choose the country and course for my higher studies?',
    solution:
      "When choosing a country to study in, think about these things:\n\n• What do you want to study? Make sure the country you pick has what you're looking for.\n• How much money do you have? Think about the cost of living, tuition fees, and anything else you'll need to pay for your studies.\n• How easy is it to get a visa? Research the visa requirements and how well people usually get them.\n• What can you do after you finish your studies? Find out about the job opportunities and restrictions.",
  },

  // ---------------- Application Process ----------------
  {
    category_name: 'Application Process',
    query: 'When should I begin applying to universities?',
    solution:
      'Ideally, start applying about 10-12 months before you want to start school. This gives you plenty of time to take the tests, get the documents you need, and have your application processed.',
  },
  {
    category_name: 'Application Process',
    query: 'What documents are required for university applications?',
    solution:
      "To apply for these highly professional courses, you'll need to submit your academic transcripts, statement of purpose, letters of recommendation, updated curriculum vitae, test scores, and passport. But if you have any other relevant information or documentation, feel free to share it too for quicker response from institutions' admission team.",
  },
  {
    category_name: 'Application Process',
    query: 'Do universities conduct interviews during the application process?',
    solution:
      "Some programs, especially those offering executive MBA or specialized master's degrees, might ask you to have an interview as part of the application process.",
  },
  {
    category_name: 'Application Process',
    query: 'How many universities can I apply to through ApplyUniNow?',
    solution:
      'Feel free to apply to as many universities as you like! We suggest applying to between five and eight universities that match your profile and preferences.',
  },
  {
    category_name: 'Application Process',
    query: 'Can ApplyUniNow assist with SOPs and LORs?',
    solution:
      'Absolutely! Our experts are here to help you create top-notch SOPs and LORs that perfectly match your target universities.',
  },
  {
    category_name: 'Application Process',
    query: 'How can I monitor the status of my application?',
    solution:
      "ApplyUniNow offers a 100% digital and transparent application process through our student portal. We've got dedicated counselors on hand to guide you every step of the way, and we'll keep you updated on all the latest developments.",
  },
  {
    category_name: 'Application Process',
    query: 'Are there application fees for overseas universities?',
    solution:
      "Most universities charge an application fee, usually between $50 and $150 per application. This can vary depending on the university and the course you're applying for. But hey, some places might waive the fee during certain times.",
  },

  // ---------------- Study Destination ----------------
  {
    category_name: 'Study Destination',
    query: 'Which study destination provides the most favorable post-study employment opportunities?',
    solution:
      'Many countries, like the USA, UK, Canada, Australia, and Germany, have great opportunities for post-study work and clear paths to permanent residency.',
  },
  {
    category_name: 'Study Destination',
    query: 'How do living expenses differ across study destinations?',
    solution:
      "Living expenses can differ a lot. Germany and Sweden are more budget-friendly, while Australia, the UK, and the US have higher costs. We've got you covered with our budgeting advice to help you make the most of your money.",
  },
  {
    category_name: 'Study Destination',
    query: 'What is the medium of instruction in universities abroad?',
    solution:
      "All the countries we serve offer English courses, especially at top universities. And here's the thing: these universities often want to see proof that you can speak English. They might even ask you to take an additional English test score or schedule an English assessment.",
  },
  {
    category_name: 'Study Destination',
    query: 'Are there cultural or lifestyle differences I should anticipate?',
    solution:
      'Absolutely! Embracing a new culture is a must. ApplyUniNow has got you covered with pre-departure sessions to help you settle in and make the most of your new adventure.',
  },
  {
    category_name: 'Study Destination',
    query: 'Can I change my course or university after reaching my study destination?',
    solution:
      'In certain countries, it is possible to switch courses or universities, but this must be done under specific visa and academic conditions.',
  },
  {
    category_name: 'Study Destination',
    query: 'Is health insurance mandatory while studying abroad?',
    solution:
      'Yes, most countries mandate student health insurance, either provided by the university or purchased separately. We provide guidance in selecting appropriate plans.',
  },
  {
    category_name: 'Study Destination',
    query: 'Is it feasible for international students to secure part-time employment?',
    solution:
      'International students in most study destinations can find part-time jobs in cool places like retail, hospitality, and even on-campus.',
  },
  {
    category_name: 'Study Destination',
    query: 'Can I obtain permanent residency in a country after completing my studies?',
    solution:
      'Many countries have ways to stay permanently after you study there through work visas or special immigration programs. However, this may be subject to eligibility.',
  },

  // ---------------- Scholarships ----------------
  {
    category_name: 'Scholarships',
    query: 'What are the various types of scholarships available to international students?',
    solution:
      'Scholarships come in all shapes and sizes, from merit-based to need-based, program-specific to government-funded, and even country-specific.',
  },
  {
    category_name: 'Scholarships',
    query: 'Can ApplyUniNow assist me in applying for scholarships?',
    solution:
      "Absolutely! We're here to help you find scholarships, walk you through the application process, and get you all the documents you need.",
  },
  {
    category_name: 'Scholarships',
    query: 'What are the criteria for scholarships?',
    solution:
      'Criteria usually include being smart, being a leader, doing cool stuff outside of school, and needing help with money.',
  },
  {
    category_name: 'Scholarships',
    query: 'What documents are typically required for the application of a scholarship?',
    solution:
      'Most applications need your academic transcripts, a Statement of Purpose (SOP), Letters of Recommendation (LORs), proof of income (if you need it), and a Curriculum Vitae (CV) or resume. But some institutions might ask for extra info that could help them understand you better.',
  },
  {
    category_name: 'Scholarships',
    query: 'Do scholarships also cover living expenses?',
    solution:
      'Some scholarships are like a golden ticket, paying for everything from tuition to living expenses and even travel. Others are more like a partial ticket, covering some of these costs but not all.',
  },
  {
    category_name: 'Scholarships',
    query: 'Are scholarships renewable annually during the duration of study?',
    solution:
      'Scholarships can be one-time gifts or yearly renewals, as long as the student keeps up with their studies and follows the rules. However, this may be subject to eligibility.',
  },
];

const FAQs = () => {
  const { pageLabelName } = usePageContext();

  const { tabs, grouped } = useMemo(() => {
    const tabsArr = [];
    const groupedMap = FAQ_DATA.reduce((acc, item) => {
      const key = item.category_name;
      if (!tabsArr.includes(key)) tabsArr.push(key);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    return { tabs: tabsArr, grouped: groupedMap };
  }, []);

  const [activeTab, setActiveTab] = useState(tabs[0] || 'General');
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    setExpanded(0);
  }, [activeTab]);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const items = grouped[activeTab] || [];

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

            {items.map((item, index) => (
              <div
                key={'ques_' + index}
                className={`ques-ans-container ${expanded === index ? "expanded" : ""}`}
              >
                <h2 className="question" onClick={() => handleToggle(index)}>
                  {item?.query}
                </h2>
                <p className={`answer ${expanded === index ? "open" : "close"}`} style={{ whiteSpace: 'pre-line' }}>
                  {item?.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
