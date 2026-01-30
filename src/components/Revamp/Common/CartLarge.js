import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import carrow from "../../../Images/rev/control_arrow_black.svg";

const CartLarge = (props) => {
    const itemData = props?.info;
    const router = useRouter();
    const { prefId, prefSubId } = router.query;

    return (
        <section key={itemData?.code} className="card-item"
            style={{ backgroundColor: itemData?.bgColor }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 20px 10px ${itemData?.bgColor}`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `none`;
            }}
        >
            {itemData?.code ? (
                <h2>{itemData?.code}</h2>
            ) : null}
            <h3>{itemData?.name || itemData?.title}</h3>

            {itemData?.description ? (
                <p>{itemData?.description}</p>
            ) : null}

            {itemData?.points?.length ? (
                <>
                    {itemData?.points.map((item, index) =>
                        <p key={index}>{item}</p>
                    )}
                </>
            ) : null}
            {prefId ? (
                <>
                    <a href={prefId ? prefId + '/' + itemData?.id : itemData?.id} className='btn'>Learn more <span>→</span></a>
                    <figure className='before_hover'>
                        <Image src={carrow} width={25} height={24} alt='Hover' />
                    </figure>
                </>
            ) : null}

            {itemData?.link ? (
                <>
                    <a href={itemData?.link} className='btn'>Learn more <span>→</span></a>
                    <figure className='before_hover'>
                        <Image src={carrow} width={25} height={24} alt='Hover' />
                    </figure>
                </>
            ) : null}

        </section>
    )
}

export default CartLarge;
