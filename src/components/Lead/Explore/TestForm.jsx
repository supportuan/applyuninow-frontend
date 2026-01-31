import React from "react";
import { Input } from "../../../common/InputBox";

const TestForm = () => {
  let params = "psat";
  return (
    <div className="w-full grid grid-cols-5">
      {params === "psat" ? (
        <div>
          <Input
            disabled={false}
            readOnly={false}
            name="reading"
            label="Reading"
            // value={params.phone}
            // handleChange={(e) => {
            //   handleTest(e);
            // }}
            // error={formErrors.phone}
            // helperText={formErrors.phone}
            bgcolor="#262938"
          />
          <Input
            disabled={false}
            readOnly={false}
            name="reading"
            label="Writing"
            // value={params.phone}
            // handleChange={(e) => {
            //   handleTest(e);
            // }}
            // error={formErrors.phone}
            // helperText={formErrors.phone}
            bgcolor="#262938"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TestForm;
