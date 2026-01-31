// SuccessModal.js
import React from "react";

const SuccessModal = ({ message, onClose }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="icon-check"></div>
          <h2>Thank You!</h2>
          <p>{message || "Submitted your details successfully, our team will get back to you."}</p>
          <button onClick={onClose} className="modal-btn">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
