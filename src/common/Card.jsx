import React from "react";

const Card = ({ count, label, color }) => {
  return (
    <div >
      <div className="max-w-[146px] lg:w-[150px] stats-box">
        <p className={`audio text-base md:text-4xl text-center mb-2 ${color}`}>{count || 0}</p>
        <p className="text-xs text-center">{label}</p>
      </div>
    </div>
  );
};

export default Card;
