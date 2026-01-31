

import "../styles/country.css";
import { country } from "../country";
import { useState,useRef,useEffect } from "react";
import {uuid} from '../utils/helpers'
export const Country = () => {
  const [width,setWidth] = useState(window.innerWidth)
  


  const  myRef = useRef();
  const getData =() => {
    myRef.current = window.innerWidth;
    setWidth(parseInt(myRef.current))
    
  }
  useEffect(() => {
    window.addEventListener("resize",getData)
  },[])

  return (
    <div ref = {myRef} className="m-auto relative grid grid-cols-3 grid-rows-3  md:my-6 md:drop-shadow-2xl width md:flex md:justify-between mobileView">
      {country.map((e,index) => {
           
          if(width <= 768 && index > 8){
            return
          }else{
            return (
              <figure key={uuid()} className="relative">
              <button>
              {/* to = {`/country/${e.slug}`} */}
                <a><img className="z-10 transition duration-300 transform imgDiv boxshadow hover:scale-50 md:drop-shadow-2xl"
                 src = {e.img}/></a>
              </button>
              <figcaption 
                className="displayName text-sx lg:text-base ">{e.name}</figcaption>
          </figure>
            )
          }
         
})}
      
    </div>
  );
};