import React, { useState, useEffect, useRef } from 'react';
import { sortOptionsData } from '../utils/helpers';

const SortData = ({dataSorting}) => {
  const [activeContainer, setActiveContainer] = useState(false);
  const [activeSort, setActiveSort] = useState({});
  const sortRef = useRef();
  const sortButton = useRef();

  const handledSorting = () => {
    setActiveContainer(prev => !prev);
  }

  const handleSortClick = (section, option) => {
    setActiveSort(prev => ({
      ...prev,
      [section]: option.id,
    }));
   
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(
          sortRef.current && 
          !sortRef.current.contains(event.target) &&
          sortButton.current &&
          !sortButton.current.contains(event.target)
        ){
        setActiveContainer(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  },[]);
  
  useEffect(() => {
    dataSorting(activeSort)
  }, [activeSort])
  
  return (
    <div className='sort-section'>
      <button onClick={handledSorting} ref={sortButton}  className='sorting_btn'></button>
      {activeContainer ? (
        <div className='sort-container' ref={sortRef}>
          {sortOptionsData.map((item, index) =>
            <div key={index} className="sort-section">
              <h4>{item?.label}</h4>
              <div className="button-group">
                {item?.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`sort-btn ${activeSort[item?.key] === opt.id ? 'active' : ''
                      }`}
                    onClick={() => handleSortClick(item?.key, opt)}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default SortData
