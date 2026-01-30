import React from "react";


const NotesandLogs = () => {
  return (
    <div className=" bg-light mt-6 rounded-xl px-5 lg:px-10 py-6">
      <p className="text-white text-base font-medium hidden lg:block">
        Notes Info
      </p>
      <p className="text-white text-base font-medium lg:hidden">Logs info</p>
      <hr className="bord border-2 mt-3" />
      <div className=" mt-5 bg-tab flex flex-col gap-4 rounded-xl md:px-6 py-6">
        <div className="grid grid-cols-8 w-80 mb-3 pl-2 md:pl-0 md:w-96 xl:w-1/3 ">
          <div className="px-2">
            {/* <img src={executive} alt="logo" /> */}
          </div>
          <div className="col-span-6">
            <div className=" text-white">ApplyUniNow Executive</div>
            <div className="text-xs text-text">Few minutes ago</div>
          </div>
          <div className=""></div>
          <div className="col-span-6 ml-1 pl-10 lg:pl-12 xl:pl-14 mt-2 text-white text-xs md:text-sm font-thin">
            Please Upload the documents.
          </div>
        </div>
        <div className="grid grid-cols-8 pl-2  w-80 md:pl-0 md:w-96 xl:w-1/3">
          <div className="px-2">
            {/* <img src={student} alt="student_logo" /> */}
          </div>
          <div className="col-span-6">
            <div className=" text-white">Mahendra Reddy</div>
            <div className="text-xs text-text">22-May-21</div>
          </div>
          <div className=""></div>
          <div className="col-span-6 ml-1 pl-10 lg:pl-12 xl:pl-14 mt-2 text-white text-xs md:text-sm font-thin">
            I will upload the documents by tomorrow
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesandLogs;
