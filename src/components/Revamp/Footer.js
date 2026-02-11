import React from 'react';
import instagram from "../../Images/rev/social/Instagram.svg";
import facebook from "../../Images/rev/social/Facebook.svg";
import linkedin from "../../Images/rev/social/LinkedIn.svg";
import whatsapp from "../../Images/rev/social/WhatsApp.svg";
import prohibited from "../../Images/rev/social/prohibited.svg";
import copyright from "../../Images/rev/social/copyright.svg";
import british from "../../Images/rev/footer/british.svg";
import arc from "../../Images/rev/footer/arc.svg";
import nafsa from "../../Images/rev/footer/nafsa.svg";
import ukagent from "../../Images/rev/footer/uk_agent.jpeg";
import educated from "../../Images/rev/footer/education.png";
import aae_ri from "../../Images/rev/footer/aaeri.jpeg";
import Link from 'next/link';
import Image from 'next/image';
import { usePageContext } from './context/PageContext';

const social = [
  { name: "instagram", icon: instagram, link:'https://www.instagram.com/applyuninow/' },
  { name: "facebook", icon: facebook, link:'https://www.facebook.com/ApplyUniNow/' },
  { name: "linkedin", icon: linkedin, link:'https://www.linkedin.com/company/applyuninow/?originalSubdomain=in' },
  { name: "whatsapp", icon: whatsapp, click: true },
  // { name: "prohibited", icon: prohibited},
  { name: "copyright", icon: copyright, detail:'No use is allowed without explicit permission.' },
];

const footerIcons = [
  { name: "british", icon: british, width: 175, height: 75 },
  // { name: "arc", icon: arc, width: 99, height: 99 },
  { name: "nafsa", icon: nafsa, width: 124, height: 62 },
  { name: "education", icon: educated, width: 124, height: 124 },
  { name: "uk agent", icon: ukagent, width: 124, height: 124 },
  { name: "aaeri", icon: aae_ri, width: 124, height: 124 },
];

const footerNav = [
  { name: "About Us", link: '/about'},
  { name: "Careers", link: '/careers'},
  { name: "Countries", link: '/countries'},
  { name: "AI Student Advisor", link: '/industry'},
  { name: "T&C", link: '/terms-conditions'},
  { name: "Privacy Policy", link: '/privacy-policy'},
  { name: "Grievance", link: '/grievance'},
  { name: "Refund Policy", link: '/refund-policy'},
  { name: "Anti-Fraud Policy", link: '/anti-fraud-policy'},
];

const footerMore = [
  { name: "Study", link: '/visas'},
  { name: "Visit", link: '/visas'},
  { name: "Work", link: '/visas'},
  { name: "Migrate", link: '/visas'},
];

const Footer = () => {

  const { deviceType } = usePageContext();

  const initWhatsApp = () => {
    var mnum = '+919704566688';
    var msg = "Hello, could you assist me in upskilling opportunities with study abroad?";
    deviceType == 'desktop' ? window.open("https://web.whatsapp.com/send?phone=" + mnum + "&text=" + msg, "_blank", "noopener") : window.open("https://wa.me/" + mnum + "?text=" + msg, "_blank", "noopener");
  };

  const initEmpty = (e) => { e.preventDefault(); }

  return (
    <div className='container mid-width footer_section'>
      <div className='footer_section__inner'>
        <div className="module-divider"></div>
        <h4 className='term_statement'>*This information is for reference only, we do not endorse any specific Universities or Courses. This information is provided solely for educational reference and we’d love to help you.</h4>
        <h3>Our affiliations with esteemed industry leaders, accreditations, and partnerships validate our credibility and standing.</h3>
        <div className='footer_icons'>
          {footerIcons.map((item, index) => 
            <figure key={item?.name+'_'+index}>
              <Image src={item?.icon} width={item?.width} height={item?.height} alt={item?.name} />
            </figure>
        )}
        </div>
        <div className='footer_nav'>
          {deviceType == 'desktop' ? (
            <>
            <ul>
            {footerNav.slice(0, 5).map((item, index) =>
              <li key={item?.name+'_'+index} className={item?.clname ? item?.clname : ''}>
                <Link href={item?.link} >{item?.name}</Link>
              </li>
            )}
            </ul>
            <ul className='marginT20'>
            {footerNav.slice(5, 10).map((item, index) =>
              <li key={item?.name+'_'+index}>
                <Link href={item?.link} >{item?.name}</Link>
              </li>
            )}
            </ul>
            </>
            ) : (
              <ul>
            {footerNav.map((item, index) =>
              <li key={item?.name+'_'+index} className={item?.clname ? item?.clname : ''}>
                <Link href={item?.link} >{item?.name}</Link>
              </li>
            )}
            </ul>
            )}
        </div>
        <div className='footer_more'>
          <h4>What can we do more for you today?</h4>
          <div className='cta-container'>
            {footerMore.map((item, index) => 
              <Link key={item?.name+'_'+index} href={item?.link}>{item?.name}</Link>
            )}
          </div>
        </div>
      </div>
      <div className='footer_section__bottom'>
        <div className="module-divider"></div>
        <div className='footer_section__bottom--container'>
          <div className='footer_section__bottom--contact'>
            <ul>
              <li><span style={{ textDecoration: "none", color: "inherit" }}> +91  970 45 66688 IN </span></li>
              <li><span style={{ textDecoration: "none", color: "inherit" }}> +44 773 45 66688 UK </span></li>
              <li>support@ApplyUniNow.com</li>
            </ul>
          </div>
          <div className='footer_section__bottom--social'>
            <ul>
              {social.map((item, index) => 
                <li key={index}>
                  <a href={item?.link ? item?.link : '#'} onClick={item?.click ? (e) => { e.preventDefault(); initWhatsApp(); } : initEmpty}>
                    <Image src={item?.icon} width={30} height={30} alt={item?.name} />
                    {item?.detail ? (
                      <span>{item?.detail}</span>
                    ) : null
                    }
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className='footer_section__bottom--copyright'>
            <ul>
              <li>Copyright ©{new Date().getFullYear()} ApplyUniNow.</li>
              <li>All rights reserved.</li>
              <li>Crafted by AUN Tech Consulting</li>
            </ul>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Footer
