import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { slugify } from '../utils/helpers';

const CategoryGrid = (props) => {
  const router = useRouter();
  const { countryId, industryId } = router.query;
  const url = countryId ? '--' + countryId : '';
  const { categoryDetails = [], slugCat, onSelect, selectedId } = props;

  return (
    <React.Fragment>
      {categoryDetails.map((item, index) => {
        const label = item?.name || item?.title || 'Category';
        const itemKey = item?.slug
          ? `${item.slug}_${index}`
          : `${item?.id || label}_${index}`;
        const isSelected =
          selectedId !== undefined &&
          selectedId !== null &&
          String(selectedId) === String(item?.id);

        const gridItem = (
          <div
            className={`grid_item${isSelected ? ' active' : ''}`}
            onClick={onSelect ? () => onSelect(item, index) : undefined}
            onKeyDown={
              onSelect
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(item, index);
                    }
                  }
                : undefined
            }
            role={onSelect ? 'button' : undefined}
            tabIndex={onSelect ? 0 : undefined}
          >
            {slugCat ? (
              <span
                className={`${slugCat} icon_${item.iconIndex ?? index}`}
              ></span>
            ) : item?.iconName ? (
              <Image src={item.iconName} alt={label} width={40} height={40} />
            ) : null}
            <p>{label}</p>
          </div>
        );

        if (onSelect) {
          return <React.Fragment key={itemKey}>{gridItem}</React.Fragment>;
        }

        return (
          <Link
            href={
              industryId
                ? industryId + '/' + slugify(item?.name) + '--' + item?.id
                : 'industry/' + item?.slug + '--' + item?.id + url
            }
            key={itemKey}
            passHref
            legacyBehavior
          >
            {gridItem}
          </Link>
        );
      })}
    </React.Fragment>
  );
};

export default CategoryGrid;
