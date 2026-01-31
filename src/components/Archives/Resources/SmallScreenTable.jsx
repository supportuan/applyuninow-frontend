import React from 'react'
import { Tooltip } from "@mui/material";
import deleteIcon from "../../../assets/leads/delete.svg";
import Restore from "../../../assets/user/Restore.svg";
import DeleteModal from "../../../common/DeleteModal";

const SmallScreenTable = ({
    data,
    handleRestore,
    handleDelete
}) => {
    return (
        <>
            {data?.map((item, index) => {
                return (
                    <div key={index} className="bg-light flex flex-row justify-between items-center rounded-lg border-[1px] border-[#404050] px-8 py-4 my-4">
                        <div>
                            <p className="text-white text-sm">{item.name}</p>
                        </div>
                        <div className="flex gap-4 justify-center items-center">
                            <Tooltip title="Restore">
                                <img
                                    src={Restore}
                                    alt="icon"
                                    className="cursor-pointer"
                                    onClick={(e) => handleRestore(e, item)}
                                />
                            </Tooltip>
                            <span className="h-6 border border-[#151929]"></span>
                            <Tooltip title="Delete">
                                <img
                                    src={deleteIcon}
                                    alt="icon"
                                    className="cursor-pointer"
                                    onClick={(e) => handleDelete(e, item)}
                                />
                            </Tooltip>
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default SmallScreenTable