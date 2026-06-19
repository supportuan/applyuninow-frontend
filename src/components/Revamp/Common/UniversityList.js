import React, { useMemo } from 'react'
import Image from 'next/image';

const UniversityList = (props) => {
    const unList = props?.infoList;

    const universities = useMemo(() => {
        return Array.isArray(unList)
            ? unList.filter((item) => {
                const iconSrc = typeof item?.icon === 'string' ? item.icon : item?.icon?.src;
                return Boolean(iconSrc);
            })
            : [];
    }, [unList]);

    if (universities.length === 0) {
        return null;
    }

    // Duplicate the list so the marquee can loop seamlessly.
    const marqueeItems = [...universities, ...universities];

    const renderItem = (item, index, keyPrefix) => {
        const iconSrc = typeof item?.icon === 'string' ? item.icon : item?.icon?.src;
        return (
            <div
                key={`${keyPrefix}_${item?.name || 'uni'}_${index}`}
                className='university-list__item'
                aria-hidden={keyPrefix === 'dup' ? 'true' : undefined}
            >
                <Image alt={item?.detail || item?.name || 'University logo'} src={iconSrc} width={218} height={124} />
            </div>
        );
    };

    return (
        <div className='container min-width university-list'>
            <div className='university-list__inner'>
                <div className="module-divider"></div>
                <div className='university-list__marquee'>
                    <div className='university-list__track'>
                        {marqueeItems.map((item, index) =>
                            renderItem(item, index, index < universities.length ? 'orig' : 'dup')
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .university-list__marquee {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0,
                        black 80px,
                        black calc(100% - 80px),
                        transparent 100%
                    );
                            mask-image: linear-gradient(
                        to right,
                        transparent 0,
                        black 80px,
                        black calc(100% - 80px),
                        transparent 100%
                    );
                }
                .university-list__track {
                    display: flex;
                    flex-wrap: nowrap;
                    width: max-content;
                    gap: 48px;
                    align-items: center;
                    animation: university-list-scroll 40s linear infinite;
                    will-change: transform;
                }
                .university-list__marquee:hover .university-list__track {
                    animation-play-state: paused;
                }
                @keyframes university-list-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .university-list__track {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    )
}

export default UniversityList
