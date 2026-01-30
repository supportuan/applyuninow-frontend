import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import CustomButton from "../../common/CustomButton";
import CustomCheckbox from "./Checkbox";
import { toast } from "react-toastify";
import { environment } from "../../environments/environment";
import api from "../../api/index";
import { decryptData, uuid } from "../../utils/helpers";


const Enrolement = ({student, refresh}) => {
  const { id } = useParams();
  const [ischecked, setIsChecked] = useState(false);
  const [isApiLoading, setApiLoading] = useState(false);

  const handleChange = (e) => {
    setIsChecked(!ischecked);
  };

  const handleEnrollment = () => {
    if (ischecked === false) {
      toast("Please Select The Input Field");
    } else {
      setApiLoading(true);
      api
        .patch(`${environment.API_BASE_URL}/admin/students/enrolled/${decryptData(id)}`, {})
        .then((res) => {
          console.log(res, "res");
          setApiLoading(false);
          toast.success("Enrollment Confirmation Updated Successfully");
          refresh()
        })
        .catch((err) => {
          toast.error(err.message);
          setApiLoading(false);
        });
    }
  };

  return (
    <div className="view-div">
      <div className="flex justify-between">
        <p>Enrollment Confirmation</p>
      </div>
      <hr />

      <div className="bg-[#151929] px-2 py-4 md:px-4 md:py-6 md:inner-div rounded-lg  mt-4 ">
        {
          !student.is_enrolled ?
          <div className="flex justify-between pt-2">
          <div className="flex  ">
            <CustomCheckbox
              handleCheck={(e) => handleChange(e)}
              ischecked={ischecked}
              Label="Received ID card from University"
            />
            {/* <p>Received ID card from University</p> */}
          </div>

          {isApiLoading ? (
            <CustomButton
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              disabled={isApiLoading}
            >
              <p className="">Loading...</p>
            </CustomButton>
          ) : (
            <CustomButton
              variant="contained"
              size="large"
              borderRadius="8px"
              width="w-fit"
              onClick={() => {
                handleEnrollment();
              }}
              //   disabled={isApiLoading}
            >
              <p className="">Update</p>
            </CustomButton>
          )}
        </div> :
          <div className="flex justify-center pt-2 text-limeGreen">
            Student Enrolled and Received ID card from University.
          </div>
        }
       
      </div>
    </div>
  );
};

export default Enrolement;
