import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../common/Button";
import CustomButton from "../../../common/CustomButton";

import { Input } from "../../../common/InputBox";
import { SelectInput } from "../../../common/Select";

const ApplicationCreate = () => {
  const handleChange = () => {};
  const a = 10;

  const roles = [
    {
      name: "John",
      id: 1,
    },
  ];
  return (
    <div className="p-2 lg:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <Link to="/students/application/current">
            {" "}
            <p className="text-xs">Student</p>
          </Link>
          <p className="text-xs">{">"}</p>
          <p className="text-xs">+Student</p>
        </div>
        <div>
          <h1 className=" audio text-white relative text-xl lg:text-2xl">
            New Student
          </h1>
        </div>
      </div>

      <div className="w-full p-2 lg:p-6 rounded-lg mt-4 flex flex-col gap-6 bg-[#262938]">
        <div className="w-full bg-tab p-3 rounded-lg">
          <p className="text-lg">Student info</p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="first_name"
                label="First Name"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Last Name"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Phone Number"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
            
          </div>
          <div className="flex flex-col gap-4">
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Assign to"
              name="assign_to"
              bgcolor="#262938"
            />
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Email"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          <p className="text-lg">Application Details</p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Destination"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Level"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Industry"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Format"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Attendance Type"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Study Budget"
              name="role"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Subject Industry"
              name="role"
              bgcolor="#262938"
            />

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <SelectInput
                options={roles}
                // handleChange={handleChangeSelect}
                // value={params.role}
                // error={!!formErrors.role}
                // helperText={formErrors.role}
                label="Intake"
                name="role"
                bgcolor="#262938"
              />
              <SelectInput
                options={roles}
                // handleChange={handleChangeSelect}
                // value={params.role}
                // error={!!formErrors.role}
                // helperText={formErrors.role}
                label="Intake Year"
                name="role"
                bgcolor="#262938"
              />
            </div>

            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Work Experience"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Recent level of Academics"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Recent Grade Achieved"
              name="role"
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Location Type"
              name="role"
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          <p className="text-lg">Education Background</p>
        </div>
        <p>Secondary School Certificate / 10th</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Year of completion"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Medium"
              name="role"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Enter Percentage"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Higher Secondary School Certificate / 12th</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Year of completion"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="Medium"
              name="role"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Enter Percentage"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Under Graduation</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Type of Degree"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="CGPA"
              name="role"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Start Year"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="End year"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>

            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Backlogs"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
        </div>

        <p>Post Graduation</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Type of Degree"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
            <SelectInput
              options={roles}
              // handleChange={handleChangeSelect}
              // value={params.role}
              // error={!!formErrors.role}
              // helperText={formErrors.role}
              label="CGPA"
              name="role"
              bgcolor="#262938"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Start Year"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="End year"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>

            <Input
              disabled={false}
              readOnly={false}
              name="phone"
              label="Backlogs"
              // value={params.phone}
              // handleChange={handleChange}
              // error={formErrors.phone}
              // helperText={formErrors.phone}
              bgcolor="#262938"
            />
          </div>
        </div>

        <div className="w-full bg-tab p-3 rounded-lg">
          <p className="text-lg">Test Results</p>
        </div>
        <p>GRE</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Overall Score"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Quants"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="First Name"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Analytical Writing Analysis"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>
          </div>
        </div>

        <p>English Language Proficiency Test</p>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Read"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Listen"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Listen"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
              <Input
                disabled={false}
                readOnly={false}
                name="phone"
                label="Listen"
                // value={params.phone}
                // handleChange={handleChange}
                // error={formErrors.phone}
                // helperText={formErrors.phone}
                bgcolor="#262938"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 pb-4 flex justify-center lg:justify-end">
        <CustomButton
          variant="contained"
          size="large"
          borderRadius="8px"
          width="w-fit"
        >
          <p className="">Submit Details</p>
        </CustomButton>
      </div>
    </div>
    
  );
};

export default ApplicationCreate;
