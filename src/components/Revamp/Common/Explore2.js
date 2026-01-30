import React, {useEffect} from 'react';
import { usePageContext } from '../context/PageContext';


const Explore = () => {
  const { prerequisiteData, isPrerequisiteLoaded } = usePageContext();

  useEffect(() => {
    if(isPrerequisiteLoaded){
        console.log(prerequisiteData);
    }
  }, [isPrerequisiteLoaded, prerequisiteData]);
  

  return (
    <div>
    {!isPrerequisiteLoaded ? (
      <div>Loading explore data...</div>
    ) : (
      <div>
        {/* Render your explore content here */}
        <pre>{JSON.stringify(prerequisiteData, null, 2)}</pre>
      </div>
    )}
  </div>
  )
}

export default Explore
