import React from "react";
import { Input } from "./Input";

const ExamSelect = ({ selectedValue }) => {
  return (
    <div className="">
      {selectedValue === "GRE" ? (
        <div className="flex gap-4">
          <Input
            disabled={false}
            readOnly={false}
            name="overall_score"
            label="Overall score"
            // value={params.name}
            // handleChange={handleChange}
            // error={formErrors.name}
            // helperText={formErrors.name}
            bgcolor="#F8F9FB"
            width="w-full"
          />
          <Input
            disabled={false}
            readOnly={false}
            name="verbal_reasoning"
            label="Verbal Reasoning"
            // value={params.name}
            // handleChange={handleChange}
            // error={formErrors.name}
            // helperText={formErrors.name}
            bgcolor="#F8F9FB"
            width="w-full"
          />
          <Input
            disabled={false}
            readOnly={false}
            name="quantitative_reasoning"
            label="Quantitative Reasoning"
            // value={params.name}
            // handleChange={handleChange}
            // error={formErrors.name}
            // helperText={formErrors.name}
            bgcolor="#F8F9FB"
            width="w-full"
          />
          <Input
            disabled={false}
            readOnly={false}
            name="analytical_writing_assesment"
            label="Analytical Writing Assessment"
            // value={params.name}
            // handleChange={handleChange}
            // error={formErrors.name}
            // helperText={formErrors.name}
            bgcolor="#F8F9FB"
            width="w-full"
          />
        </div>
      ) : (
        <>
          {selectedValue === "ELP" ? (
            <>
              <div className="flex gap-4">
                <Input
                  disabled={false}
                  readOnly={false}
                  name="overall_score"
                  label="Overall score"
                  // value={params.name}
                  // handleChange={handleChange}
                  // error={formErrors.name}
                  // helperText={formErrors.name}
                  bgcolor="#F8F9FB"
                  width="w-full"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="reading"
                  label="Reading"
                  // value={params.name}
                  // handleChange={handleChange}
                  // error={formErrors.name}
                  // helperText={formErrors.name}
                  bgcolor="#F8F9FB"
                  width="w-full"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="writing"
                  label="Writing"
                  // value={params.name}
                  // handleChange={handleChange}
                  // error={formErrors.name}
                  // helperText={formErrors.name}
                  bgcolor="#F8F9FB"
                  width="w-full"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="listening"
                  label="Listening"
                  // value={params.name}
                  // handleChange={handleChange}
                  // error={formErrors.name}
                  // helperText={formErrors.name}
                  bgcolor="#F8F9FB"
                  width="w-full"
                />
                <Input
                  disabled={false}
                  readOnly={false}
                  name="speaking"
                  label="Speaking"
                  // value={params.name}
                  // handleChange={handleChange}
                  // error={formErrors.name}
                  // helperText={formErrors.name}
                  bgcolor="#F8F9FB"
                  width="w-full"
                />
              </div>
            </>
          ) : (
            <>
              {selectedValue === "GMAT" ? (
                <>
                  <div className="flex gap-4">
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="overall_score"
                      label="Overall score"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="quantitative_reasoning"
                      label="Quantitative Reasoning"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="verbal_reasoning"
                      label="Verbal Reasoning"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="integrated_reasoning"
                      label="Integrated Reasoning"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="analytical_writing_assessment"
                      label="Analytical Writing Assessment"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="overall_score"
                      label="Overall Score"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="reading"
                      label="Reading"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="writing"
                      label="Writing"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="mathematics_with_calc"
                      label="Mathematics (with calculator)"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                     <Input
                      disabled={false}
                      readOnly={false}
                      name="mathematics_without_calc"
                      label="Mathematics (without calculator)"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                    <Input
                      disabled={false}
                      readOnly={false}
                      name="essay"
                      label="Essay"
                      // value={params.name}
                      // handleChange={handleChange}
                      // error={formErrors.name}
                      // helperText={formErrors.name}
                      bgcolor="#F8F9FB"
                      width="w-full"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ExamSelect;
