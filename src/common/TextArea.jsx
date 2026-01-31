import React from "react";

const TextArea = ({
  placeholder,
  id,
  name,
  rows,
  className,
  value,
  error,
  handleChange,
  helperText,
  bgcolor
}) => (
  <div className="relative">
    <textarea
      className={`mb-3 w-full border border-border  bg-[#262938] rounded-lg  text-white p-4 placeholder-placeholder focus:outline focus:outline-red placeholder:text-textgray border-gradient hover:border-white  ${
        error && "border-red placeholder:text-red"
      }`}
      name={name}
      id={id}
      rows={rows}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
    {helperText && (
      <p className="absolute -bottom-1 ml-4 text-red text-xs">{helperText}</p>
    )}
  </div>
);

export default TextArea;
