import React from "react";
import DeleteModal from "../../../common/DeleteModal";

const Accordion = ({
  data,
  currentPage,
  open,
  handleClickOpen,
  handleClose,
  loading,
  handleDeleteOk,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {data.length > 0 ? (
        <>
          {data.map((item, index) => {
            return (
              <div>
                <div className="w-full bg-[#262938] p-4 rounded-lg flex justify-between">
                  <div className="flex gap-4">
                    {" "}
                    <p>{item?.name}</p>
                    <p>{item.industry?.name}</p>
                  </div>
                  <svg
                      width="15"
                      height="18"
                      viewBox="0 0 15 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => {
                        handleClickOpen("archeiveLargeScreen", true, item?.id);
                      }}
                    >
                      <path
                        d="M1.81763 16C1.81763 17.1 2.71763 18 3.81763 18H11.8176C12.9176 18 13.8176 17.1 13.8176 16V6C13.8176 4.9 12.9176 4 11.8176 4H3.81763C2.71763 4 1.81763 4.9 1.81763 6V16ZM13.8176 1H11.3176L10.6076 0.29C10.4276 0.11 10.1676 0 9.90763 0H5.72763C5.46763 0 5.20763 0.11 5.02763 0.29L4.31763 1H1.81763C1.26763 1 0.817627 1.45 0.817627 2C0.817627 2.55 1.26763 3 1.81763 3H13.8176C14.3676 3 14.8176 2.55 14.8176 2C14.8176 1.45 14.3676 1 13.8176 1Z"
                        fill="#EF4949"
                      />
                    </svg>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}

      {open?.archeiveMediumScreen ? (
        <DeleteModal
          open={open.archeiveMediumScreen}
          handleClose={handleClose}
          type="archeive"
          title=" Are you sure you want to Delete the Study Industry?"
          loading={loading}
          handleActionButton={handleDeleteOk}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Accordion;
