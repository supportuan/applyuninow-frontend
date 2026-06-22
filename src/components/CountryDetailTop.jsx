import React, { useEffect } from 'react'
import uninow from "../Images/uninow.svg";
import "../styles/CountryDetailTop.css"
import bg_germany from "../Images/germany_bg.png";
import bg_germany_mble from "../Images/bg_germany_mobile.png"
import Particles from "react-tsparticles";
import { Link } from "react-router-dom";
//import { useStore } from 'react-redux';

export const CountryDetailTop = ({content}) => {
    const {title,paragraph1} = content ? content : {}
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
        },

    };

    setTimeout(() => {
        document.getElementsByTagName('canvas')[0].style.position = 'absolute'
    }, 600);

    return (
        <div>

            {/* first container */}


            <Link to="/" className="relative z-10 flex justify-center px-4 py-2 bg-white md:py-4 sm:justify-start z-1">
                <img className="w-44 md:w-52 object-contain" src={uninow} alt="uninow logo" />
            </Link>

            <div style={{ backgroundImage: `url(${bg_germany})` }} className="relative z-10 h-screen max-w-full bg_container_big sm:flex sm:flex-row-reverse ">
                <div className="transparent_big  block absolute w-11/12 md:w-full top-[calc(20%-1px)]
               left-0 right-0 m-auto md:max-w-xl  md:top-[calc(25%-1px)] lg:left-auto lg:right-20 lg:max-w-2xl lg:top-[calc(20%-1px)]  2xl:max-w-3xl 2xl:top-[calc(30%-1px)] 
                ">
                    <div className="px-6 py-10 text-white md:p-12 ">
                        <p className="mb-4 text-xl md:text-3xl lg:text-4xl audio">{title}</p>
                        <p className="mt-8 mb-12 text-base leading-relaxed opacity-60">
                            {paragraph1}
                        </p>
           <div className='text-center md:text-left'>
           <button className="px-8 py-1.5 text-base rounded-full bg-slider audio">Know More</button>
           </div>
                    </div>

                </div>

            </div>

            {/* second container */}

            <div className="relative details_darkblue bg-darkblue">
            <Particles  canvasClassName="canvas" className="z-0" options={options}  style={{
                       
                        position: 'absolute'
                 }} params={options}  />
                <div className="w-2/3 max-w-3xl py-24 m-auto text-xl leading-loose text-white md:py-48 z-99 ">
                    <span className="relative text-3xl audio"><svg className='absolute inline-block -left-12 top-2' width="28" height="24" viewBox="0 0 51 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4688 0.390625H24.3359L17.8672 35.8281H0.570312L11.4688 0.390625ZM37.4141 0.390625H50.2109L43.7422 35.8281H26.4453L37.4141 0.390625Z" fill="white"/>
</svg>
In Germany</span> the Universities have a good number <br/>
                    of programs taught in English Overseas students can enjoy a high standard of living for low
                    costs Germany have a multi-ethnic and international ambiance have numerous job options Universities
                    in Germany have a multi-ethnic and international ambiance.
                    Freedom to travel and visit
                    other European Countries.
                </div>

            </div>

            {/* second container */}

        </div>
    )
}
