import React, { useEffect, useState } from 'react'
import TopStrip from './Common/TopStrip';
import canadaMap from "../../Images/rev/flags/map/canada_map.svg";
import SearchData from './Common/SearchData';
import ReasonsForCountry from './Common/ReasonsForCountry';
import UniversityList from './Common/UniversityList';
import AppProcess from './Common/AppProcess';
import FAQs from './Common/FAQs';
import GetUserDetails from './Common/GetUserDetails';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { uList } from './utils/helpers';
import { countryWiseDetail } from './utils/helpers';

const CountryDetails = () => {
  const router = useRouter();

  const { countryId } = router.query;
  const [selectedCountryData, setSelectedCountryData] = useState(countryWiseDetail[countryId]);
  const topString = 'The world is your classroom - ' + selectedCountryData?.title;

  useEffect(() => {
    if(countryId){
      const data = countryWiseDetail[countryId];
      setSelectedCountryData(data);
      console.log(data);
    }
  }, [countryId]);


  return (
    <>
    {selectedCountryData && (
      <div className='country-detail-section'>
        <TopStrip topInfoText={topString} type={`country-${countryId}`} gobackLink='/countries' />
        <div className='hero_section__inner'>
          <div className='container min-width'>
            <div className='country-map-sec'>

              <Image width={711} height={600} src={selectedCountryData?.icon?.src} alt='Canada map' />
              <p className='desc'>{selectedCountryData?.description}</p>
              <SearchData countryId={countryId}/>

            </div>
          </div>
        </div>
        <div className='module-divider'></div>
        <ReasonsForCountry reasonInfo={selectedCountryData} />
        <UniversityList infoList={selectedCountryData?.uniLogo} />
        <AppProcess />
        <FAQs />
        <div className='module-divider' style={{ marginBottom: '60px' }}></div>
        <GetUserDetails />
      </div>
    )}
    </>
  )
}

export default CountryDetails
