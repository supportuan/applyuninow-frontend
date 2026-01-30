import React from 'react';
import { usePageContext } from '../context/PageContext';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const {deviceType} = usePageContext();
  let disPages = deviceType !== 'desktop' ? 2 : 8;

  if (totalPages <= 8) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 6) {
      for (let i = 1; i <= disPages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 5) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 7; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  const handleClick = (page) => {
    if (page === '...') return;
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
      >
        &lt; Back
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={`pagination-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
          onClick={() => handleClick(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
