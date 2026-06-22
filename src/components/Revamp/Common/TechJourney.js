import React from 'react';
import HorizontalCarousel from './HorizontalCarousel';
import { digitalImg } from '../utils/helpers';

//import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import Image from 'next/image';
import tabMob from "../../../Images/rev/tab_mob.svg";
import VerticalCarousel from './VerticalCarousel';
import SectionAnimation from './SectionAnimation';
import { usePageContext } from '../context/PageContext';
const TechJourney = () => {
  const router = useRouter();
  const items = ["Meet US", "Join US"];
  const {deviceType} = usePageContext();


    //const navigate = useNavigate();
    const navigateExplore = () => {
        //navigate('/explore');
        router.push('/explore');
    }
    return (
        <div id="tech_journey" className="container tech-container">
            <div className="services-container__inner">
                <div className="module-divider"></div>
                <div className='tech-container__inner'>

                    {/* {deviceType == 'mobile' ? ( */}
                        <>
                            <div className="module-head">
                                <h2 className="module-title">Cutting edge Technology followed by <br />100% Digital and transparent process.</h2>
                                {/* <p className="module-subtitle">Draws on your personal context without allowing anyone else to access your personal data — not even ApplyUniNow.</p> */}
                            </div>
                            <div className='module-desc'>A novel, multi-tasking WEB and MOBILE application that provides counseling from the start to help international students settle in their destination with real-time insights.</div>
                            <div className='module-desc maroon-color'>This transformative technology streamlines the application process, eliminating the need to submit multiple applications across various forms or spend excessive time searching for undergraduate and postgraduate course information, scholarships, accommodation, and employment opportunities in different locations.</div>
                            <HorizontalCarousel imgInfo={digitalImg} />
                            <div className='module-desc'>ApplyUniNow’s Counselling App offers unparalleled convenience to efficiently manage your shortlist, submit applications, and connect with your dedicated counsellor.</div>
                            <div className='module-desc maroon-color'>Get a personalized university shortlist from our certified Counsellors. They’ll answer your application process, exam preparation, and shortlisted university questions. Get real-time updates on your application journey via our web and mobile apps.</div>
                            <div className='marginT20'>
                            <Image className='tabMob-icon' src={tabMob} alt='tech_tab' width={876} height={387} />
                            </div>
                        </>
                    {/* ) : null } */}
                    {/* {deviceType == 'desktop' ? (
                        <SectionAnimation info={digitalImg} />
                    ) : null} */}
                   
                    <h3>Start your <span>JOURNEY</span></h3>

                    <div className='hero_section__sec_animate meet-us-container'>
                        <VerticalCarousel items={items} />
                        <span></span>
                    </div>

                    <h5>Create a free account <span>to unlock full content</span></h5>
                    <p>By registering you agree to our Privacy statement and  Terms & Conditions</p>
                    <button onClick={navigateExplore} className='btn primary'>Explore</button>
                    
                </div>
            </div>
        </div>
    )
}

export default TechJourney