import React from "react";

const SearchBar = ({ handleChange, value, name, width, bg, placeholder }) => {
  const handleKeyPress = (e) => {
    if (e.target.value.length === 0  && e.code === 'Space') e.preventDefault()
    return;
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="input-group relative flex flex-row items-stretch w-full mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              data-icon="search"
              className="w-4 absolute top-[14px] left-2 z-10 focus:hidden gap-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11.7669"
                cy="11.7666"
                r="8.98856"
                stroke="#C41230"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.0186 18.4851L21.5426 22"
                stroke="#C41230"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="search"
              className={`h-[54px] bg-[#F5F8FF] form-control relative flex-auto min-w-0 block w-full px-9 py-1.5
                    text-base font-normal text-[#27282D] dark:text-white bg-clip-padding ${
                      !bg ? "bg-[#F5F8FF]" : bg
                    }
                    rounded-lg transition ease-in-out m-0 focus:outline-none`}
              placeholder={placeholder}
              aria-label="Search"
              aria-describedby="button-addon2"
              name={name}
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
