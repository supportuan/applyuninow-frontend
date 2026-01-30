import React from "react";

const SelectOptions = ({
  placeholder,
  handleChange,
  value,
  helperText,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <select
        type="text"
        className={`border w-full pl-4 ${
          error ? "border-red" : "border-[#404050]"
        }  h-[55px] bg-[#2F3344] rounded text-[#6A6A78]`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      >
        <option value="" className="audio">
          Select your option
        </option>
      </select>
      <p className="text-red font-Euclidregular text-xs">{helperText}</p>
    </div>
  );
};

export default SelectOptions;
