import React from "react";
import CustomButton from "../common/CustomButton";
import moment from 'moment';


const Notification = ({ notificationsList, onNotificaionClick, clear, meta, loadMoreNotifications, loading }) => {
  return (
    <div className="w-[350px] lg:w-[400px] p-4 ">
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <p className="text-center text-lg">Notifications</p>
        {
          notificationsList && notificationsList?.length ?
            <p onClick={clear} className="w-full flex justify-end mt-10 lg:mt-0 underline gradient-text text-sm">
              Clear all
            </p> :
            <></>
        }
      </div>
      <div className={`mt-4 flex flex-col gap-4  h-[${notificationsList?.length ? '400px' : '150px'}] overflow-y-scroll`}>
        {notificationsList?.map((item) => {
          return (
            <div className="flex flex-col bg-[#151929] p-2 rounded-lg" onClick={() => onNotificaionClick(item)}>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-red rounded-full p-4 flex justify-center  items-center">
                  {item?.receiver?.name?.charAt(0)}
                </div>
                <p>{item.message}</p>
              </div>
              <div className="w-full flex justify-end">
                <p className="audio text-xs">{moment(item.created_at).fromNow()}</p>
              </div>
            </div>
          );
        })}
        {
          notificationsList && !notificationsList?.length ?
            <div className="flex justify-center gap-2">
              <p>No Notifications</p>
            </div> : <></>
        }
      </div>
      {
        (notificationsList && notificationsList?.length && meta?.current_page != meta?.last_page) ?
          <div className="mt-4 flex justify-center">
            <CustomButton
              variant="outlined"
              size="large"
              borderRadius="8px"
              width="w-fit"
              bgcolor="#151929"
              disabled={loading}
              onClick={loadMoreNotifications}
            >

              {" "}
              <p className="gradient-text">Load More</p>

            </CustomButton>
          </div> : <></>
      }

    </div>
  );
};

export default Notification;
