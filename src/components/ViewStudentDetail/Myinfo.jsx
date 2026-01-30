import React from "react";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../../common/CustomButton";
import EducationDetails from "./EducationDetails";
import StudentInfo from "./StudentInfo";
import ApplicationDetails from "./ApplicationDetails";
const Myinfo = ({ student }) => {
  const { id } = useParams();

  return (
    <div>
      <div className="flex flex-col gap-1 ">
        <div className="flex flex-row gap-2 font-audiowide audio">
          <Link to="/students/application/current">
            {" "}
            <p className="text-xs font-audiowide audio ">
              Applications - Current
            </p>
          </Link>
          <p className="text-xs">{">"}</p>
          <p className="text-xs ">View Student</p>
        </div>
        <div className="flex justify-between font-audiowide audio">
          <h1 className="text-white relative text-xl md:text-2xl">
            View Student
          </h1>

          {
            student && !student.is_enrolled &&
            <CustomButton
            variant="outlined"
            size="large"
            borderRadius="8px"
            width="w-fit"
            bgcolor="#151929"
          >
            <Link to={`/students/edit-student/${id}`}>
              {" "}
              <p className="gradient-text">Edit</p>
            </Link>
          </CustomButton>
          }
         
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        {/*Application Details */}

        <div className="view-div">
          <div className="flex justify-between">
            <StudentInfo student={student} />
          </div>

          <div className="mt-6 bg-light">
            <ApplicationDetails student={student} />
            {/* <p>Application Details</p> */}
          </div>

          <div className="mt-6 bg-light">
            <EducationDetails student={student} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myinfo;
