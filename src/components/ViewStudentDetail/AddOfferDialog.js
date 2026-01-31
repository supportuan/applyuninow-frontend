import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import close from "../../assets/allstudents/close.svg";

const intake_year = [
  new Date().getFullYear(),
  new Date().getFullYear() + 1,
  new Date().getFullYear() + 2,
  new Date().getFullYear() + 3,
];

export const AddOfferDialog = ({ handleClose, submitFileUpload, loading }) => {
  const [file, selectedFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [params, setParams] = useState({
    intake: '',
    intake_year: ''
  });

  const handleOKClick = (e) => {
    e.preventDefault();
    if (file && params.intake && params.intake_year) {
      submitFileUpload({
        file,
        intake: `${params.intake} ${params.intake_year}`
      });
      return;
    }
    toast.warn('Please select all details');
  };

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setParams(inputs => ({ ...inputs, [name]: value }));
  };

  const handleChange = (e) => {
    const files = e.target.files;
    let file = files[0];
    setFileName(file.name);
    selectedFile(e);
  };

  const deleteFile = () => {
    selectedFile("");
    setFileName("");
  };

  return (
    <div className="modal">
      <form className="modal-content add-resouce-from p-8" onSubmit={handleOKClick}>
        <div className="container">
          <div className="flex justify-between ">
            <p className="text-white font-semibold pb-5">Upload Offer Letter</p>
            <Image
              onClick={handleClose}
              className="relative bottom-2 cursor-pointer"
              src={close}
              alt="close"
              width={24}
              height={24}
            />
          </div>
          <hr />

          <div className="add-resouce-sec">
            <div className="py-4">
              <select
                id="intake-select"
                className="custom-select"
                name="intake"
                onChange={onhandleChange}
                value={params.intake}
              >
                <option value="">Intake</option>
                <option value="fall">Fall</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
              </select>
            </div>
            <div className="py-4">
              <select
                id="intake-year-select"
                className="custom-select"
                name="intake_year"
                onChange={onhandleChange}
                value={params.intake_year}
              >
                <option value="">Intake Year</option>
                {intake_year.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative py-2 pl-3 items-center space-x-8 gap-8 border-2 border-dashed border-[#404050] flex mb-5 mt-4">
              {!fileName ? (
                <>
                  <label
                    className="theme-btn-fill text-sm relative w-48 px-5 py-3 rounded-lg cursor-pointer z-10"
                    htmlFor="filepicker"
                  >
                    <span>Attach Document</span>
                  </label>
                  <input
                    id="filepicker"
                    className="hidden relative top-2 left-[-103px] z-[1] text-white border-none"
                    type="file"
                    accept=".pdf,.png,.jpeg,.jpg,.doc,.docx"
                    onChange={(e) => handleChange(e)}
                  />
                </>
              ) : (
                <div className="flex justify-between w-full items-center px-4 py-4">
                  <p className="text-xs text-ellipsis">{fileName}</p>
                  <button
                    type="button"
                    className="bg-red p-1 rounded"
                    onClick={deleteFile}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            {loading ? (
              <button
                className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
                type="submit"
                disabled
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