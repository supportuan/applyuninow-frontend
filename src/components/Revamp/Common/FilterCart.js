import Image from 'next/image';
import React from 'react';
import infoIcon from "../../../Images/rev/info_icon.svg";
import Like from './Like';
import { usePageContext } from '../context/PageContext';
import carrow from "../../../Images/rev/control_arrow.svg";


const FilterCart = (props) => {
    const resultAll = props?.filterDataAll;
    const noRecordFound = "Oops! We couldn’t find any courses for the selected subject right now. Please try exploring other categories or check back soon.";

    const { deviceType } = usePageContext();

    const convertMonthsToYearsAndMonths = (months) => {
        months = parseInt(months, 10);
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        let str = years > 1 ? `${years} years` : `${years} year`
        if (remainingMonths > 0) str += `, ${remainingMonths} months`
        return str;
    }
    return (
        <React.Fragment>
            {resultAll.length ? resultAll?.map((item, index) =>
                <div className='filter-cart-item' key={'filter_' + index} >
                    <div className='filter-cart-item__left'>
                        <div className='university-detail'>
                            <figure>
                                <img src={item?.university?.logo} width={80} height={80} alt={item?.university?.name} />
                            </figure>
                            <div className=''>
                                <h3>{item?.university?.name}</h3>
                                <h4>{item?.university?.city !== '*~*' ? item?.university?.city : item?.university?.country?.name}</h4>
                            </div>
                        </div>
                        <div className='course-details'>
                            <h2 title={item?.course_name}>{item?.course_name}</h2>
                            <p>{item?.course_level} <span>/</span>  Full Time <span>/</span> On Campus</p>
                        </div>
                        {deviceType !== 'desktop' ? (
                            <div className='filter-cart-item__right'>
                                <div className='fee-duration'>
                                    <div className='duration'>{convertMonthsToYearsAndMonths(item?.duration)}</div>
                                    <div className='fee-amt'>{item?.tuition_fee} <span>/ Year</span></div>
                                </div>
                            </div>
                        ) : null}
                        <div className='course-etc'>
                            <div className='intakes etc-item'>
                                Intakes: {<span>{item?.intakes}</span>}
                            </div>
                            <div className='app-fee etc-item'>
                                Application Fee: <span> {item?.application_fee}</span>
                            </div>
                            <div className='ranking etc-item'>
                                Ranking: <Image src={infoIcon} width={18} height={18} alt='Info' />
                                <div className='ranking__inner'>
                                    <ul>
                                        <li>News Ranking - <span>{item?.university?.news_ranking}</span></li>
                                        <li>QS Ranking - <span>{item?.university?.qs_ranking}</span></li>
                                        <li>Webometrics National Ranking - <span>{item?.university?.webometrics_national_ranking}</span></li>
                                        <li>Webometrics World Ranking - <span>{item?.university?.webometrics_world_ranking}</span></li>
                                    </ul>
                                </div>
                            </div>
                            {deviceType !== 'desktop' ? (
                            <a className='controls' href="/subscribe">
                                <figure className='before_hover'>
                                    <Image src={carrow} width={40} height={38}  alt='Hover' />
                                </figure>
                                <div className='scholorship'>
                                    <span>Scholarship</span>
                                    <span>Know your eligibility</span>
                                </div>
                            </a>
                            ) : null}
                        </div>
                    </div>
                    {deviceType !== 'mobile' ? (
                        <div className='filter-cart-item__right'>
                            {/* <Like /> */}
                            <div className='fee-duration'>
                                <div className='duration'>{convertMonthsToYearsAndMonths(item?.duration)}</div>
                                <div className='fee-amt'>{item?.tuition_fee} <span>/ Year</span></div>
                            </div>
                            <a className='controls' href="/subscribe">
                                <figure className='before_hover'>
                                    <Image src={carrow} width={40} height={38}  alt='Hover' />
                                </figure>
                                <div className='scholorship'>
                                    <span>Scholarship</span>
                                    <span>Know your eligibility</span>
                                </div>
                            </a>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="grid-container">
                    <div className='grid_item norecord'>
                        <p>{noRecordFound}</p>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default FilterCart;
