import { useContext, useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import api from "../api/index";
import Validator from "validatorjs";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import { uuid } from "../common/utils/helpers";

const EditStudent = () => {
  const intialValues = {
    name: "",
    phone: "",
    email: "",
    country_id: "",
    los: "",
    study_industry: "",
    intake: "",
    poc: "",
    pocphone: "",
    contact_id: "",
    intake_month: "",
    intake_year: "",
    first_name: "",
    last_name: "",
  };

  const { BASE_URL } = useContext(AppContext);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const [studyDestination, setStudyDestination] = useState([]);
  const [pocdetails, setpocdetails] = useState([]);
  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [styleinput, setstyleinput] = useState({
    isfocus: false,
    isblur: false,
  });

  const [data, setData] = useState({
    study_level: [],
    study_industry: [],
    study_intake: [],
    intake_month: [],
    intake_year: [],
    study_area: [],
  });
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDetails = () => {
    api
      .get(`${BASE_URL}/prerequisite`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (searchParams.get("type") == "lead_convert") {
      getLeadDetails();
    } else {
      getStudentDetails();
    }
    getStudyDestinations();
    getPOCDetails();
    getDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "required|max:100",
      phone: "required|max:11",
      email: "required|email",
      country_id: "required",
      los: "required",
      study_industry: "required",
      intake: "required",
      poc: "required",
      pocphone: "required",
    });
    if (validation.fails()) {
      const fieldErrors = {};
      for (let key in validation.errors.errors) {
        fieldErrors[key] = validation.errors.errors[key][0];
      }
      setFormErrors(fieldErrors);
      return false;
    }
    setFormErrors({});

    postStudentData();
    return true;
  };

  const postStudentData = () => {
    setLoading(true);
    const postdata = {
      email: params.email,
      name: params.name,
      phone: params.phone,
      level: params.los,
      country_id: params.country_id,
      contact_id: params.contact_id,
      industry: params.study_industry,
      intake: params.intake,
      lead_id: id,
      poc: params.poc,
      poc_phone: params.pocphone,
    };
    console.log(postdata);
    api
      .put(`${BASE_URL}/admin/students/update-details/${id}`, postdata)
      .then((res) => {
        setLoading(false);
        toast("Student Edited Successfully");
        navigate("/students");
      })
      .catch((error) => {
        setLoading(false);
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        setMessage(erroMsg);
      });
  };

  const handleSelectionChange = (e, key) => {
    setParams({ ...params, [key]: e.target.value });
    setFormErrors(intialValues);
  };

  //Single Student Details
  const getLeadDetails = () => {
    api
      .get(`${BASE_URL}/admin/contact-requests/${id}`)
      .then((res) => {
        const data = res.data.data;
        setParams({
          ...params,
          name: data?.name,
          phone: data?.phone,
          email: data?.email,
          country_id: data.destination,
          los: data.level,
          study_industry: data.industry,
          intake: data.intake,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudentDetails = () => {
    api
      .get(`${BASE_URL}/admin/students/edit-view/${id}`)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setParams({
          ...params,
          name: data?.name,
          phone: data?.phone,
          email: data?.email,
          country_id: data?.country?.id,
          //study_destination: data?.country?.name,
          contact_id: data.contact_id,
          los: data?.level,
          study_industry: data?.industry,
          intake: data?.intake,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get Study Destinations
  const getStudyDestinations = () => {
    api
      .get(`${BASE_URL}/admin/countries`)
      .then((res) => {
        //console.log(res.data.data);
        setStudyDestination(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get POC name and Phone Number
  const getPOCDetails = () => {
    api
      .get(`${BASE_URL}/admin/users/dropdown`)
      .then((res) => {
        //console.log(res.data.data);
        setpocdetails(res.data.data);
        //  console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePOCName = (e) => {
    let key = parseInt(e.target.value);
    pocdetails.map((el) => {
      if (parseInt(el.id) === key) {
        params.pocphone = el.phone;
      }
    });
    setParams({
      ...params,
      poc: parseInt(e.target.value),
      contact_id: e.target.value,
    });
    setFormErrors(intialValues);
  };

  const handleChangePOCPhone = () => {};
  return (
    <div className="mx-5 my-8 text-white">
      <p className="pl-4">
        <Link to="/students" className=" cursor-pointer">
          Applications - Current
        </Link>{" "}
        {">"}{" "}
        <Link to={`/students/edit-student/${id}`} className=" cursor-pointer">
          View Student
        </Link>{" "}
        {">"}{" "}
        <Link to={`/students/edit-student/${id}`} className=" cursor-pointer">
          Edit Student
        </Link>{" "}
      </p>
      <p className="pl-4 text-2xl font-semibold mb-4">Enter Applicant info</p>

      <div className="bg-light p-7 rounded-xl mt-6 ">
        <p className="bg-tab py-2 pl-4 rounded-lg mt-4">
          Fill up the mandatory details required...
        </p>
        <div className="mt-6">
          <form>
            <div className=" grid grid-flow-row  gap-5 mb-3 lg:grid-cols-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="floating-input mb-2 relative">
                  <input
                    name="name"
                    placeholder="Name"
                    value={params.name}
                    onChange={handleChange}
                    error={formErrors.name}
                    id="name"
                    class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  />
                  <label
                    for="name"
                    class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                  >
                    First Name
                  </label>
                  <p className="text-slider text-sm">{formErrors.name}</p>
                </div>
                <div className="floating-input mb-2 relative">
                  <input
                    name="name"
                    placeholder="Name"
                    value={params.name}
                    onChange={handleChange}
                    error={formErrors.name}
                    id="name"
                    class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  />
                  <label
                    for="name"
                    class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                  >
                    Last Name
                  </label>
                  <p className="text-slider text-sm">{formErrors.name}</p>
                </div>
              </div>

              <div className="floating-input  relative">
                <select
                  id="study_industry"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-2 pt-4 h-16"
                  type="text"
                  name="role"
                  value={params.study_industry}
                  onChange={(e) => handleSelectionChange(e, "study_industry")}
                  error={formErrors.study_industry}
                >
                  <option disabled selected value="">
                   Study Industry
                  </option>
                  {data.study_industry.map((item) => (
                    <option key={uuid()} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <label
                  for="study_industry"
                  class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Study Industry
                </label>
                <p className="text-slider text-sm">
                  {formErrors.los ? "Please Select Study Industry" : ""}
                </p>
              </div>

              <div className="floating-input mb-2 relative">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone No"
                  value={params.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                  id="phone"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                />
                <label
                  for="phone"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                 Phone Number
                </label>
                <p className="text-slider text-sm">{formErrors.phone}</p>
              </div>

              <div className="floating-input  relative">
                <select class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16" />
                <label
                  for="phone"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Subject Industry
                </label>
              </div>

              <div className="floating-input mb-2 relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={params.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  id="phone"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                />
                <label
                  for="phone"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Email
                </label>
                <p className="text-slider text-sm">{formErrors.phone}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="floating-input  relative">
                  <select
                    id="intake_month"
                    class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-2 pt-4 h-16"
                    type="text"
                    name="intake_month"
                    value={params.intake_month}
                    onChange={(e) => handleSelectionChange(e, "intake_month")}
                    error={formErrors.intake_month}
                  >
                    <option disabled selected value="">
                      Intake Month
                    </option>
                    {data.intake_month.map((item) => (
                      <option key={uuid()} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <label
                    for="intake_month"
                    class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                  >
                   Intake
                  </label>
                  <p className="text-slider text-sm">
                    {formErrors.intake_month
                      ? "Please Select Intake Month"
                      : ""}
                  </p>
                </div>

                <div className="floating-input  relative">
                  <select
                    id="intake_year"
                    class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-2 pt-4 h-16"
                    type="text"
                    name="intake_year"
                    value={params.intake_year}
                    onChange={(e) => handleSelectionChange(e, "intake_year")}
                    error={formErrors.intake_year}
                  >
                    <option disabled selected value="">
                      Intake year
                    </option>
                    {data.intake_year.map((item) => (
                      <option key={uuid()} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <label
                    for="intake_year"
                    class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                  >
                   Intake Year
                  </label>
                  <p className="text-slider text-sm">
                    {formErrors.intake_year
                      ? "Please Select Study Intake Year"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="floating-input mb-2 relative">
                <select
                  disabled
                  id="role"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-2 pt-4 h-16"
                  type="text"
                  name="role"
                  placeholder="User Role hello"
                  onChange={(e) => handleSelectionChange(e, "country_id")}
                  error={formErrors.country_id}
                >
                  <option disabled selected>
                    Select Study Destination
                  </option>
                  {studyDestination.map((e) => (
                    <option key={uuid()} value={e?.id}>
                      {e?.name}
                    </option>
                  ))}
                </select>
                <label
                  for="role"
                  class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Study Destination
                </label>
                <p className="text-slider text-sm">
                  {formErrors.country_id
                    ? "Please Select Study Destination"
                    : ""}
                </p>
              </div>
              <div className="floating-input mb-2 relative">
                <select
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  name="poc"
                  // value={params.poc}
                  onChange={handleChangePOCName}
                  error={formErrors.poc}
                >
                  <option selected disabled>
                   POC
                  </option>
                  {pocdetails.map((e) => (
                    <option key={uuid()} value={e?.id}>
                      {e?.name}
                    </option>
                  ))}
                </select>
                <p className="text-slider text-sm">
                  {formErrors.poc ? "Please Select Point of Contact" : ""}
                </p>
              </div>

              <div className="floating-input mb-2 relative">
                <select
                  disabled
                  id="los"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-2 pt-4 h-16"
                  type="text"
                  name="role"
                  value={params.los}
                  onChange={(e) => handleSelectionChange(e, "los")}
                  error={formErrors.los}
                >
                  <option disabled selected>
                    Customize your degree route 
                  </option>
                  {data.study_level.map((item) => (
                    <option key={uuid()} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <label
                  for="los"
                  class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Study Level
                </label>
                <p className="text-slider text-sm">
                  {formErrors.los ? "Please Select Study Destination" : ""}
                </p>
              </div>
            </div>
            <p className="text-slider">{message}</p>
          </form>
        </div>
      </div>
      <div className="flex justify-end my-16 md:my-2 ">
        {loading ? (
          <button
            disabled
            className="text-light font-semibold submit  py-3 rounded-lg w-[380px] "
          >
            Loading..
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="text-light font-semibold submit  py-3 rounded-lg w-[380px] "
          >
            Submit Details
          </button>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
