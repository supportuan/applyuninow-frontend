import React from 'react'
import "../styles/featureLogo.css"
import featureLogos  from "../feature.json"
import {uuid} from '../utils/helpers'

export const FeatureLogos = () => {

  return (
    <>
      <div className="container relative hidden grid-cols-10 gap-4 p-8 px-2 m-auto feature_gray_div lg:grid md:py-8 md:grid-cols-10">
        {
          featureLogos.map((item,index) => {
            return (<>
              <div key={uuid()}  className="box-border relative flex-col flex-wrap items-center justify-center hidden px-2 text-xs leading-relaxed text-center break-word tab-list list gray_box rounded-xl md:h-28 sm:flex bg-tabBG">
                <p className="text-darkred">{item.title}</p>
                <p className={`text-darkblue ${item.class}`}>{item.detail} </p>
              </div>
            </>
            )
          })
        }
      </div>
    </>
  )
}
