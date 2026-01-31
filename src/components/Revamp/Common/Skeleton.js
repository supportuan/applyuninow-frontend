import React from 'react'

const Skeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton__right">
                <div className="square"></div>
            </div>
            <div className="skeleton__left">
                <div className="line w40"></div>
                <div className="line h18"></div>
            </div>
        </div>
    )
}

export default Skeleton
