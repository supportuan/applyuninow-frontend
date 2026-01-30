import { useEffect, useState } from "react";

import FileUploadIcon from "../assets/fileuploader/FileDefault.svg";
import FileUploaded from "../assets/fileuploader/FileDefault.svg";
import FileDefault from "../assets/fileuploader/FileDefault.svg";
import PDFPreview from "../assets/fileuploader/PDFPreview.svg";
import { toast } from "react-toastify";

const FileUploader = ({
  id,
  label,
  acceptMimeTypes = ["image/png", "image/jpeg"],
  setImage,
  title = "Drag and Drop PDF here",
  maxSize = 5, // in MB,
  imageUrl = "",
  styleType = "lg",
  filename,
  previewData = "",
  setPreviewMeta,
  removeImage,
  error,
}) => {
  const [isUploaded, setUpload] = useState(false);
  const [active, setActive] = useState(false);
  const [imageMeta, setImagePreview] = useState({
    name: "",
    url: "",
    type: "",
  });

  useEffect(() => {
    // show preview image
    if (imageUrl && imageUrl.startsWith("https")) {
      setUpload(true);
      const name = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      const lastDot = name.lastIndexOf(".");
      const ext = name.substring(lastDot + 1);
      setImagePreview({
        name,
        url: imageUrl,
        type: ext === "pdf" ? "application/pdf" : "image/png",
      });
    }

    if (previewData) {
      setImagePreview(previewData);
      setUpload(true);
    }
  }, [previewData, imageUrl]);

  const validation = (file) => {
    const maxSizeInBytes = Number(maxSize) * 1024 ** 2;
    if (file.size > maxSizeInBytes) {
      // show toast message;
      // console.log(`File Size Exceeds the ${maxSize}`);
      toast.error(`File Size Exceeds the ${maxSize}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    console.log(file.type)

    if (!acceptMimeTypes.includes(file.type)) {
      // console.log('Unsupported file selected!');
      toast.error("Unsupported file selected!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }

    return true;
  };

  const convertBase64 = (file) => {
    const isValid = validation(file); // validation for file type and size
    if (isValid) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const meta = { name: file.name, url: reader.result, type: file.type };
        setImagePreview(meta);
        // setPreviewMeta && setPreviewMeta(meta);
        if (setPreviewMeta) {
          setPreviewMeta(meta);
        }
        setUpload(true);
        setActive(true);
        setImage({
          url: reader.result || "",
          name: filename,
          file,
          preview: meta,
        });
      };
    }
  };

  const chooseFile = (e) => {
    e.preventDefault();
    const ele = document.getElementById(id);
    if (ele) ele.click();
  };
  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    convertBase64(file);
  };

  const handleCancel = () => {
    setUpload(false);
    setActive(false);
    if (removeImage) {
      removeImage("");
    }
  };

  // drag and drop functionalities
  const onDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragover") {
      setActive(true);
    }

    if (event.type === "dragleave") {
      setActive(false);
    }

    if (event.type === "drop") {
      const file = event.dataTransfer.files[0];
      convertBase64(file);
    }
  };
  return (
    <div
      className={`file-upload-box w-full h-fit ${
        error && "file-upload-error"
      } ${
        active ? "file-upload-active" : ""
      } border border-border p-2 rounded-lg`}
    >
      {!isUploaded ? (
        <>
          <label
            htmlFor={id}
            className={`cursor-pointer ${
              styleType === "md" ? "hidden" : "block"
            }`}
            onDragOver={(e) => onDrag(e)}
            onDragLeave={(e) => {
              onDrag(e);
            }}
            onDrop={(e) => {
              onDrag(e);
            }}
          >
            <img src={FileDefault} className="mx-auto " alt="" />
            <p className=" text-center font-bold text-white text-lg pt-2">
              {title}
            </p>
          </label>
          <div>
            <div
              className={`flex justify-between items-center  ${
                styleType === "md" ? "pt-0" : "pt-6"
              }`}
            >
              <div className="flex justify-center items-center  space-x-0 lg:space-x-6">
                <div className="hidden lg:block">
                  <img
                    src={FileUploadIcon}
                    alt=""
                    className="w-[25px] h-[24px]"
                  />
                </div>

                <div className="flex flex-col text-sm label-sec">
                  <p>{label}</p>
                  <p className="pt-2">
                    Maximum Size:
                    {maxSize} Mb
                  </p>
                </div>
              </div>

              <div>
                <input
                  type="file"
                  id={id}
                  onChange={onChange}
                  accept={acceptMimeTypes.toString()}
                  className="hidden"
                />
                <div
                  className="upload-btn w-full border  p-2 flex cursor-pointer justify-center items-center rounded-lg"
                  id={id}
                  role="presentation"
                  onClick={(e) => chooseFile(e)}
                >
                  <p className="gradient-text">Choose File</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex justify-center flex-col  items-center ${
              styleType === "md" ? "hidden" : "block"
            }`}
          >
            <img src={FileUploaded} alt="" />
            <p className="text-white text-center pt-4 font-bold">Uploaded!</p>
          </div>

          <div
            className={`flex justify-between items-center  ${
              styleType === "md" ? "pt-0" : "pt-6"
            }`}
          >
            <div className="flex justify-center items-center space-x-6">
              <img
                src={
                  imageMeta.type === "application/pdf"
                    ? PDFPreview
                    : imageMeta.url
                }
                alt=""
                className="w-[50px] h-[50px]"
              />
              <p className="text-white text-sm">
                {imageMeta.name.length > 10 ? (
                  <>
                    {imageMeta.name.substring(0, 10)}
                    ...
                  </>
                ) : (
                  <>{imageMeta.name}</>
                )}
              </p>
            </div>
            <div className="border border-white p-2 rounded-lg">
              <button
                onClick={handleCancel}
                type="button"
                className="cancel-btn flex cursor-pointer justify-center items-center rounded-lg border"
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
