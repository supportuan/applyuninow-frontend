import React from "react";
const statusList = [
  {
    list: [
      "un_assigned",
      "unassigned",
      "WAITING_FOR_DOCUMENTS",
    ],
    class: "bg-metallicSilver",
  },
  {
    list: [
      "call_back",
      "call back",
      "inactive",
      "confirmed",
      "dispatching",
      "PO_RAISED",
      "PO_LINKED",
      "IN_TRANSIT",
    ],
    class: "bg-yellowOrange",
  },
  {
    list: [
      "linked",
      "interested",
      "exe_cancelled",
      "PO_CONFIRMED",
      "ORDER_CONFIRMED",
      "SCHEDULED",
    ],
    class: "bg-vividYellow",
  },
  {
    list: [
      "dispatched",
      "DISPATCHED",
      "assigned",
      "order placed",
      "order_placed,NOT_SCHEDULED",
      "COMPLETED",
    ],
    class: "bg-azure",
  },
  {
    list: [
      "delivered",
      "contacted",
      "Active",
      "PO_DONE",
      "paid",
    
      "VERIFIED",
      "APPROVED"
    ],
    class: "bg-limeGreen",
  },
  {
    list: [
      "NOT_VERIFIED"
    ],
    class: "bg-inactivered",
  },
];

const getBgClass = (status) => {
  let className = "bg-carminePink";
  for (let item of statusList) {
    if (item?.list.some((x) => x?.toLowerCase() === status?.toLowerCase())) {
      className = item?.class;
      break;
    }
  }

  return className;
};

const Status = ({ children }) => (
  <div
    className={`font-nunitoRegular ${getBgClass(
      children
    )} bg-opacity-20 w-fit py-1.5 flex space-x-2 items-center pr-4 pl-2 rounded-[44px]`}
  >
    <div
      className={`w-3 h-3 ${getBgClass(
        children
      )} rounded-md border border-black`}
    />

    <p
      className={`font-nunitoRegular ${getBgClass(children).replace(
        "bg",
        "text"
      )} text-xs`}
    >
      {children}
    </p>
  </div>
);

export default Status;
