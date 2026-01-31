import React, { useEffect, useState, useRef } from 'react';
import TopStrip from './TopStrip';
import { useRouter } from 'next/router';
import BackButton from './BackButton';
import Reset from './Reset';
import SortData from './SortData';
import SearchAllFiterData from './SearchAllFiterData';
import FilterCart from './FilterCart';
import FilterTypes from './FilterTypes';
import Pagination from './Pagination';
import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';
import { usePageContext } from '../context/PageContext';
var i = 0;

const GraduateSubjectsAll = () => {
    const { deviceType, prerequisiteData } = usePageContext();
    const isFirstRender = useRef(true);
    const topString = '3,43,000+ graduate courses to choose from 9 study destinations';
    const router = useRouter();
    const { BASE_URL } = useAppContext();

    const [allCourses, setAllCourses] = useState([]);
    const [pagedCourses, setPagedCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filters, setFilters] = useState([]);
    const [metaInfo, setMetaInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [reset, setReset] = useState(false);
    const [recordSort, setRecordSort] = useState([]);
    const [activeFilter, setActiveFilter] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [filterSticky, setFilterSticky] = useState(false);

    const filterRef = useRef();
    const filterBtnRef = useRef();
    const rightFilterRef = useRef();
    const bottomRef = useRef(null);
    

    useEffect(() => {

        if (isFirstRender.current && router.isReady) {
            setPreviousePageFilters()
            isFirstRender.current = false;
            i++
        }else{
            fetchCourses(1, false);
            i++
        }
     
        // const filter_cart_container = document.querySelector('.filter_cart_container')?.clientHeight;
        // filter_cart_container > 700 ? setFilterSticky(true) : setFilterSticky(false);

    }, [filters, recordSort]);
    
    //CONDITION TO CHECK PAGE IS RELOADED
    if( Object.keys(router.query).length>0 && isFirstRender.current){ 
        setTimeout(() => {
            if(i===1) setPreviousePageFilters()
            i++
        }, 500);
        //console.log(router,'rrrrrrrrrrrrrrrrrrrr',i)
    }

    const fetchCourses = async (page = 1, isFilterApplied = false) => {
        try { 
            const filtersMain = { ...filters, page: page }
            let filterData = { filters: filtersMain, order: recordSort }
            const url = filterData
                ? `${BASE_URL}/course/courseCart`
                : `${BASE_URL}/course/courseCart?page=${page}`;

            const res = await api.post(url, filterData);
            const courses = res?.data?.data?.data;
            const meta = res?.data?.data?.meta;

            if (Array.isArray(courses)) {
                setPagedCourses(courses);
                setFilteredCourses(courses);
                setAllCourses(courses);
                setMetaInfo(meta);
            } else {
                setAllCourses([]);
                setPagedCourses([]);
                setFilteredCourses([]);
                setMetaInfo(null);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setAllCourses([]);
            setPagedCourses([]);
            setFilteredCourses([]);
            setMetaInfo(null);
        }
    };

    const handleSearch = (e) => {
        const queryValue = e.currentTarget.value;
        setQuery(queryValue);
        const newFilters = { ...filters, course_name: queryValue };
        setFilters(newFilters);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchCourses(page);
    };

    const applyFilters = (newFilters) => {
        let key = newFilters['key'];
        if (key == 'country_id') delete filters['city'] //reset city value
        if (key == 'INDUSTRY_ID') delete filters['SUBJECT_AREA_ID'] // reset subject area value
        if (key == 'country_id') delete filters['APPLICATION_FEE'] //reset APPLICATION_FEE value
        if (key == 'country_id') delete filters['TUITION_FEE'] //reset TUITION_FEE value
        setFilters({ ...filters, [key]: newFilters['selectedValue'] });
        //console.log({[key]: newFilters['selectedValue'] },'on change')
        setCurrentPage(1);
    };

    const dataSorting = (newSort) => {
        //console.log(newSort,'newSort')
        if (Object.keys(newSort).length > 0) setRecordSort(newSort);
    }

    const handledReset = () => {
        setReset(true)
        setFilters({});
        setCurrentPage(1);
    }

    const handleFilterMob = () => {
        setActiveFilter(prev => !prev);
    }
 
    const setPreviousePageFilters = async () => {
        const { industryId, subjectId } = router.query || [];
        if(industryId == 'All' && isFirstRender.current) {
            fetchCourses(1, false);
            return 
        }
        if (!industryId || industryId == 'All') return;
        //console.log('ddd')
        let [slug, industId, countryId] = industryId.split("--") || [];
        const [subName, subId] = subjectId.split("--") || [];
        let urlcountry = ''
        if (countryId) {
            let cname = countryId
            if(countryId=='usa') cname = 'UNITED STATES OF AMERICA';
            if(countryId=='uk') cname = 'UNITED KINGDOM';
            urlcountry = await prerequisiteData?.data?.study_destination.find(dest => dest.name == cname.toUpperCase());
        }

        setFilters({ country_id: urlcountry?.id, INDUSTRY_ID: industId, SUBJECT_AREA_ID: subId })
    }

    useEffect(() => {
        const handleFilterClickOutside = (event) => {
            if(filterRef.current &&
                !filterRef.current.contains(event.target) &&
                filterBtnRef.current &&
                !filterBtnRef.current.contains(event.target)
             ){
                setActiveFilter(false);
             }
        }

        document.addEventListener('mousedown', handleFilterClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const filter_cart_container = document.querySelector('.filter_cart_container')?.clientHeight;
            const screenWidth = window.innerWidth;
            const mediaBreakpoint = 1000; 

            if (screenWidth <= mediaBreakpoint) return;

            if(rightFilterRef.current){
                //debugger;
                const scrollY = window.scrollY;
                const offsetTop = 150; 

                if (scrollY > offsetTop && filter_cart_container > 700) {
                    //debugger;
                    setIsSticky(true);
                    // setIsInView(false);
                } else {
                    setIsSticky(false);
                }
            }

            if(filter_cart_container > 700){
                const refsToObserve = [bottomRef, rightFilterRef];
                if (typeof window === 'undefined') return; 
                const observer = new IntersectionObserver(
                ([entry]) => {
                    setIsInView(entry.isIntersecting);
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.2,
                }
                );
                
                // if (bottomRef.current) {
                //     observer.observe(bottomRef.current);
                // }
                // if (rightFilterRef.current) {
                //     observer.observe(rightFilterRef.current);
                // }
                refsToObserve.forEach(ref => {
                    if (ref.current) {
                        observer.observe(ref.current);
                    }
                });
            
        
                return () => {
                // if (bottomRef.current) {
                //     observer.unobserve(bottomRef.current);
                // }
                refsToObserve.forEach(ref => {
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                });
                };
            } else{
                setIsInView(false);
            }
        }
        //window.addEventListener('scroll', handleScroll);
        //return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="graduate-courses-section page-filter-all">
            <TopStrip topInfoText={topString} goBackStatus={true} />
            <div className="hero_section">
                {/* <span className="hero_section__bg"></span> */}
                <div className="hero_section__inner">
                    <div className="container small-width">
                        <div className="filter_data_container">
                            <div className={`filter_data_container__left ${isSticky ? 'sticky' : ''}`} 
                                ref={rightFilterRef}>
                                <div className='filter_data_container__left--inner' 
                                style={{
                                    position: deviceType !== 'mobile' ? isInView ? 'relative' : undefined : null,
                                    top: deviceType !== 'mobile' ? isInView ? `${window.scrollY - 150}px` : undefined : null,
                                    bottom: 'auto',
                                  }} 
                                >
                                    <div className="filter_data_container__left--top">
                                        <div className="top-controls">
                                            <BackButton />
                                            <h4>
                                                Found <span>{metaInfo?.total > 0 ? metaInfo?.total : 0}</span>
                                            </h4>
                                        </div>
                                        <div className="top-controls">
                                            {deviceType !== 'desktop' ? (
                                                <>
                                                    <div className=''>
                                                        <button onClick={handleFilterMob} ref={filterBtnRef} className='filter-mob'></button>
                                                    </div>

                                                    {activeFilter ? (
                                                        <div className="filter_cart_dropdowns" ref={filterRef}>
                                                            <FilterTypes applyFilters={applyFilters} reset={reset} setReset={setReset} />
                                                        </div>
                                                    ) : null}
                                                </>
                                            ) : null}
                                            <div>
                                                <button onClick={handledReset} className='reset_btn'></button>
                                            </div>
                                            {/* <SortData dataSorting={dataSorting} /> */}
                                        </div>
                                    </div>
                                    {deviceType !== 'mobile' ? (
                                        <div className="filter_data_container__left--bottom">
                                            <div className="filter_cart_dropdowns">
                                                <FilterTypes applyFilters={applyFilters} reset={reset} setReset={setReset} />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="filter_data_container__right">
                                <div className="filter_data_container__right--top">
                                    <SearchAllFiterData query={query} handleSearch={handleSearch} />
                                    <h4 className='term_statement'>*This information is for reference only, we do not endorse any specific Universities or Courses. This information is provided solely for educational reference and we’d love to help you.</h4>
                                </div>
                                <div className="filter_data_container__right--bottom">
                                    <div className="filter_cart_container">
                                        <FilterCart filterDataAll={filteredCourses} />
                                    </div>
                                </div>
                                <div className='' ref={bottomRef} >
                                {metaInfo && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={metaInfo.last_page}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraduateSubjectsAll;
