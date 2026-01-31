import Modal from "../../Modal";

import { useState } from "react";

export const DeleteModal = () => {
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

      {modalOn && <Modal setModalOn={setModalOn} setChoice={setChoice} />}
    </div>
  );
};
