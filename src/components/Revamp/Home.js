import React from 'react'
import HeroComp from './Home/HeroComp'
import Services from './Common/Services'
import UniversityList from './Common/UniversityList'
import TechJourney from './Common/TechJourney'
import TestPref from './TestPref'
import AppProcess from './Common/AppProcess'
import USPs from './Common/USPs'
import FAQs from './Common/FAQs';
import Testimonials from './Common/Testimonials';
import Particles from 'react-tsparticles';
import { uList } from './utils/helpers'

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
                "speed": 10,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b9cdf0",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
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
    <React.Fragment>
        <Particles params={options}/>
        <HeroComp />
        <Services />
        <UniversityList infoList={uList} />
        <TechJourney />
        <TestPref />
        <AppProcess />
        <USPs />
        <FAQs />
        <Testimonials />
    </React.Fragment>
  )
}

export default Home
