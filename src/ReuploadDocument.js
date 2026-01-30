import close from "./assets/allstudents/close.svg";
import upload from "./assets/upload.svg";
import { useState } from "react";
import CustomButton from "./common/CustomButton";
import FileUpload from "./common/FileUploader";

export const ReuploadDocument = ({
  handleClose,
  submitFileUpload,
  loading,
  title,
}) => {
  const [file, selectedFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleOKClick = (e) => {
    e.preventDefault();
    if (file) {
      submitFileUpload(file);
    }else{
      setError(true)
    }
  };

  const handleChange = (data) => {
    setFileName(data.url);
    selectedFile(data.file);
    setError('')
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
            <p className="text-white font-semibold pb-5">{title}</p>
            <img
              onClick={handleClose}
              className="relative bottom-2 cursor-pointer"
              src={close}
              alt="close"
            />
          </div>
          <hr />
          <div className="add-resouce-sec">
            <FileUpload
              styleType="md"
              setImage={handleChange}
              removeImage={deleteFile}
              acceptMimeTypes={["application/pdf", 
              "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "image/png", "image/jpeg","image/jpg"]}
              title="Attach Document Here"
              label="File Format: pdf, doc, image"
              id="folder"
              maxSize={5}
              imageUrl={fileName}
              filename="url"
              error={error}
            />
            <textarea
              className=" mt-4 w-full rounded-lg outline-none border-2 border-drak h-40 bg-tab text-white px-2 pt-2 resize-none mb-5  "
              autoComplete="off"
              type="text"
              spellCheck="true"
              placeholder="Enter your text Here..."
            />
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
