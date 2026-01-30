import React, { useState } from 'react';
import { usePagination, DOTS } from './usePagination';
import './pagination.scss';
import { uuid } from '../../../utils/helpers'

export const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const [customPageNo, setcustomPageNo] = useState('');

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && Number(customPageNo) > 0 &&  paginationRange && (Number(customPageNo) <=  paginationRange[paginationRange.length - 1])) {
      onPageChange(Number(customPageNo));
    }
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const handleInputChange = (event) => {
    let {value} = event.target
    if(value && Number(value) === 0) return
    const re = /^[0-9\b]+$/;
      if ((value && !re.test(value)) || ( paginationRange && (Number(value) >  paginationRange[paginationRange.length - 1]))) {
        return;
      }
    setcustomPageNo(value);
  };


  return (
    <div className='flex flex-col md:flex-row space-x-6 justify-center pb-4'>
      <ul
        className={`pagination-container ${className}`}
      >
        <li
          key={uuid()}
          className={` ${currentPage === 1 ? 'disabled' : ''
            }`}
          onClick={onPrevious}
        >
          <div className="arrow flex items-center justify-center">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.53125 1L1.03125 5.25L5.53125 9.5" stroke="#151929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li key={uuid()} className="flex items-end justify-center pb-1 dots">&#8230;</li>;
          }

          return (
            <li key={uuid()}
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''
                }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li key={uuid()}
          className={` ${currentPage === lastPage ? 'disabled' : ''
            }`}
          onClick={onNext}
        >
          <div className="arrow flex items-center justify-center">
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.53125 10L6.03125 5.75L1.53125 1.5" stroke="#151929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </li>
      </ul>
      <div className="hidden lg:flex space-x-6 justify-center items-center text-white relative">
        <span className='hidden md:block w-[1px] h-[25px] bg-[#404050]'></span>
        <p className="text-sm lg:ml-2">Page:</p>
        <div className="h-[40px] w-[84px] pagination-input-sec relative px-2 flex justify-center items-center rounded-md border border-arsenic  bg-transparent hover:border-[1px] hover:border-[#FFF]">
          <input
            type="text"
            value={customPageNo}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="h-full relative w-full border-0 outline-none pl-1 rounded-md bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
