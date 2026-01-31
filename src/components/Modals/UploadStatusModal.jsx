import { useState } from "react";
import { ReuploadDocument } from "../../ReuploadDocument";

export const UploadStatusModal = () => {
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState(false);

  const clicked = () => {
    setModalOn(true);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          className="flex  cursor-pointer justify-center w-full bg-slider p-4  m-6 rounded-md text-white"
          onClick={clicked}
        >
          Click Me
        </div>
      </div>

      {modalOn && (
        <ReuploadDocument setModalOn={setModalOn} setChoice={setChoice} />
      )}
    </div>
  );
};
