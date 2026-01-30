import moment from "moment";
import React from "react";

const statusList = [
  {
    list: ["call_back",],
    class: "bg-azure",
  },
  {
    list:['not_contacted'],
    class:'bg-carminePink'
  },
  {
    list: ['exe_cancelled', 'in_progress','hold'],
    class: 'bg-yellowOrange'
},
  {
    list: ["contacted", "completed",'enrolled'],
    class: "bg-limeGreen",
  },
];



const getBgClass = (status) => {
  let className = "bg-carminePink";
  for (let item of statusList) {
    if (item.list.some((x) => status.toLowerCase().includes(x.toLowerCase()))) {
      className = item.class;
      break;
    }
  }

  return className;
};

const Log1 = ({ logs }) => {
  return (
    <div>
      {logs && !logs.length ? (
        <p className="text-center">No Logs!!</p>
      ) : (
        <div className="flex flex-col gap-3">
          {logs?.map((item) => {
            return (
              <div>
                {item?.type === "STATUS" ? (
                  <div
                    className={`flex  flex-col lg:flex-row gap-1 lg:justify-between  p-2 lg:p-4 rounded-lg}`}
                  >
                    <div
                      className={` bg-opacity-10 w-fit flex gap-3 items-center px-4 py-2 rounded-lg border-2   ${getBgClass(item.message)} ${getBgClass(item.message).replace('bg', 'border')}`}>
                      <div
                        className={` w-2.5 h-2.5  rounded-md border border-black  ${getBgClass(item.message)} ${getBgClass(item.message).replace('bg', 'border')}`}
                      />
                      <div className='text-xs' dangerouslySetInnerHTML={{ __html: item.message.replace('<span>', `<span class=${getBgClass(item.message).replace('bg', 'text')}> `) }} />
                    </div>
                    <p
                      className={`text-xs ml-8 md:ml-9`}
                    >
                      {moment(item?.created_at).format("LT ; DD/MM/YYYY")}
                    </p>
                  </div>
                ) : (
                  <>
                    {item?.type === "ACTION" ? (
                      <div className="w-full flex gap-4">
                        <div className=" ml-2 md:ml-0 w-8 md:w-10 h-8 md:h-10  bg-slider rounded-full flex justify-center items-center">
                          <p className="p-4">{item?.user?.name?.charAt(0)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-xs">
                            {item?.user?.name} {item?.message}
                          </p>
                          <p className="text-[#848692] text-xs">
                            {moment(item?.created_at).format("LT ; DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {item?.type === "NOTE" ? (
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-slider flex justify-center items-center">
                              <p>{item?.user?.name?.charAt(0)}</p>
                            </div>
                            <div className="text-xs flex flex-col gap-1">
                              <p className="text-xs">{item?.user?.name}</p>
                              <p className="text-[#848692]">
                                {moment(item?.created_at)
                                  .startOf("minutes")
                                  .fromNow()}
                              </p>
                              <p className="text-xs break-all">{item?.message}</p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Log1;
