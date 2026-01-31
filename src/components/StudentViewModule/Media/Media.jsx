import React from "react";
import Instagram from "../../../assets/navbar/Instagram.svg";
import Facebook from "../../../assets/navbar/Facebook.svg";
import LinkedIn from "../../../assets/navbar/LinkedIn.svg";
import Twitter from "../../../assets/navbar/Twitter.svg";
import ArrowRight from "../../../assets/navbar/ArrowRight.svg";

const Media = () => {
  return (
    <div className="p-2 md:p-6">
      <p className="text-xl font-audiowide gradient-text mt-1 lg:mt-0">
        <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
          {" "}
          Social media…
        </span>
      </p>
      <p className="text-xs pb-2 text-primary">Follow.. Like.. Share..</p>

      <a
        href={"https://www.instagram.com/applyuninow/"}
        target="_blank"
        rel="noreferrer"
      >
        <div className="bg-light flex justify-between p-4 rounded-lg mt-4 md:mt-4">
          <div className="flex gap-4">
            <img src={Instagram} alt="" />
            <p>Instagram</p>
          </div>
          <img src={ArrowRight} alt="" />
        </div>
      </a>
      <a
        href={"https://www.instagram.com/applyuninow/"}
        target="_blank"
        rel="noreferrer"
      >
        <div className="mt-4 bg-light flex justify-between p-4 rounded-lg">
          <div className="flex gap-4">
            <img src={Facebook} alt="" />
            <p>Facebook</p>
          </div>
          <img src={ArrowRight} alt="" />
        </div>
      </a>
      <a
        href={"https://www.instagram.com/applyuninow/"}
        target="_blank"
        rel="noreferrer"
      >
        <div className="mt-4 bg-light flex justify-between p-4 rounded-lg">
          <div className="flex gap-4">
            <img src={LinkedIn} alt="" />
            <p>LinkedIn</p>
          </div>
          <img src={ArrowRight} alt="" />
        </div>
      </a>
      <a
        href={"https://www.instagram.com/applyuninow/"}
        target="_blank"
        rel="noreferrer"
      >
        <div className="mt-4 bg-light flex justify-between p-4 rounded-lg">
          <div className="flex gap-4">
            <img src={Twitter} alt="" />
            <p>Twitter</p>
          </div>
          <img src={ArrowRight} alt="" />
        </div>
      </a>
    </div>
  );
};

export default Media;
