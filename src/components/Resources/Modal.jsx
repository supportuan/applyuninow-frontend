import close from "../../assets/allstudents/close.svg";
import { useState } from "react";

export const ModalForm = ({ setModalOn, submitFileUpload }) => {
  const [file, selectedFile] = useState("");
  const [fileName, setFileName] = useState("");

  const handleOKClick = () => {
    if (file) {
      submitFileUpload(file);
    }
    setModalOn(false);
  };
  const handleCancelClick = () => {
    setModalOn(false);
  };

  const handleChange = (e) => {
    const files = e.target.files;
    let file = files[0];
    setFileName(file.name);
    selectedFile(e);
  };
  const deleteFile = (e) => {
    selectedFile("");
    setFileName("");
  };

  return (
    <div class="modal">
      <form class="modal-content add-resouce-from p-8" onSubmit={handleOKClick}>
        <div class="container">
          <div className="flex justify-between ">
            <p className="text-white font-semibold pb-5">+ Folder</p>
            <img
              onClick={() => handleCancelClick()}
              className="relative bottom-2 cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <hr />
          <div className="add-resouce-sec">
            <input
              className=" w-full rounded-lg border-2 border-solid h-16 bg-tab text-white px-2 pt-2 resize-none mb-5  "
              autoComplete="off"
              type="text"
              spellCheck="true"
              placeholder="Folder Name"
            />
            <div className="relative py-2 pl-3  items-center space-x-8 gap-8 border-2 border-dashed border-[#404050] flex mb-5 mt-4">
              {!fileName ? (
                <>
                  <label
                    className="theme-btn-fill text-sm relative w-48 px-5  py-3 rounded-lg cursor-pointer z-10"
                    htmlFor="filepicker"
                  >
                    <span>Attach Document</span>
                  </label>
                  <input
                    id="filepicker"
                    className=" hidden relative top-2 left-[-103px] z-[1]  text-white border-none"
                    type="file"
                    accept=".pdf,.png,.jpeg,.jpg,.doc,.docx"
                    onChange={(e) => handleChange(e)}
                  />
                </>
              ) : (
                <div className="flex justify-between w-full items-center  px-4 py-4">
                  <p className="text-xs text-ellipsis">{fileName}</p>
                  <button
                    type="button"
                    className="bg-red p-1 rounded"
                    onClick={deleteFile}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center  pt-4">
            <button
              className="submit text-[#000000] font-semibold rounded-lg py-2 px-6"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
