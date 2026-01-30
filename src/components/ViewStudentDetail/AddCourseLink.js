import close from "../../assets/allstudents/close.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const intake_year = [
  new Date().getFullYear(),
  new Date().getFullYear() + 1,
  new Date().getFullYear() + 2,
  new Date().getFullYear() + 3,
];
export const AddCourseLink = ({ handleClose, submitFileUpload, loading, link}) => {

  const [params, setParams] = useState({
    course_link:""
  });

  useEffect(()=>{
    if(link)
    setParams({course_link:link})
  },[link])

  const handleOKClick = (e) => {
    e.preventDefault();
    if(!params.course_link){
      toast.error("Please select all details");
      return
    }
    submitFileUpload({
      course_link:params.course_link,
    });
  };

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setParams((inputs) => ({ ...inputs, [name]: value }));
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
          <h6 className="text-left pb-2" for="link">Enter Official Course Link</h6>
            <div>
              <input
               id="link"
                type="text"
                 onChange={onhandleChange}
                 name='course_link'
                 value={params.course_link}
                placeholder="Course Link"
                class="w-full defer-input"
              />
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
