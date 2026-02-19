import React, { useEffect, useState } from 'react';
import TopStrip from './TopStrip';
import CategoryGrid from './CategoryGrid';
import { subjectByIndustry } from '../utils/helpers';
import { useRouter } from 'next/router';
//import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';
import axios from 'axios';
import Skeleton from './Skeleton';

const GraduateSubjects = () => {
    const { BASE_URL } = useAppContext();
    const topString = '3,43,000+ graduate courses to choose from 9 study destinations';

    const router = useRouter();
    const { industryId } = router.query;
    const [engVal, setEngVal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [slugName, setSlugName] = useState('');

    //const subjectList = subjectByIndustry[industryId];

    const noRecordFound = "Oops! We couldn’t find any courses for the selected subject right now. Please try exploring other categories or check back soon.";

    useEffect(() => {
        if (!router.isReady) return;

        if (industryId) {
            const [slug, industId, countryId] = industryId.split("--") || [];
            getStudyArea(industId);
            setSlugName(slug);
        }
    }, [router.isReady, router.query])


    const getStudyArea = async (id) => {
        try {
            setLoading(true);
            const url = `${BASE_URL}/study-areas?industry_id=${id}`;
            const res = await axios.get(url);
            const studyData = res?.data?.data;
            setEngVal(Array.isArray(studyData) ? studyData : []);
        } catch (error) {
            console.error("Failed to fetch study areas:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='graduate-courses-section'>
            <TopStrip topInfoText={topString} />
            <div className='hero_section'>
                {/* <span className='hero_section__bg'></span> */}

                <div className='hero_section__inner'>
                    <div className='container small-width pad-mob-none'>
                        <h2 className='page-heading'>Discover more options</h2>
                        <div className="grid-container">
                            {!loading ? (
                                <>
                                {engVal.length ? (
                                <CategoryGrid categoryDetails={engVal} slugCat={slugName} />
                                ) : (
                                    <div className='grid_item norecord'>
                                        <p>{noRecordFound}</p>
                                    </div>
                                )}
                                </>
                            ) : (
                                <div className='skeleton-container'>
                                    <Skeleton />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraduateSubjects;
