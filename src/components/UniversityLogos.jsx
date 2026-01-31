import React from 'react'
import "../styles/university.css"
import { useRef, useState, useEffect } from 'react'
import { uniLogos } from "../universitylogos"

const getLogos = (width,logos)=>{
  let images = (logos === 0) ? uniLogos.slice(0, 30) : uniLogos.slice(30, 60)
  let arr = [...images];
  if (width && width <= 767) {
    arr = []
    for (var index = 0; index < 12; index++) {
      var randomNumber = Math.floor(Math.random() * images.length);
      arr.push(images[randomNumber]);
    }
  }
  return arr
}
export const UniversityLogos = ({ logos = 0 }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [images, setImages] = useState(getLogos(width,logos))

  const myRef = useRef();
  const getData = () => {
    myRef.current = window.innerWidth;
    setWidth(parseInt(myRef.current))
  }



  useEffect(async () => {
    setInterval(() => {
      swap();
    }, 2500);
  }, [])


  useEffect(() => {
    window.addEventListener("resize", getData)
  }, [width])



  function swap() {
    let arr = [...images]
    if(!arr.length) return
    let i = Math.floor(Math.random() * arr.length);
    let j = Math.floor(Math.random() * arr.length);
    let k = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    let temp1 = arr[j];
    let temp2 = arr[k];
    arr[k] = temp;
    arr[j] = temp1;
    arr[i] = temp2;
    setImages(arr)
  }


  return (
    <div ref={myRef} className='w-full h-full'>
      <div className=" relative grid grid-cols-3 grid-rows-3  shuffle gap-y-4 md:grid md:grid-cols-10 md:gap-y-2">
        {
          images.map((item, index) =>
            <img key={'index_uni_logo' + index} id={"image-" + (index + logos)} src={item.img} alt="logo" />
          )

        }
      </div>
    </div>
  )
}
