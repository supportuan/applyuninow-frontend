//import React from 'react'
import HeroComp from '../src/components/Revamp/Home/HeroComp'
import Services from '../src/components/Revamp/Common/Services'
import UniversityList from '../src/components/Revamp/Common/UniversityList'
import TechJourney from '../src/components/Revamp/Common/TechJourney'
import TestPref from '../src/components/Revamp/TestPref'
import AppProcess from '../src/components/Revamp/Common/AppProcess'
import USPs from '../src/components/Revamp/Common/USPs'
import ConnectUs from '../src/components/Revamp/Common/ConnectUs'
import FAQs from '../src/components/Revamp/Common/FAQs';
import Testimonials from '../src/components/Revamp/Common/Testimonials';
import { uList } from "../src/components/Revamp/utils/helpers.js";

import dynamic from 'next/dynamic';
import IndustryList from '../src/components/Revamp/Common/IndustryList.js'
const Particles = dynamic(() => import('react-tsparticles'), { ssr: false });


const Home = () => {
  const options = {
    particles: {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 700
            }
        },
      
        "color": {
            "value": "#b9cdf0"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#b9cdf0"
            },
            "polygon": {
                "nb_sides": 5
            },
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 0.1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b9cdf0",
            "opacity": 0.3,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": .4,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        },
  }}
  
  return (
    <>
        {/* <Particles params={options}/> */}
        <HeroComp />
        <IndustryList />
        <Services />
        <UniversityList infoList={uList}/>
        <TechJourney />
        <TestPref />
        {/* <AppProcess /> */}
        <USPs />
        <ConnectUs />
        <FAQs />
        <Testimonials />
    </>
  )
}

export default Home;
