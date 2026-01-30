import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { slugify } from '../utils/helpers';

const CategoryGrid = (props) => {
  const router = useRouter();
  const { countryId, industryId } = router.query;
  const url = (countryId) ? '--' + countryId : ''

  console.log(props?.categoryDetails);
  return (
    <React.Fragment>
      {props?.categoryDetails?.map((item, index) => {
        // Generate slug from name if slug doesn't exist
        const itemSlug = item?.slug || slugify(item?.name || item?.title || '');
        const itemId = item?.id;
        const itemName = item?.name || item?.title || '';
        
        // Generate href based on whether industryId exists
        const href = industryId 
          ? '/industry/' + industryId + '/' + slugify(itemName) + '--' + itemId 
          : '/industry/' + itemSlug + '--' + itemId + url;
        
        return (
        <Link href={href} key={(item?.slug || item?.id || index) + '_' + index} passHref legacyBehavior>
          <div className='grid_item'>
            {props?.slugCat ? (
              <span className={props?.slugCat + ' icon_' + index}></span>
            ) : (
              <Image src={item?.iconName} alt={item?.name} width={40} height={40} />
            )}
            <p>{(item?.name) ? item?.name : item?.title}</p>
          </div>
        </Link>
        );
      })}
    </React.Fragment>
  )
}

export default CategoryGrid
