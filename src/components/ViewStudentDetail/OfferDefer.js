import close from "../../assets/allstudents/close.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "../../common/CustomButton";

const intake_year = [
  new Date().getFullYear(),
  new Date().getFullYear() + 1,
  new Date().getFullYear() + 2,
  new Date().getFullYear() + 3,
];
export const OfferDefer = ({ handleClose, submitFileUpload, loading }) => {
  const [params, setParams] = useState({
    intake: "",
    intake_year: "",
  });
  const [isDifer, setIsDefer] = useState(false);

  const handleOKClick = (e) => {
    e.preventDefault();
    if((!params.intake || !params.intake_year)){
      toast.error("Please select all details");
      return
    }

    if(isDifer && (!params.intake || !params.intake_year)){
    toast.error("Please Select Intake");
    return
    }
    submitFileUpload({
      intake: `${params.intake} ${params.intake_year}`,
    });
  };

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setParams((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleDiffer = (e) => {
    e.preventDefault();
    setIsDefer(isDifer ? false : true)
    setParams((inputs) => ({ ...inputs,  intake: "",
    intake_year: ""}));
  };


  return (
    <div class="modal">
      <form class="modal-content add-resouce-from p-8" onSubmit={handleOKClick}>
        <div class="container">
          <div className="flex justify-between ">
            <p className="text-white font-semibold pb-5">Edit </p>
            <img
              onClick={handleClose}
              className="relative bottom-2 cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <hr />

          <div className="add-resouce-sec">
             <div className="flex w-full justify-center py-4 flex-col items-center mt-2">
             <CustomButton
                variant="outlined"
                size="large"
                borderRadius="8px"
                width="w-fit"
                bgcolor="#151929"
                onClick={handleDiffer}
              >
               
                  <p className="gradient-text">Defer Offer</p>
              </CustomButton>
             </div>
            <hr />
             <p className="text-sm pt-4">Click on this to Defer this Offer letter to New Intake.</p>

            <div className={`${!isDifer ? 'disabled':''}`}>
              <div className="pt-2">
                <select
                  id="countries"
                  className="custom-select cursor-pointer"
                  name="intake"
                  onChange={onhandleChange}
                  value={params.intake}
                >
                  <option selected>Intake</option>
                  <option value="fall">Fall</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                </select>
              </div>
              <div className="py-4">
                <select
                  id="countries"
                  className="custom-select cursor-pointer"
                  name="intake_year"
                  onChange={onhandleChange}
                  value={params.intake_year}
                >
                  <option selected>Intake Year</option>
                  {intake_year.map((x) => (
                    <option value={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end  pt-4">
            {loading ? (
              <button
                className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
                type="submit"
              >
                Uploading...
              </button>
            ) : (
              <button
                className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
