import GraduateSubjects from '../../src/components/Revamp/Common/GraduateSubjects';
import GraduateSubjectsAll from '../../src/components/Revamp/Common/GraduateSubjectsAll';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function IndustryDynamicRoute() {
  const router = useRouter();
  const { slug } = router.query;
  const [queryParams, setQueryParams] = useState({ industryId: null, subjectId: null });
  
  useEffect(() => {
    if (!router.isReady || !slug) return;
    
    // slug will be an array: ['computer-science-it--5'] for single route
    // or ['computer-science-it--5', 'artificial-intelligence--81'] for nested route
    const slugArray = Array.isArray(slug) ? slug : [slug];
    
    // Parse the first slug: 'computer-science-it--5' -> industryId = 'computer-science-it--5'
    const industryIdParam = slugArray[0];
    
    // Parse the second slug if nested: 'artificial-intelligence--81' -> subjectId = 'artificial-intelligence--81'
    let subjectIdParam = null;
    if (slugArray.length === 2 && slugArray[1]) {
      subjectIdParam = slugArray[1];
    }
    
    // Update router.query by creating a new query object
    const newQuery = {
      ...router.query,
      industryId: industryIdParam,
    };
    
    if (subjectIdParam) {
      newQuery.subjectId = subjectIdParam;
    }
    
    // Update the query params state
    setQueryParams({
      industryId: industryIdParam,
      subjectId: subjectIdParam,
    });
    
    // Update router.query directly (this is a workaround for Next.js)
    Object.keys(router.query).forEach(key => {
      if (key !== 'industryId' && key !== 'subjectId') {
        delete router.query[key];
      }
    });
    Object.assign(router.query, newQuery);
  }, [router.isReady, slug]);
  
  if (!router.isReady || !slug) {
    return null;
  }
  
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const isNestedRoute = slugArray.length === 2;
  
  if (isNestedRoute) {
    return <GraduateSubjectsAll />;
  }
  
  return <GraduateSubjects />;
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const industryId = slugArray[0] || null;
  const subjectId = slugArray.length === 2 ? slugArray[1] : null;
  
  return {
    props: {
      industryId: industryId,
      subjectId: subjectId,
    },
  };
}
