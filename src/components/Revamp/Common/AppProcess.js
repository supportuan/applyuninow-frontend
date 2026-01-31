import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { appProcess } from '../utils/helpers';

const AppProcess = () => {

  const sectionRef = useRef(null);
  const listItemsRef = useRef([]);
  const stepsRef = useRef([]);

  useEffect(() => {
    const steps = stepsRef.current;
    const items = listItemsRef.current;

    import('gsap/ScrollTrigger').then((mod) => {
      gsap.registerPlugin(mod.ScrollTrigger);

      const setActiveItem = (index) => {
        document.querySelector(".social-proof__list-item--active")?.classList.remove("social-proof__list-item--active");
        items[index]?.classList.add("social-proof__list-item--active");
      };
  
      steps.forEach((step, index) => {
        mod.ScrollTrigger.create({
          trigger: step,
          start: "bottom center",
          onEnter: () => setActiveItem(index),
          onLeaveBack: () => setActiveItem(index === 0 ? 0 : index - 1),
        });
      });

      gsap.from(".social-proof__list", {
        ease: "none",
        scale: 0.9,
        opacity: 0,
        scrollTrigger: {
          trigger: ".app_process",
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });
  
      gsap.to(".app_process", {
        ease: "none",
        opacity: 0,
        scrollTrigger: {
          trigger: ".app_process",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => mod.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  }, []);


  return (
    <div id="app_process" className="container testPref-container">
      <div className="services-container__inner">
        <div className="module-divider"></div>
        <div className='testPref-container__inner'>
          <div className="module-head">
            <h2 className="module-title">Step-by-Step Application Process</h2>
          </div>
          <div className='app_process'>
            {/* <div className="social-proof__steps">
              {Array(appProcess.length).fill("").map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className={`social-proof__step social-proof__step--${index + 1}`}
                ></div>
              ))}
            </div> */}

            <div className='testPref-container__items social-proof__list'>

              <div className='social-proof__list-nest'>
                {appProcess.map((step, index) => (
                  <div key={index} className={`testPref-container__items--item ${(appProcess.length - 1) === index ? 'testPref-last-element' : index === 0 ? 'testPref-first-element' : ''}`} ref={(el) => (listItemsRef.current[index] = el)}>
                    <div className='item-num'>
                      {step?.number}
                    </div>
                    <div className='item_content'>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppProcess;
