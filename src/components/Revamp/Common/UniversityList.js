import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { uList } from '../utils/helpers';
const UniversityList = (props) => {

    const unList = props?.infoList;
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        if (Array.isArray(unList)) {
            setUniversities(unList);
        }
    }, [unList]);

    const shuffleThree = (arr) => {
        const newArr = [...arr];
        const indices = [];

        while (indices.length < 3) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if (!indices.includes(randomIndex)) indices.push(randomIndex);
        }

        const shuffledSelection = indices.map((index) => newArr[index]);
        shuffledSelection.sort(() => Math.random() - 0.5);

        indices.forEach((index, i) => {
            newArr[index] = shuffledSelection[i];
        });

        return newArr;
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setUniversities((prev) => shuffleThree(prev));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='container min-width university-list'>
            <div className='university-list__inner'>
                <div className="module-divider"></div>
                <div className='university-list__container'>
                    {universities.map((item, index) => {
                        const iconSrc = typeof item?.icon === 'string' ? item.icon : item?.icon?.src;
                        if (!iconSrc) return null;
                        return (
                            <div key={item?.name + '_' + index} className='university-list__item'>
                                <Image alt={item?.detail} src={iconSrc} width={218} height={124} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default UniversityList
