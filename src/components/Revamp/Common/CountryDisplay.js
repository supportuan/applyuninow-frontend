import React, { useEffect } from "react";
import WorldMap from "../../../Images/rev/flags/world-map.svg";
import LogoStar from "../../../Images/rev/logo/logo-with-star.svg";
import Image from 'next/image';
import Link from 'next/link';
import { countries } from "../utils/helpers";

const CountryDisplay = () => {
  
  return (
    <div id="destinations" className="container section_countries">
       <div className="section_countries__inner">
       {/* <div className="module-divider"></div> */}
        <div className="logo">
            <Image src={LogoStar} alt="ApplyUniNow Logo" width={502} height={225} />
        </div>

        <div className="world-map">
            <Image src={WorldMap} alt="World Map" />
            {countries.map((country, index) => 
            index < 7 ? (
              <div key={'img_'+index} className={`blinker country_loc_${index}`}></div>
            ) : null )}
        </div>

        <div className="flag-container" key="country-1">
            {countries.map((country) => (
            <Link key={country.code} href={'country/' + country.code} passHref legacyBehavior>
              <div className="flag">
                <Image src={country.flag} aria-label={country.code} alt={country.code} width="100" height="100" />
                <label>{country?.title}</label>
                </div>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
 export default CountryDisplay;
