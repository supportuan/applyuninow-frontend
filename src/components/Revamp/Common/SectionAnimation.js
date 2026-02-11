'use client';
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import Image from 'next/image';
import imgFf from "../../../Images/rev/digital/apple_intelligence_screen_endframe__floolltiipym_large.jpg";
import firstImg from "../../../Images/rev/digital/1.svg";
import secondImg from "../../../Images/rev/digital/2.svg";
import thirdImg from "../../../Images/rev/digital/3.svg";
import fourthImg from "../../../Images/rev/digital/4.svg";
import fifthImg from "../../../Images/rev/digital/5.svg";
import sixthImg from "../../../Images/rev/digital/6.svg";
import seventhImg from "../../../Images/rev/digital/7.svg";
import img15 from "../../../Images/rev/digital/15.svg";
import { usePageContext } from '../context/PageContext';

const SectionAnimation = ({ info: imgDetail }) => {
  const heroRef = useRef(null);
  const {deviceType, windowType} = usePageContext();
  const wType = windowType !== 'xlarge' ? 0.5 : 0.6;

  useEffect(() => {
    import('gsap/ScrollTrigger').then((mod) => {
      gsap.registerPlugin(mod.ScrollTrigger);

      var tl = gsap.timeline();
      tl.from("#livePhoneScrollTrigger .livePhone img", {
        scale: 2,
        y: () => -window.innerHeight * wType,
        scrollTrigger: {
          trigger: ".livePhone",
          scroller: "body",
          start: "top 70%",
          end: "top 10%",
          scrub: 3
        }
      });

      const hiddenElements = document.querySelectorAll(".uperText2 p");
      hiddenElements.forEach((element) => {
        tl.from(element, {
          opacity: 1,
          y: "130vh", 
          ease: "power4.Out", 
          scrollTrigger: {
            trigger: "#livePhoneScrollTrigger", 
            start: "top 90%", 
            end: "top -50%", 
            scrub: true
          }
        });
      });

      const hiddenElements2 = document.querySelectorAll(".uperText3 p");
      hiddenElements2.forEach((element) => {
        tl.from(element, {
          opacity: 1,
          y: "250vh", 
          ease: "power4.Out", 
          scrollTrigger: {
            trigger: "#photos", 
            start: "top 0%", 
            end: "top -200%", 
            scrub: true
          }
        });
      });

      const hiddenElements3 = document.querySelectorAll(".uperText4 p");
      hiddenElements3.forEach((element) => {
        tl.from(element, {
          opacity: 1,
          y: "400vh", 
          ease: "power4.Out", 
          scrollTrigger: {
            trigger: "#photos", 
            start: "top 0%", 
            end: "top -400%", 
            scrub: true
          }
        });
      });

      const hiddenElements4 = document.querySelectorAll(".uperText5 p");
      hiddenElements4.forEach((element) => {
        tl.from(element, {
          opacity: 1,
          y: "540vh", 
          ease: "power4.Out", 
          scrollTrigger: {
            trigger: "#photos", 
            start: "top 0%", 
            end: "top -540%", 
            scrub: true
          }
        });
      });

      
      const images = gsap.utils.toArray("#photos .photo .imgEf");

      mod.ScrollTrigger.matchMedia({
        "(max-width: 768px)": function () {
          gsap.to("#photos .photo", {
            xPercent: -110, 
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".photo",
              pin: true,
              start: "center 60%",
              end: () => "=" + document?.querySelector(".photo")?.offsetWidth,
              scrub: 1,
              snap: 1 / (images.length - 1),
              invalidateOnRefresh: true
            }
          });
        },

        "(min-width: 769px)": function () {
          gsap.to("#photos .photo", {
            xPercent: -100, 
            ease: "none",
            scrollTrigger: {
              trigger: ".photo",
              pin: true,
              start: "center 70%",
              end: () => "=" + document?.querySelector(".photo")?.offsetWidth,
              scrub: 1,
              snap: 0 / (images.length - 0),
              invalidateOnRefresh: true
            }
          });
        }
      });


      images.forEach((imgEf, i) => {
        if (i === 0) return; 

        if (i === images.length - 1) {
          gsap.to(imgEf, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: images[images.length - 2], 
              start: "center center",
              end: "bottom center",
              scrub: 2,
              onEnter: () => {
                gsap.to(imgEf, { scale: 1, duration: 0.8 });
              }
            }
          });
        } else {
          gsap.to(imgEf, {
            ease: "none",
            scrollTrigger: {
              trigger: images,
              start: () => `${i * 70}% center`,
              end: () => `${(i + 1) * 70}% center`,
              scrub: 2,
              onEnter: () => {
                gsap.to(imgEf, { scale: 1.5, gap: 8, zIndex: 1 });
              },
              onLeave: () => {
                gsap.to(imgEf, { scale: 1, gap: 8, zIndex: "auto" });
              },
              onEnterBack: () => {
                gsap.to(imgEf, { scale: 1.5, gap: 10, zIndex: 1 });
              },
              onLeaveBack: () => {
                gsap.to(imgEf, { scale: 1, gap: 10, zIndex: "auto" });
              }
            }
          });
        }
      });

      
      if(deviceType !== 'xlarge') {
        tl.to(".photo .slideImg", {
          x: "60vw",
          y: "-35vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".slideImg",
            scroller: "body",
            start: "top -130%",
            end: "top -250%",
            scrub: 5
          }
        });
        gsap.to(".section3", {
          opacity: 1,
          x: "-40vw", 
          y: "25vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section3",
            scroller: "body",
            start: "top -120%",
            end: "top -270%",
            scrub: 3,
          }
        });

        gsap.to(".lastImgEF", {
          opacity: 1,
          x: "20vw", 
          y: "-40vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".lastImgEF",
            scroller: "body",
            start: "top 10%",
            end: "top 20%",
            scrub: 3,
          }
        });
      } else {
        tl.to(".photo .slideImg", {
          x: "70vw",
          y: "-15vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".slideImg",
            scroller: "body",
            start: "top -130%",
            end: "top -250%",
            scrub: 5
          }
        });
        gsap.to(".section3", {
          opacity: 1,
          x: "20vw", 
          y: "-55vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section3",
            scroller: "body",
            start: "top -150%",
            end: "top -300%",
            scrub: 3,
          }
        });

        gsap.to(".lastImgEF", {
          opacity: 1,
          x: "30vw", 
          y: "-25vh",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".lastImgEF",
            scroller: "body",
            start: "top 10%",
            end: "top 20%",
            scrub: 3,
          }
        });
      }
    });
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="section1">
        <div className="uperText">
          <div className="uperText1">
          <div className="module-head"><h2 className="module-title">Cutting edge Technology followed by <br />100% Digital and 100% Transparent Process.</h2><p className="module-subtitle">Draws on your personal context without allowing anyone else to access your personal data — not even ApplyUniNow.</p></div>
          </div>
        </div>

        <div className="backUperText">
          <div className="uperText2 hidden">
            <p>A novel, multi-tasking WEB and MOBILE application that caters to the journey of International Students, encompassing counseling from the outset to settling in the desired destination but experiencing the journey with real-time insights.
            </p>
          </div>
          <div className="uperText3 hidden">
            <p>This transformative technology facilitates a streamlined application process, obviating the necessity of submitting multiple applications across various forms or dedicating excessive time to searching for undergraduate and postgraduate course information, scholarships, accommodation, and employment opportunities in disparate locations.
            </p>
          </div>
          <div className="uperText4 hidden">
            <p>ApplyUniNow’s Counselling App offers unparalleled convenience to aspiring individuals enrolled in our Counselling program. This exclusive application enables you to efficiently manage your shortlist, submit applications, and connect with your dedicated counsellor.
            </p>
          </div>
          <div className="uperText5 hidden">
            <p>Engage with our certified Counsellors to receive a personalized university shortlist. We will address all your inquiries regarding the application process, exam preparation, and provide insights into your shortlisted universities. Receive real-time notifications via our web and mobile applications for updates on your application journey status.
            </p>
          </div>
        </div>

      </div>
      
      <div className="section2">
        <div id="photos">
        
          <div className="photo">
          {/* {deviceType == 'desktop' ? ( */}
              <div id="livePhoneScrollTrigger">
                <div className="livePhone imgEf"><Image src={firstImg} width={200} height={400} alt="" /> </div>
              </div>
            {/* ): null} */}
            
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"> <Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="imgEf slideImg"><Image src={firstImg} width={200} height={400} alt="" /></div>
            <div className="lastImgEF grid-container1">
              <div className="section3 grid-item">
                {/* <Image src={firstImg} alt="" /> */}
                {/* <a href="#">Watch Video ▶</a> */}
              </div>
              <div className="imgEf2 grid-item"><Image src={img15} width={428} height={263} alt="" /> </div>
              <div className="imgEf3 grid-item"><Image src="/rev/digital/16.svg" width={684} height={387} alt="" /> </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default SectionAnimation;
