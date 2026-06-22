import React, { useEffect, useState, useRef, useCallback } from 'react';
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
    const topString = '3,43,000+ graduate courses to choose from 22 study destinations';
    const router = useRouter();
    const { BASE_URL } = useAppContext();

    const [allCourses, setAllCourses] = useState([]);
    const [pagedCourses, setPagedCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filters, setFilters] = useState({});
    const [metaInfo, setMetaInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const [reset, setReset] = useState(false);
    const [recordSort, setRecordSort] = useState([]);
    const [activeFilter, setActiveFilter] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [filterSticky, setFilterSticky] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const filterRef = useRef();
    const filterBtnRef = useRef();
    const rightFilterRef = useRef();
    const bottomRef = useRef(null);
    
    // Guards to prevent double API calls
    const fetchInProgress = useRef(false);
    const lastFetchParams = useRef(null);
    const debounceTimer = useRef(null);

    const fetchCourses = useCallback(async (page = 1, isFilterApplied = false) => {
        // Prevent duplicate calls with same params
        const fetchKey = JSON.stringify({ filters, recordSort, page });
        
        // If same request is already in progress or was just made, skip
        if (fetchInProgress.current) {
            return;
        }
        
        if (lastFetchParams.current === fetchKey) {
            return;
        }
        
        fetchInProgress.current = true;
        lastFetchParams.current = fetchKey;
        setIsLoading(true);
        setError(null);
        
        try { 
            // Clean filters - remove empty strings, null, undefined, and 0 values
            const cleanedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined && value !== '' && value !== 0) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            
            const filtersMain = { ...cleanedFilters, page: page }
            let filterData = { filters: filtersMain, order: recordSort }
            const url = `${BASE_URL}/course/courseCart`;

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
            // Set error state for user feedback
            setError(err?.response?.data?.message || 'Failed to load courses. Please try again.');
            setAllCourses([]);
            setPagedCourses([]);
            setFilteredCourses([]);
            setMetaInfo(null);
        } finally {
            setIsLoading(false);
            fetchInProgress.current = false;
        }
    }, [filters, recordSort, BASE_URL]);

    useEffect(() => {
        // Clear any pending debounced calls
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (isFirstRender.current && router.isReady) {
            // Set filters from URL first, then fetch
            setPreviousePageFilters();
            isFirstRender.current = false;
            i++;
            // Don't return early - let the filters update trigger the fetch
            return;
        }
        
        // Only fetch if filters are actually set (not empty object)
        const hasFilters = Object.keys(filters).length > 0;
        if (!hasFilters && router.isReady) {
            // If no filters but router is ready, try to set them from URL
            setPreviousePageFilters();
            return;
        }
        
        // Debounce to prevent rapid successive calls
        debounceTimer.current = setTimeout(() => {
            if (hasFilters || router.query.industryId === 'All') {
                fetchCourses(1, false);
            }
        }, 150);
        
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, recordSort, router.isReady]);
    
    //CONDITION TO CHECK PAGE IS RELOADED
    useEffect(() => {
        if (Object.keys(router.query).length > 0 && isFirstRender.current && router.isReady) {
            setTimeout(() => {
                if (i === 1) {
                    setPreviousePageFilters();
                }
                i++;
            }, 500);
        }
    }, [router.isReady, router.query]);

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
        setReset(true);
        lastFetchParams.current = null; // Clear fetch cache to allow new request
        
        // Preserve URL-based filters if they exist
        const { industryId, subjectId } = router.query || {};
        
        if (industryId && industryId !== 'All') {
            // Keep URL-based filters, only clear user-applied filters
            const [slug, industId, countryId] = industryId.split("--") || [];
            const [subName, subId] = subjectId?.split("--") || [];
            
            // Rebuild filters from URL only
            const urlFilters = {};
            if (industId) urlFilters.INDUSTRY_ID = industId;
            if (subId) urlFilters.SUBJECT_AREA_ID = subId;
            
            // Get country ID if exists and prerequisiteData is loaded
            if (countryId && prerequisiteData?.data?.study_destination) {
                let cname = countryId;
                if(countryId === 'usa') cname = 'UNITED STATES OF AMERICA';
                if(countryId === 'uk') cname = 'UNITED KINGDOM';
                const urlcountry = prerequisiteData.data.study_destination.find(
                    dest => dest.name === cname.toUpperCase()
                );
                if (urlcountry?.id) {
                    urlFilters.country_id = urlcountry.id;
                }
            }
            
            setFilters(urlFilters);
        } else {
            // Complete reset - clear everything
            setFilters({});
        }
        
        setCurrentPage(1);
    }

    const handleFilterMob = () => {
        setActiveFilter(prev => !prev);
    }
 
    const setPreviousePageFilters = async () => {
        const { industryId, subjectId } = router.query || {};
        if(industryId == 'All' && isFirstRender.current) {
            setFilters({});
            fetchCourses(1, false);
            return 
        }
        if (!industryId || industryId == 'All') {
            setFilters({});
            return;
        }
        
        let [slug, industId, countryId] = industryId.split("--") || [];
        const [subName, subId] = subjectId?.split("--") || [];
        let urlcountry = null;
        
        // Wait for prerequisiteData to be loaded if countryId exists
        if (countryId && prerequisiteData?.data?.study_destination) {
            let cname = countryId;
            if(countryId === 'usa') cname = 'UNITED STATES OF AMERICA';
            if(countryId === 'uk') cname = 'UNITED KINGDOM';
            urlcountry = prerequisiteData.data.study_destination.find(
                dest => dest.name === cname.toUpperCase()
            );
        }

        // Convert to numbers and ensure they're valid
        const industryIdNum = industId ? parseInt(industId, 10) : null;
        const subjectAreaIdNum = subId ? parseInt(subId, 10) : null;
        const countryIdNum = urlcountry?.id ? parseInt(urlcountry.id, 10) : null;

        // Only set filters if we have valid IDs
        const newFilters = {};
        if (industryIdNum && !isNaN(industryIdNum) && industryIdNum > 0) {
            newFilters.INDUSTRY_ID = industryIdNum;
        }
        if (subjectAreaIdNum && !isNaN(subjectAreaIdNum) && subjectAreaIdNum > 0) {
            newFilters.SUBJECT_AREA_ID = subjectAreaIdNum;
        }
        if (countryIdNum && !isNaN(countryIdNum) && countryIdNum > 0) {
            newFilters.country_id = countryIdNum;
        }

        setFilters(newFilters);
        
        // Return the filters so they can be used immediately if needed
        return newFilters;
    }

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
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
        
        return () => {
            document.removeEventListener('mousedown', handleFilterClickOutside);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const handleScroll = () => {
            const filter_cart_container = document.querySelector('.filter_cart_container')?.clientHeight;
            const screenWidth = window.innerWidth;
            const mediaBreakpoint = 1000; 

            if (screenWidth <= mediaBreakpoint) return;

            if(rightFilterRef.current && typeof window !== 'undefined'){
                const scrollY = window.scrollY;
                const offsetTop = 150; 

                if (scrollY > offsetTop && filter_cart_container > 700) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }

            if(filter_cart_container > 700){
                setIsInView(false);
            } else {
                setIsInView(false);
            }
        }

        // Set up IntersectionObserver separately for proper cleanup
        let observer = null;
        if (typeof window !== 'undefined' && window.IntersectionObserver) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    setIsInView(entry.isIntersecting);
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.2,
                }
            );
            
            const refsToObserve = [bottomRef, rightFilterRef];
            refsToObserve.forEach(ref => {
                if (ref.current) {
                    observer.observe(ref.current);
                }
            });
        }

        // Cleanup function
        return () => {
            if (observer) {
                const refsToObserve = [bottomRef, rightFilterRef];
                refsToObserve.forEach(ref => {
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                });
                observer.disconnect();
            }
        };
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
                                    top: deviceType !== 'mobile' ? isInView ? (typeof window !== 'undefined' ? `${Math.max(0, window.scrollY - 150)}px` : undefined) : undefined : null,
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
                                        <div className="top-controls filter-reset-controls">
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
                                    {isLoading && (
                                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                                            <p>Loading courses...</p>
                                        </div>
                                    )}
                                    {error && !isLoading && (
                                        <div style={{ padding: '2rem', textAlign: 'center', color: '#d32f2f' }}>
                                            <p>{error}</p>
                                            <button 
                                                onClick={() => fetchCourses(currentPage)}
                                                style={{ 
                                                    marginTop: '1rem', 
                                                    padding: '0.5rem 1rem', 
                                                    cursor: 'pointer',
                                                    backgroundColor: '#0070f3',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    {!isLoading && !error && (
                                        <div className="filter_cart_container">
                                            <FilterCart filterDataAll={filteredCourses} />
                                        </div>
                                    )}
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
