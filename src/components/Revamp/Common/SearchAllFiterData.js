import Image from 'next/image';
import React from 'react';
import FaSearch from "../../../Images/rev/search-icons.svg"

const SearchAllFiterData = ({query, handleSearch}) => {
  return (
    <div className='search-all-data'>
        <div className="search-icon">
            <Image src={FaSearch} alt='Search Field' width={24} height={24} />
        </div>
        <input type='text' className='' placeholder='Enter your Course Name' value={query} onChange={handleSearch} />
    </div>
  )
}

export default SearchAllFiterData;
