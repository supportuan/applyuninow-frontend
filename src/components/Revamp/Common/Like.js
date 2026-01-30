import React, { useState } from 'react'

const Like = () => {
    const [wishList, setWishList] = useState();
    const handledLike = (e) => {
        setWishList(prev => !prev);
    }
  return (
    <div>
      <button className={`like_btn ${wishList ? 'liked' : ''}`} onClick={handledLike}></button>
    </div>
  )
}

export default Like;
