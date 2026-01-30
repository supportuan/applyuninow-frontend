import React from "react";

const Input = ({ placeholder, handleChange, value, helperText, error }) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className={`border w-full pl-4 ${
          error ? "border-red" : "border-[#404050]"
        }  h-[55px] bg-[#2F3344] rounded`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
      <p className="text-red font-Euclidregular text-xs">{helperText}</p>
    </div>
  );
};

export default Input;
