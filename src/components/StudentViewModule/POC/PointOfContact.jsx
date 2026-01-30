import React, { useEffect, useState } from "react";
import api from "../../../api";
import { environment } from "../../../environments/environment";
import { toast } from "react-toastify";
const PointOfContact = () => {
  const [poc, setPoc] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchStudent();
  }, []);

  const capitalizeFirstLetter = () => {
    let capital =
      poc.name.charAt(0).toUpperCase() + poc.name.slice(1).toLowerCase();

    return capital;
  };

  const fetchStudent = () => {
    setLoading(true);
    api
      .get(`${environment.API_BASE_URL}/admin/students/view-info`)
      .then((res) => {
        let student = res.data.data;

        setPoc(student.primaryContact);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Opps Unable to fetch POC. Please Try after some time");
      });
  };

  return (
    <div className="p-2 lg:p-4">
      <div className="flex justify-start ">
        <p className="text-xl md:text-2xl font-audiowide gradient-text mt-2 sm:mt-2 lg:mt-0">
          <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
            {" "}
            We’re here to help…
          </span>
        </p>
      </div>

      {!loading && (
        <>
          <div className="mt-5 md:mt-4 bg-light p-4 rounded-xl">
            <p className="pb-2 text-slider">Point of Contact</p>
            <div className="bg-tab p-4 flex flex-col md:flex-row justify-around items-center rounded-xl">
              <div className="flex flex-row md:flex-col py-1 md:py-0 w-full justify-between pl-0 md:pl-8 ">
                <p className="text-text text-xs">Name</p>
                {/* <p className='mt-0 md:mt-2 text-sm'>{poc.name || 'NA'}</p> */}
                <p className="mt-0 md:mt-2 text-sm">
                  {poc?.name?.split(" ")[0]?.charAt(0).toUpperCase()}
                  {poc?.name?.split(" ")[0]?.slice(1)}{" "}
                  {poc?.name?.split(" ")[1]?.charAt(0).toUpperCase()}
                  {poc?.name?.split(" ")[1]?.slice(1)}

                   
                </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">Phone Number</p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`tel:+91${poc?.phone}`}>
                    {"+91 "}
                    {poc?.phone || "NA"}
                  </a>{" "}
                </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">E-mail Id</p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`mailto:${poc?.email}`}>{poc?.email || "NA"}</a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {
        <>
          <div className="mt-2 lg:mt-4 bg-light p-4 rounded-xl">
            <p className="pb-4 text-slider">General enquiry </p>
            <div className="bg-tab p-4 flex flex-col md:flex-row justify-around items-center rounded-xl">
              <div className="flex flex-row md:flex-col py-1 md:py-0 w-full justify-between pl-0 md:pl-8 ">
                <p className="text-text text-xs">Name</p>
                <p className="mt-0 md:mt-2 text-sm">Sreelatha Reddy </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">Call / WhatsApp </p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`tel:+919581066688`}>+91 95810 66688</a>{" "}
                </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">E-mail Id</p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`mailto:latha@applyuninow.com`}>
                    latha@applyuninow.com
                  </a>
                </p>
              </div>
            </div>
            <p className="py-2 text-slider">For Remonstrances</p>
            <div className="bg-tab p-4 flex flex-col md:flex-row justify-around items-center rounded-xl">
              <div className="flex flex-row md:flex-col py-1 md:py-0 w-full justify-between pl-0 md:pl-8 ">
                <p className="text-text text-xs">Name</p>
                <p className="mt-0 md:mt-2 text-sm">Sreelatha Reddy </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">Call / WhatsApp </p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`tel:+919581066688`}>+91 95810 66688</a>{" "}
                </p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">E-mail Id</p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`mailto:latha@applyuninow.com`}>
                    latha@applyuninow.com
                  </a>
                </p>
              </div>
            </div>
            
            <p className="py-2 text-slider">Any other enquiry</p>
            <div className="bg-tab p-4 flex flex-col md:flex-row justify-around items-center rounded-xl">
              <div className="flex flex-row md:flex-col py-1  md:py-0 w-full justify-between pl-0 md:pl-8 ">
                <p className="text-text text-xs">Name</p>
                <p className="mt-0 md:mt-2 text-sm">Sandeep Varma</p>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">Call / WhatsApp </p>
                <div>
                  <p className="mt-0 md:mt-2 text-sm">
                    {" "}
                    <a href={`tel:+91 970 45 66688 `}>+91 970 45 66688 </a>{" "}
                  </p>
                  <p className="mt-0 md:mt-2 text-sm">
                    {" "}
                    <a href={`tel:+44 773 45 66688`}>+44 773 45 66688</a>{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-row md:flex-col  py-1 md:py-0 w-full justify-between">
                <p className="text-text text-xs">E-mail Id</p>
                <p className="mt-0 md:mt-2 text-sm">
                  {" "}
                  <a href={`mailto:sandeep@applyuninow.com`}>
                    sandeep@applyuninow.com
                  </a>
                </p>
              </div>
            </div>
            
          </div>
        </>
      }

      {loading && (
        <>
          <div className="mt-2 lg:mt-6 bg-light p-6 rounded-xl">
            <p className="px-4 md:px-10 text-center ">Loading....</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PointOfContact;
