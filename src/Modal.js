const Modal = ({ handleClose, deleteUpload }) => {
  const handleOKClick = (e) => {
    e.preventDefault();
    deleteUpload(true);
  };

  return (
    <div id="deleteModel" class="modal">
      <form class="modal-content">
        <div class="container">
          <p className="py-4">Are you sure you want to delete the Document?</p>

          <div class="clearfix flex justify-center space-x-4">
            <button
              className="rounded-lg  px-6 py-2 ml-4 text-white cancel-btn"
              onClick={handleClose}
            >
              <span> Cancel</span>
            </button>
            <button
              className=" delete-btn rounded-lg px-6 py-2 submit "
              onClick={handleOKClick}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
