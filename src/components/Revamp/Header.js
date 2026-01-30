import React, {useEffect, useState } from 'react'
import applyLogo from "../../Images/rev/logo/apply_logo.svg";
import { nav_list } from "../Revamp/utils/helpers.js";
import Image from 'next/image';
import { usePageContext } from './context/PageContext.js';
import userIcon from "../../Images/rev/logo/user-icon.svg";
import hamberger from "../../Images/rev/logo/hamberger.svg";

const Header = () => {

  const [navigation, setNavigation] = useState([]);
  const { deviceType, prerequisiteData } = usePageContext();
  const [mobNav, setMobNav] = useState(false);
  const [mobLogin, setMobLogin] = useState(false);

  useEffect(() => {
    setNavigation(nav_list);

    //Disable right-click menu

    document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
    }); 

    //Prevent copy/paste shortcuts

    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v')) {
          event.preventDefault();
      }
    }); 
  
  }, []);

  useEffect(() => {
    if(mobLogin){
      setTimeout(() => {
        document.querySelector('.user-login-section__inner').classList.add('show');
        document.querySelector('.section_header').classList.add('mob_log_shift');
      }, 100);
    } else {
      document.querySelector('.section_header').classList.remove('mob_log_shift');
    }
  },[mobLogin]);

  const handleLoginOptions = () => {
    setMobLogin(prev => !prev);
    
  }

  return (
    <div className='container'>
      <div className='section_header'>
        <div className='logo'>
          <a href="/">
            <Image src={applyLogo} alt='' width={35} fetchpriority="high" height={35} />
          </a>
        </div>
        <div className={mobNav ? 'active nav' : 'nav'}>
          {deviceType !== 'desktop' ? (
            <button className='nav-close' onClick={() => setMobNav(false)}>X</button>
          ) : null}
          <ul>
            {navigation.length > 0 ? (
              navigation.map((item, index) => (
                <li key={index} onClick={() => setMobNav(false)} className={item?.className ? item?.className : ''}>
                  {item?.internalLink ? (
                    <a href={item?.internalLink ? '/#' + item?.internalLink : '#'}>{item.name}</a>
                  ) : (
                    <a 
                      href={item?.pageLink || '#'} 
                      onClick={(e) => {
                        if (item?.pageLink === '#' || !item?.pageLink) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {item?.name}
                    </a>
                  )}
                </li>
              ))
            ) : (<li></li>)
            }
          </ul>
        </div>
        <div className='setting-login'>
          {deviceType !== 'mobile' ? (
            <div className='user-login-section'>
              <Image width={25} height={25} src={userIcon} alt='user icon' fetchpriority="high" />
              <ul className='desktop-support user-login-section__inner'>
                <li>
                  <a href={'/student-login'}>Student
                    <span> Login</span>
                  </a>
                </li>
                <li>
                  <a href={'/recuiter-login'}> Recruiter
                    <span> Login</span>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <ul className='mob-support'>
              <li onClick={handleLoginOptions}><Image width={20} height={20} src={userIcon} alt='user icon' fetchpriority="high" />
                {mobLogin ? (
                  <ul className='user-login-section__inner'>
                    <li>
                      <a href={'/student-login'}>Student
                        <span> Login</span>
                      </a>
                    </li>
                    <li>
                      <a href={'/explore'}>Explore
                      </a>
                    </li>
                    <li>
                      <a href={'/recuiter-login'}> Recruiter
                        <span> Login</span>
                      </a>
                    </li>
                  </ul>
                ) : null}
              </li>
              <li onClick={() => setMobNav(true)}><Image width={20} height={20} src={hamberger} fetchpriority="high" alt='hamberger' />

              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
