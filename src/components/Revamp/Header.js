import React, {useEffect, useState } from 'react'
import applyLogo from "../../Images/rev/logo/apply_logo.svg";
import { nav_list } from "../Revamp/utils/helpers.js";
import Image from 'next/image';
import { usePageContext } from './context/PageContext.js';
import userIcon from "../../Images/rev/logo/user-icon.svg";
import searchIcon from "../../Images/rev/logo/search-svgrepo-com.svg";
import exploreIcon from "../../Images/rev/logo/explore.svg";

const Header = () => {

  const [navigation, setNavigation] = useState([]);
  const { deviceType, prerequisiteData } = usePageContext();
  const [mobNav, setMobNav] = useState(false);
  const [mobLogin, setMobLogin] = useState(false);
  const [loginShift, setLoginShift] = useState(false);

  useEffect(() => {
    setNavigation(nav_list);

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === 'c' || event.key === 'x' || event.key === 'v')) {
          event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobLogin) {
      const timer = setTimeout(() => {
        setLoginShift(true);

      }, 100);
      return () => clearTimeout(timer);
    } else {
      setLoginShift(false);
    }
  }, [mobLogin]);

  const handleLoginOptions = () => {
    setMobLogin(prev => !prev);

  }

  const headerClasses = ['section_header'];
  if (loginShift) headerClasses.push('mob_log_shift');
  if (mobNav) headerClasses.push('nav-open');

  useEffect(() => {
    if (mobNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobNav]);

  const navItems = navigation.length > 0 ? (
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
  ) : (<li></li>);

  return (
    <>
      <div className='container header-container'>
        <div className={headerClasses.join(' ')}>
          <div className='logo'>
            <a href="/">
              <Image src={applyLogo} alt='ApplyUniNow' width={40} fetchpriority="high" height={40} />
            </a>
          </div>
          <div className={`nav${mobNav ? ' active' : ''}`}>
            <ul>
              {navItems}
            </ul>
          </div>
          <div className='setting-login'>
            {deviceType !== 'mobile' ? (
              <div className='desktop-icons-group'>
                <span aria-label='Search' className='header-icon-link header-icon-search'>
                  <Image width={22} height={22} src={searchIcon} alt='search' fetchpriority="high" />
                </span>
                <a href='/explore' aria-label='Explore' className='header-icon-link'>
                  <Image width={22} height={22} src={exploreIcon} alt='explore' fetchpriority="high" />
                </a>
                <a href='/student-login' aria-label='Login' className='header-icon-link'>
                  <Image width={22} height={22} src={userIcon} alt='user icon' fetchpriority="high" />
                </a>
              </div>
            ) : (
              <ul className='mob-support'>
                <li>
                  <span aria-label='Search' className='header-icon-search'>
                    <Image width={20} height={20} src={searchIcon} alt='search' fetchpriority="high" />
                  </span>
                </li>










                <li>
                  <a href='/explore' aria-label='Explore'>
                    <Image width={20} height={20} src={exploreIcon} alt='explore' fetchpriority="high" />
                  </a>
                </li>
                <li>
                  <a href='/student-login' aria-label='Login'>
                    <Image width={20} height={20} src={userIcon} alt='user icon' fetchpriority="high" />
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    aria-label={mobNav ? 'Close menu' : 'Open menu'}
                    className={`hamburger-btn${mobNav ? ' active' : ''}`}
                    onClick={() => setMobNav(prev => !prev)}
                  >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                  </button>
                </li>
              </ul>
            )}
          </div>


























        </div>
      </div>

    </>
  )
}

export default Header