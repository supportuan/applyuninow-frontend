
import React from "react";

const InfoModal = ({ onClose, message }) => {

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h2></h2>
          <p style={{textAlign:"center"}}>{message || "Submitted your details successfully, our team will get back to you."}</p>
          <button onClick={onClose} className="modal-btn">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
