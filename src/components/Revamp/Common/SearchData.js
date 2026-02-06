import React from 'react';
import FaSearch from "../../../Images/rev/search-icons.svg"
import Link from 'next/link';
import Image from 'next/image';

const SearchData = ({ countryId = null, hidden = false }) => {
  console.log(countryId)
  const cId = (countryId) ? '?countryId=' + countryId : ''
  const studyDestination = '/industry' + cId;
  
  const searchClasses = `hero_section__sec_search${hidden ? ' hero_section__sec_search--hidden' : ''}`;
  
  return (
    <div className={searchClasses}>
      <Link href={studyDestination}  passHref legacyBehavior>
        <a className="search-box">
            <div className="search-icon">
                <Image src={FaSearch} alt='Search Field' height={25} width={25} />
            </div>
            <span className="search-input">Click here to get started in simple steps..</span>
        </a>
      </Link>
    </div>
  )
}

export default SearchData;
