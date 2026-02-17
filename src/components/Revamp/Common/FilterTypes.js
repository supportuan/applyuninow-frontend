import React, { useEffect, useRef, useState } from 'react';
import { dropdownTypes, feeRangeStructure } from '../utils/helpers';
import { usePageContext } from '../context/PageContext';
import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';
import { useRouter } from 'next/router';

const FilterTypes = ({ applyFilters, reset, setReset }) => {
  const router = useRouter();
  const { BASE_URL } = useAppContext();
  const { prerequisiteData } = usePageContext();
  const [engVal, setEngVal] = useState([])
  const [Industry, setIndustry] = useState('')
  const [city, setCity] = useState([])
  const [Country, setCountry] = useState('')
  const [YearApplicationFee, setYearApplicationFee] = useState([])
  const [activeStyles, setActiveStyles] = useState({});
  const dd = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState({
    countryId: '',
    industryId: '',
    SubjectId: ''
  });

  const filterRemove = ['English Test', 'Adaptive Test','City'];

  useEffect(() => {
    if (router.isReady) {
      //const { industryId,subjectId } = router.query || [];
      //console.log(industryId,subjectId ,'study_area');
      previousPageIds()
      //console.log(selectedFilter, 'study_area');
    }

    if (reset) {
      setReset(false)

      // Clear all select DOM values and remove .valid classes to fix floating label overlap
      const allSelects = document.querySelectorAll('.form-group select.dropdown-items');
      allSelects.forEach(select => {
        select.value = '';
        select.classList.remove('valid');
      });

      // Reset local state
      setSelectedFilter({ countryId: '', industryId: '', SubjectId: '' });
      setEngVal([]);
      setCity([]);
      setCountry('');
      setIndustry('');
      setYearApplicationFee([]);
      setActiveStyles({});

      // previousPageIds() will run above (line 31) and re-apply any URL-based preselections
    }
    
  }, [router.isReady, router.query, reset])

  const renderContent = (item) => {

    switch (item) {
      case 'Country':
        return prerequisiteData?.data?.study_destination?.map((destination, index) => (
          <option key={destination?.id} value={destination?.id} selected={destination?.id === selectedFilter.countryId} >{destination?.name}</option>
        ));
      case 'Study Industry':
        return prerequisiteData?.data?.study_industry?.map((industry, index) => (
          <option key={industry?.id} value={industry?.id} selected={industry?.id == selectedFilter.industryId}>{industry?.name}</option>
        ));
      case 'University Type':
        return prerequisiteData?.data?.university_type?.map((utype, index) => (
          <option key={utype} value={utype}>{utype}</option>
        ));
      case 'Study Area':
        return engVal?.map((industry, index) => (
          <option key={industry?.id} value={industry?.id} selected={industry?.id == selectedFilter.SubjectId}>{industry?.name}</option>
        ));
      case 'City':
        return city?.map((c, index) => (
          <option key={c?.city} value={c?.city}>{c?.city}</option>
        ));
      case 'Course Level':
        return prerequisiteData?.data?.study_level?.map((CourseLevel, index) => (
          <option key={CourseLevel?.id} value={CourseLevel?.id}>{CourseLevel?.name}</option>
        ));
      case 'Intakes':
        return prerequisiteData?.data?.intake_month?.map((Intakes, index) => (
          <option key={Intakes} value={Intakes}>{Intakes}</option>
        ));
      case 'English Test':
        return prerequisiteData?.data?.english_test?.map((English, index) => (
          <option key={English} value={English}>{English}</option>
        ));
      case 'Adaptive Test':
        return prerequisiteData?.data?.adaptive_test?.map((Adaptive, index) => (
          <option key={Adaptive} value={Adaptive}>{Adaptive}</option>
        ));
      case 'Application Fee':
        return YearApplicationFee?.applicationFeeRanges?.map((application, index) => (
          <option key={application.key} value={application.key}>{application.value}</option>
        ));
      case 'Yearly Fee':
        return YearApplicationFee?.tuitionFeeRanges?.map((yearly, index) => (
          <option key={yearly.key} value={yearly.key}>{yearly.value}</option>
        ));

      default:
        return 'Unknown';
    }
  };

  const handleChange = (e, item) => {
    const selectedValue = e.target.value;
    const key = item.key;

    if (item?.key == 'adaptive_test') {
      setActiveStyles(prevStyles => ({
        ...prevStyles,
        ['adaptive_test_value']: {
          display: selectedValue === "" ? 'none' : 'block',
        }
      }));
    }
    if (item?.key == 'english_test') {
      setActiveStyles(prevStyles => ({
        ...prevStyles,
        ['english_test_value']: {
          display: selectedValue === "" ? 'none' : 'block',
        }
      }));
    }
    if (item?.key == 'INDUSTRY_ID') {
      setEngVal([]);
      getStudyArea(selectedValue)
    }

    if (item?.key == 'country_id') {
      setCity([]);
      getCity(selectedValue)
      setYearApplicationFee(getFeesByCountry(selectedValue))
    }

    const { name, value } = e.target;
    if (value !== '') {
      e.target.classList.add('valid');
    } else {
      e.target.classList.remove('valid');
    }

    applyFilters({ key, selectedValue });
  };

  const getStudyArea = async (id) => {
    const url = `${BASE_URL}/study-areas?industry_id=${id}`;
    const res = await api.get(url);
    const studyData = res?.data?.data;
    setEngVal(studyData);
    setIndustry(id);
  }


  const getCity = async (countryId) => {
    const url = `${BASE_URL}/universities/city/?country_id=${countryId}`;
    const cres = await api.get(url);
    const CData = cres?.data?.data;
    setCity(CData);
    setCountry(countryId)
  }

  const getFeesByCountry = (countryId) => {
    return feeRangeStructure.find(item => item.country === countryId);
  };

  //const check

  const previousPageIds = async () => {
    const { industryId, subjectId } = router.query || ['', ''];
    if (!industryId) return;

    let [slug, industId, countryId] = industryId.split("--") || ['', '', ''];
    const [subName, subId] = subjectId.split("--") || ['', ''];
    if (industId) await getStudyArea(industId)

    let urlcountry = ''
    if (countryId) {
      let cname = countryId
      if(countryId=='usa') cname = 'UNITED STATES OF AMERICA';
      if(countryId=='uk') cname = 'UNITED KINGDOM';
      urlcountry = await prerequisiteData?.data?.study_destination.find(dest => dest.name == cname.toUpperCase());
      if (urlcountry) getCity(urlcountry?.id)
    }

    setSelectedFilter({
      countryId: urlcountry?.id || '',
      industryId: industId,
      SubjectId: subId
    });

    (typeof industId != 'undefined' && industId >0) ? document.querySelector('#INDUSTRY_ID').classList.add('valid') : document.querySelector('#INDUSTRY_ID').classList.remove('valid') ;
    (typeof subId != 'undefined' && subId >0) ? document.querySelector('#SUBJECT_AREA_ID').classList.add('valid') : document.querySelector('#SUBJECT_AREA_ID').classList.remove('valid') ;
    (typeof urlcountry?.id != 'undefined' && urlcountry?.id >0 ) ?  document.querySelector('#country_id').classList.add('valid') : document.querySelector('#country_id').classList.remove('valid') ;
    //console.log(subId, industId, urlcountry, 'filtersfiltersfilt');

  }


  return (
    <React.Fragment>
      {router.isReady && dropdownTypes.map((item) => (
        <div className={`custom-select-wrapper ${filterRemove.includes(item.label) ? 'hide' : ''}`} key={item?.key}>
          {item?.input ? (
            <input className="dropdown-items" name={item?.key} placeholder={item?.label} onKeyUp={(e) => handleChange(e, item)} />
          ) : item?.input2 ? (
            <input className="dropdown-items" name={item?.key} placeholder={item?.label} onKeyUp={(e) => handleChange(e, item)}
              style={{ padding: '8px', ...(activeStyles[item.key] || { display: 'none' }) }} type="number" />
          ) : (
            <div className={`form-group`}>

              <select className="dropdown-items input_txt_box" id={item?.key} name={item?.key} onChange={(e) => handleChange(e, item)} ref={dd}>
                <option key={item?.key} value=""></option>
                {renderContent(item.label)}
              </select>
              <label>{item.label}</label>
              <div className="custom-arrow"></div>
            </div>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default FilterTypes;
