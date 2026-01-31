import React from "react";

const Button = ({ children, handleSubmit, width }) => {
  return (
    <div>
      <button className={`w-${width} p-2 button-class`} onClick={handleSubmit}>
        <p className=" text-[#262938]">{children}</p>
      </button>
    </div>
  );
};

export default Button;
