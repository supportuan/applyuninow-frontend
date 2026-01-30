import Image from 'next/image';
import React from 'react'
import Link from 'next/link';

const CartLarge2 = (props) => {
    const resourcesData = props?.info;
    return (
        <section className="large-card-item2" style={{ backgroundColor: resourcesData?.bgColor }}>
            <div className='image_container'>
                <Image src={resourcesData?.icon} width={70} height={100} alt={resourcesData?.title} />
                <h3>{resourcesData?.title}</h3>
            </div>

            <div className='text_container'>
                {resourcesData?.items?.map((item, index) =>
                    <>
                        {item?.title && <h4>{item?.title}</h4>}
                        {item?.description && <p>{item?.description}</p>}
                        {item?.types ? (
                            <ul key={'types_' + index}>
                                {item?.types.map((sitem, iidex) =>
                                    <li key={'sitem_' + iidex}>{sitem}</li>
                                )}
                            </ul>
                        ) : null}
                    </>
                )}
            </div>
            {resourcesData?.button && <div className='btn_controls'><a className='btn' href={'/explore'}>{resourcesData?.button}</a></div>}
        </section>
    )
}

export default CartLarge2
