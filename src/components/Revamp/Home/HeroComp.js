import React from 'react'
import VerticalCarousel from '../Common/VerticalCarousel';
import SearchData from '../Common/SearchData';

const HeroComp = () => {
  const items = ["Strategic Decisions", "Global Upskill", "Fasttrack Your Success"];

  return (
    <div className='container hero_section'>
      <span className='hero_section__bg'></span>
      <div className='hero_section__inner'>
        <div className='hero_section__heading'>
            <h2>Your ALL-IN-ONE
              <span>Upskilling <span>Powerhouse</span></span>
            </h2>
 
            {/* <h4>We offer 3,43,000+ career upskilling study options 
            to choose from the popular study destinations...</h4> */}
        </div>
        <div className='hero_section__main-cycle'>
          <ul>
            <li className='explore'>
              <span className='li_image'></span>
              <span className='li_text'>Explore</span>
            </li>
            <li className='li_arrow'></li>
            <li className='compare'>
              <span className='li_image'></span>
              <span className='li_text'>Compare</span>
            </li>
            <li className='li_arrow'></li>
            <li className='decide'>
              <span className='li_image'></span>
              <span className='li_text'>Decide</span>
            </li>
            <li className='li_arrow'></li>
            <li className='apply'>
              <span className='li_image'></span>
              <span className='li_text'>Apply</span>
            </li>
          </ul>
        </div>
        <div className='hero_section__sec_animate'>
            <h3>Express Confidently to</h3>
            <VerticalCarousel items={items}/>
        </div>
        <SearchData />
      </div>
    </div>
  )
}

export default HeroComp;
