import React from 'react'
import TopStrip from '../Common/TopStrip';
import BlogCard from '../Common/BlogCard';
import { blogCardData } from '../utils/helpers';

const Blogs = () => {
  const topString = 'Blogs & News';
  
  return (
    <div className='country-detail-section'>
      <TopStrip topInfoText={topString} goBackStatus={true} />
      <div className='container small-width'>
        <div className="blog-grid">
          {blogCardData.map((item, index) => (
            <BlogCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs;
