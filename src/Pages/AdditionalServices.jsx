import { Header } from "../components/Header";
import "../App.css";
import Particles from "react-tsparticles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { environment } from "../environments/environment";
import "../styles/explore.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import Validator from "validatorjs";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  option: {
    "&:hover": {
      backgroundColor: "#1E417C !important",
    },
  },
});

const dateInputStyles = () => {
  return {
    input: {
      "&::placeholder": {
        fontFamily: "audiowide",
        color: "#1E417C",
        opacity: 1,
      },
    },
    "& .MuiDialogContent-root": {
      background: "white !important",
    },
  };
};
const inputStyles = () => {
  return {
    input: {
      "&::placeholder": {
        fontFamily: "audiowide",
        color: "#1E417C",
        opacity: 1,
      },
    },
    "& .MuiInputBase-root": {
      "font-family": "audiowide !important",
    },
    "& .MuiInputBase-root:before": {
      "border-bottom": "1px solid #1E417C !important",
    },
    "& .MuiInputBase-input": {
      color: "#1E417C !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#404050",
    },
    backgroundColor: "transparent",
    "& .MuiFormLabel-root": {
      color: "#1E417C !important",
      fontFamily: "audiowide !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1E417C !important",
    },
    "& .Mui-error:after": {
      borderBottomColor: "#d32f2f !important",
    },
  };
};

const selectStyles = () => {
  return {
    input: {
      "&::placeholder": {
        fontFamily: "audiowide",
        color: "#1E417C",
        opacity: 1,
      },
    },
    "& .MuiFormLabel-root": {
      color: "#1E417C !important",
      fontFamily: "audiowide !important",
    },
    "& .MuiInputBase-input": {
      color: "#1E417C  !important",
    },
    "& .MuiSvgIcon-root": {
      fill: "#1E417C",
    },
    backgroundColor: "transparent",
  };
};

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  alternate_phone: "",
  dob: null,
  gender: "",
  passport_no: "",
  present_status: "",
  selected_service: "",
  country_id: "",
  notes: "",
  images: [
    {
      label: "Upload CV",
      url: "",
      file: "",
    },
  ],
};

const servicesList = [
  {
    name: "Pre-Departure",
    checked: false,
  },
  {
    name: "Forex Exchange",
    checked: false,
  },
  {
    name: "Destination – Arrival pickup",
    checked: false,
  },
  {
    name: "On- Arrival registrations",
    checked: false,
  },
  {
    name: "Internship (in-line to Subject area)",
    checked: false,
  },
  {
    name: "Accommodation",
    checked: false,
  },
  {
    name: "Part-time jobs (in-line to academics / work experience)",
    checked: false,
  },
  {
    name: "Resume / CV marketing for Professional jobs",
    checked: false,
  },
];
const AdditionalServices = () => {
  const styles = useStyles();

  const options = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 700,
        },
      },

      color: {
        value: "#b9cdf0",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#b9cdf0",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 0.1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 10,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#b9cdf0",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
  };

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [services, setServicesList] = useState(servicesList);
  const [formErrors, setFormErrors] = useState(initialState);

  const [inputs, setInputs] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    study_destination: [],
  });
  useEffect(() => {
    getDetails();
  }, []);
  const addMoreDoc = () => {
    const images = [...inputs.images];
    images.push({
      label: "Other Document",
      url: "",
      preview: "",
      file: "",
    });
    setInputs({ ...inputs, images });
  };
  const handleUploadChange = (e, index) => {
    const file = e.target.files[0];

    if(index ===0 && file.type!='application/pdf'){
      toast.error("Unsupported file selected, Only pdf allowed!.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    if (!['application/pdf','image/png','image/jpg','image/jpeg'].includes(file.type)) {
      toast.error("Unsupported file selected!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
    if (file.type === 'image/jfif'){
      alert('JIFF files are not supported.');
      e.target.files = null; 
       setInputs(initialState) 
      return;
    }
  if(file.size > 5 * 1024 * 1024){
    toast.error('file size must be less than 5 mb')
  }else{
    const images = [...inputs.images];
    images[index] = {
      label: images[index].label,
      file_name: file.name,
      file: file,
    };
    setInputs({ ...inputs, images });
  }
    
  };

  function chooseFile(i) {
    let ele = document.getElementById("inputFile" + i);
    if (ele) ele.click();
  }

  function deleteFile(index) {
    const images = [...inputs.images];
    images[index].file_name = "";
    images[index].file = "";
    setInputs({ ...inputs, images });
  }

  function handleChange(e) {
    setFormErrors(initialState)
    setMessage("");
    setErrorMessage("");
    let { name, value } = e.target;
    if (name === "phone" || name === "alternate_phone") {
      const re = /^[0-9\b]+$/;
      if (e.target.value && !re.test(e.target.value)) {
        return;
      }
    }
    if(name === 'passport_no'){
      const re = /[^a-zA-Z0-9]/
      if (e.target.value && re.test(e.target.value)) {
        return;
      }
    }
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleDateChange(e) {
    setMessage("");
    setErrorMessage("");
    setInputs((inputs) => ({ ...inputs, dob: moment(e).format("YYYY-MM-DD") }));
  }

  const handleSelectionChange = (value, name) => {
      setMessage("");
      setErrorMessage("");
      setInputs((inputs) => ({ ...inputs, [name]: value? String(value.label):''}));
  };

  const selectOrDeselect = (item) => {
    let list = services.slice(0);
    let index = list.findIndex((x) => x.name === item.name);
    if (index !== -1) {
      list[index].checked = item.checked ? false : true;
    }
    setServicesList(list);
    setErrorMessage("");
  };

  const openNextOrPrev = () => {
    if (services.some((x) => x.checked)) {
      setStep(2);
    } else {
      setErrorMessage("Please Select Atleast one service!");
    }

    if (step === 2) {
      setStep(1);
      setFormErrors(initialState)
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setErrorMessage("");

    const rules = {
      email: "required|max:50|email",
      first_name: "required|max:30",
      last_name: "required|max:30",
      phone: "required|max:10|min:10",
      alternate_phone: "max:10|min:10",
      country_id:'required',
      passport_no:'max:12',
      present_status:'required',
      gender:'required',
      dob:'required'

    };
    const validation = new Validator(inputs, rules);

    if (validation.fails()) {
      const fieldErrors = {};
      Object.keys(validation.errors.errors).forEach((key) => {
        fieldErrors[key] = validation.errors.errors[key][0];
      });

      const err = Object.keys(fieldErrors);
      if (err.length) {
        const input = document.querySelector(`input[name=${err[0]}]`);
        if (input) {
          input.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "start",
          });
        }
      }

      setFormErrors(fieldErrors);
      return false;
    }
    let list = ["email", "phone", "first_name", "last_name"];
    for (let item of list) {
      if (!inputs[item]) {
        toast("Please Enter all details");
        break;
      }
    }

    let requiredKeys = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "dob",
      "gender",
      "present_status",
      "country_id",
    ];
    let fields = ["alternate_phone", "passport_no", "notes"];
    let valid = requiredKeys.every((x) => inputs[x]);

    if (valid) {
      const formData = new FormData();
      let payloadFields = [...fields, ...requiredKeys];
      for (let item of payloadFields) {
        if (["country_id", "images"].includes(item)) continue;
        formData.append(item, inputs[item]);
      }
      formData.append(
        "selected_service",
        services
          .filter((x) => x.checked)
          .map((x) => x.name)
          .toString()
      );
      const files = inputs.images.filter((x) => x.file);
      if (files.length) {
        const labels = files.map((x) => x.label);
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i].file);
        }

        formData.append("labels", JSON.stringify(labels));
      }
      let study_destination = data.study_destination.find(
        (x) => x.name === inputs.country_id
      );
      formData.append("country_id", study_destination.id);

      setLoading(true);
      axios
        .post(`${environment.API_BASE_URL}/additional-services`, formData)
        .then((response) => {
          setLoading(false);
          setMessage(response.data.data.message);
          setInputs(initialState);
          setSubmitted(false);
        })
        .catch((error) => {
          setLoading(false);
          const { errors } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
          setErrorMessage(erroMsg);
        });
    } else {
      setErrorMessage("Please fill all required fields");
    }
  }

  const getDetails = () => {
    axios
      .get(`${environment.API_BASE_URL}/prerequisite`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPaste = (e) => {
    var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])', // U+1F680 to U+1F6FF
    ]
  
    if (e.clipboardData.getData('text/plain').match(ranges.join('|'))) {
      e.preventDefault()
      return false
    }
  }
  
  const onkeydownEvent = (e) => {
    var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])', // U+1F680 to U+1F6FF
    ]
    if (e.target.value && e.target.value.match(ranges.join('|'))) {
      e.preventDefault()
      return false
    }
    handleChange(e)
  }
  
  
  return (
    <div className="App bg-lightWhite h-auto">
      <Particles params={options} />
      <Header />

      <section className="additional-services add-on relative">
        <div className="vertical-tab">
          <div className="vertical-tab-secondsection w-full">
            <div className="vertical-tab-header">
              <div className="vertical-tab-header-content">
                <div className="grid grid-cols gap-2">
                  <h4 className="mt-4 text-left">Additional Services</h4>
                  <p className="color-light-blue">
                    Please fill the Following Fields. Our Executive will help
                    you out.
                  </p>
                </div>
                <div className="add-on-btn  hidden md:flex mr-8">
                  {step === 1 ? (
                    <>
                      <a
                        className="flex cursor-pointer gap-2"
                        onClick={openNextOrPrev}
                      >
                        Next
                        <svg
                          className="w-1/4"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.43 18.0699L20.5 11.9999L14.43 5.92995"
                            stroke="#C41230"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.50008 12L20.3301 12"
                            stroke="#C41230"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                    </>
                  ) : (
                    <a
                      className="flex cursor-pointer gap-2"
                      onClick={openNextOrPrev}
                    >
                      <svg
                        className="w-1/4"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                          stroke="#C41230"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.4999 12H3.66992"
                          stroke="#C41230"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Previous
                    </a>
                  )}
                </div>
              </div>
              <hr className="color-light-blue bg-color-light-blue" />
            </div>
            {step === 1 ? (
              <>
                <div className="vertical-tab-content-section w-full">
                  <div className="card-view">
                    <div className="study-level py-8">
                      <ul className="justify-center md:justify-start py-4 md:py-0">
                        {services.map((x) => (
                          <li
                            onClick={(e) => selectOrDeselect(x)}
                            className={` cursor-pointer ${
                              x.checked ? "study-option-active" : ""
                            }`}
                          >
                            <a>{x.name}</a>
                          </li>
                        ))}
                      </ul>
                      <p className="text-center my-4 text-red">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                <form
                  name="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col  text-xs  form md:text-base px-8 py-2 "
                >
                  <div className="   ">
                    <div className="grid md:grid-cols-2 md:gap-16 py-4">
                      <div className="flex flex-col gap-y-5">
                        <div className="flex space-x-4 ">
                          <div>
                            <TextField
                              autoComplete="off"
                              type="text"
                              className={
                                "mb-6 " +
                                (submitted && !inputs.first_name
                                  ? " is-invalid"
                                  : "")
                              }
                              fullWidth
                              maxLength={10}
                              value={inputs.first_name}
                              name="first_name"
                              onPaste={onPaste}
                              onChange={(e) => onkeydownEvent(e)}
                              sx={inputStyles()}
                              variant="standard"
                              hiddenLabel="true"
                              error={submitted && !inputs.first_name}
                              placeholder="First Name"
                            />
                            {formErrors.first_name ? (
                              <p className="text-xs text-red">
                                {formErrors.first_name}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            <TextField
                              autoComplete="off"
                              type="text"
                              value={inputs.last_name}
                              name="last_name"
                              className={
                                "mb-6" +
                                (submitted && !inputs.last_name
                                  ? " is-invalid"
                                  : "")
                              }
                              fullWidth
                              onPaste={onPaste}
                              onChange={(e) => onkeydownEvent(e)}
                              sx={inputStyles()}
                              variant="standard"
                              hiddenLabel="true"
                              error={submitted && !inputs.last_name}
                              placeholder="Last Name"
                            />
                            {formErrors.last_name ? (
                              <p className="text-xs text-red">
                                {formErrors.last_name}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div>
                          <TextField
                            autoComplete="off"
                            type="text"
                            className={
                              "custom-input-field" +
                              (submitted && !inputs.phone ? " is-invalid" : "")
                            }
                            fullWidth
                            maxLength={10}
                            value={inputs.phone}
                            name="phone"
                            onPaste={onPaste}
                            onChange={(e) => onkeydownEvent(e)}
                            sx={inputStyles()}
                            variant="standard"
                            hiddenLabel="true"
                            placeholder="Phone"
                            error={submitted && !inputs.phone}
                          />
                          {formErrors.phone ? (
                            <p className="text-xs text-red">
                              {formErrors.phone}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div>
                          <TextField
                            autoComplete="off"
                            type="text"
                            className={
                              "custom-input-field" +
                              (submitted && !inputs.alternate_phone
                                ? " is-invalid"
                                : "")
                            }
                            fullWidth
                            maxLength={10}
                            value={inputs.alternate_phone}
                            name="alternate_phone"
                            onPaste={onPaste}
                            onChange={(e) => onkeydownEvent(e)}
                            sx={inputStyles()}
                            variant="standard"
                            hiddenLabel="true"
                            placeholder="Alternate Mobile"
                          />
                          {formErrors.alternate_phone ? (
                            <p className="text-xs text-red">
                              {formErrors.alternate_phone}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div>
                          <TextField
                            autoComplete="off"
                            type="email"
                            value={inputs.email}
                            name="email"
                            className={
                              "custom-input-field" +
                              (submitted && !inputs.email ? " is-invalid" : "")
                            }
                            fullWidth
                            onPaste={onPaste}
                            onChange={(e) => onkeydownEvent(e)}
                            sx={inputStyles()}
                            variant="standard"
                            hiddenLabel="true"
                            placeholder="Email"
                            error={submitted && !inputs.email}
                          />
                          {formErrors.email ? (
                            <p className="text-xs text-red">
                              {formErrors.email}
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="flex space-x-4  date-picker-custom">
                          <div>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                              inputFormat="dd-MM-yyyy"
                              sx={dateInputStyles()}
                              hiddenLabel="true"
                              value={inputs.dob}
                              error={submitted && formErrors.dob}
                              maxDate={new Date()}
                              name="dob"
                              onChange={handleDateChange}
                              renderInput={(params , inputProps) => (
                              <>
                              <TextField
                              inputProps={{ readOnly:true, autoComplete: 'off' }}
                               onKeyDown={(e)=>{e.preventDefault()}}
                                error={submitted && formErrors.dob}
                                placeholder="DOB"
                                {...params}
                                sx={inputStyles()}
                                disableMaskedInput={true}
                                variant="standard"
                              />
                              </>
                            )}
                          />
                          </LocalizationProvider>
                          {formErrors.dob ? <p className="text-red text-xs">{formErrors.dob}</p> : ''}

                          </div>
                         
                          <Autocomplete
                            className="w-[50%]"
                            disablePortal
                            classes={{
                              option: styles.option,
                            }}
                            fontFamily="audiowide"
                            id="gender"
                            name="gender"
                            value={inputs.gender}
                            isOptionEqualToValue={(option, value) =>
                              option.label === value.label
                            }
                            onChange={(e, value) =>
                              handleSelectionChange(value, "gender")
                            }
                            options={[{ label: "Male" }, { label: "Female" }]}
                            renderOption={(props, option) => {
                              return (
                                <span
                                  {...props}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "audiowide",
                                  }}
                                >
                                  {option.label}
                                </span>
                              );
                            }}
                            sx={selectStyles()}
                            hiddenLabel="true"
                            renderInput={(params) => (
                              <>
                              <TextField
                                {...params}
                                error={submitted && !inputs.gender}
                                onKeyDown={(e)=>{e.preventDefault()}}
                                style={{
                                  backgroundColor: "#1E417C !important",
                                }}
                                placeholder="Gender"
                                variant="standard"
                              />
                                {formErrors.gender ? <p className="text-red text-xs">{formErrors.gender}</p> : ''}
                              </>
                            )}
                          />
                        </div>
                         <div>
                        <TextField
                          autoComplete="off"
                          type="text"
                          className={
                            "custom-input-field" +
                            (submitted && !inputs.passport_no
                              ? " is-invalid"
                              : "")
                          }
                          fullWidth
                          maxLength={10}
                          value={inputs.passport_no}
                          name="passport_no"
                          onPaste={onPaste}
                          onChange={(e) => onkeydownEvent(e)}
                          sx={inputStyles()}
                          variant="standard"
                          hiddenLabel="true"
                          placeholder="Passport No"
                        />
                        {formErrors.passport_no ? <p className="text-red text-xs">{formErrors.passport_no}</p> : ''}
                        </div>

                        <div>
                        <Autocomplete
                          className="mt-4 w-full"
                          disablePortal
                          autoComplete="off"
                          classes={{
                            option: styles.option,
                          }}
                          fontFamily="audiowide"
                          id="present_status"
                          name="present_status"
                          hiddenLabel="true"
                          value={inputs.present_status}
                          isOptionEqualToValue={(option, value) =>
                            option.label === value.label
                          }
                          onChange={(e, value) =>
                            handleSelectionChange(value, "present_status")
                          }
                          options={[
                            { label: "Student" },
                            { label: "Graduated" },
                            { label: "Waiting for results" },
                          ]}
                          renderOption={(props, option) => {
                            return (
                              <span
                                {...props}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "audiowide",
                                }}
                              >
                                {option.label}
                              </span>
                            );
                          }}
                          sx={selectStyles()}
                          renderInput={(params) => (
                            <>
                            <TextField
                              {...params}
                              error={submitted && !inputs.present_status}
                              style={{ backgroundColor: "#1E417C !important" }}
                              placeholder="Present Status "
                              autocomplete="off"
                              variant="standard"
                            />
                            {formErrors.present_status ? <p className="text-red text-xs">{formErrors.present_status}</p> : ''}
                            </>
                          )}
                        />
                        </div>
                       
                        <div>
                        <Autocomplete
                          disablePortal
                          inputValue={inputs.country_id}
                          clearOnBlur={true}
                          defaultvalue={inputs.country_id}
                          classes={{
                            option: styles.option,
                          }}
                          hiddenLabel="true"
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onChange={(e, value) =>
                            handleSelectionChange(value, "country_id")
                          }
                          name="country_id"
                          id="country_id"
                          options={data.study_destination.map((x) => {
                            x["label"] = x.name;
                            return x;
                          })}
                          renderOption={(props, option) => {
                            return (
                              <span
                                {...props}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "audiowide",
                                }}
                              >
                                {option.label}
                              </span>
                            );
                          }}
                          sx={selectStyles()}
                              renderInput={(params) => (
                                <>
                                  <TextField
                                    {...params}
                                    error={submitted && !inputs.country_id}
                                    classes={{ root: styles.customTextField }}
                                    style={{ backgroundColor: "#fff !important" }}
                                    placeholder="Country"
                                    variant="standard"
                                  />
                                  {formErrors.country_id ? <p className="text-red text-xs">{formErrors.country_id}</p> : ''}
                                </>
                              )}
                        />
                        </div>

                        <p className="text-sm text-slider pt-2">
                          {errorMessage}
                        </p>
                        <p className="text-sm text-green pt-2">{message}</p>
                      </div>

                      <div className="flex flex-col gap-y-6">
                        <p className="title-uploads">
                          Upload Supporting Documents
                        </p>

                        {inputs.images
                          .filter((x) => x)
                          .map((list, index) => (
                            <div
                              className={`file-upload-box w-full h-fit  py-4  px-4 md:px-5`}
                            >
                              {!list.file_name ? (
                                <>
                                  <div
                                    className={`flex justify-between space-x-10 items-center`}
                                  >
                                    <div className="flex justify-center items-center  space-x-2">
                                      <div>
                                        <svg
                                          width="26"
                                          height="25"
                                          viewBox="0 0 26 25"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M12.9906 0.547885C11.7082 0.653952 10.5232 1.06995 9.42961 1.79796C8.76171 2.24262 7.77595 3.2341 7.38713 3.85229C7.13583 4.25185 7.09863 4.28954 6.98441 4.26073C6.76725 4.20589 5.81497 4.22847 5.49939 4.29593C4.61568 4.48483 3.73967 5.02628 3.17269 5.73405C2.49084 6.58522 2.20748 7.50025 2.27121 8.64497L2.30277 9.21137L2.06245 9.40585C1.50786 9.85477 0.963936 10.5403 0.61332 11.2323C-0.499288 13.4282 -0.0709981 16.149 1.6777 17.9933C2.34511 18.6972 3.03602 19.1652 3.84931 19.4643C4.63863 19.7546 4.83858 19.7708 7.62403 19.7708C10.4622 19.7708 10.3466 19.7849 10.5538 19.4134C10.7431 19.0739 10.6478 18.6813 10.3242 18.4674C10.1966 18.3831 9.97947 18.3736 7.59081 18.348C4.72044 18.3172 4.76564 18.3221 4.01885 17.9671C2.71928 17.3494 1.78518 16.102 1.49517 14.5968C1.46557 14.4434 1.44106 14.0766 1.4407 13.7817C1.43879 12.3585 2.12638 11.0765 3.35044 10.2211C3.84916 9.87253 3.94978 9.64315 3.8118 9.16887C3.78346 9.07142 3.7373 8.8288 3.70926 8.62971C3.53161 7.36938 4.37193 6.11434 5.64054 5.74536C6.00208 5.64021 6.65781 5.63934 7.03475 5.74358C7.63118 5.90849 7.95058 5.7974 8.1754 5.34686C8.90019 3.89419 10.2329 2.73491 11.741 2.24526C12.9283 1.8598 14.3099 1.86994 15.5208 2.27311C16.4348 2.57746 17.1586 3.03074 17.8605 3.73856C18.7202 4.60566 19.275 5.6572 19.4945 6.83585C19.6948 7.91088 19.711 7.93314 20.4368 8.12971C21.6465 8.45729 22.5436 9.0521 23.2473 9.9932C23.9642 10.952 24.305 11.9767 24.3063 13.1777C24.3076 14.5002 23.8348 15.7213 22.949 16.6829C22.217 17.4775 21.4839 17.9315 20.4794 18.212C20.1258 18.3108 19.9295 18.3207 17.7956 18.3473L15.4933 18.3759L15.3038 18.567C15.1287 18.7434 15.1143 18.7802 15.1143 19.0488C15.1143 19.3821 15.2178 19.5673 15.4743 19.6931C15.7073 19.8073 19.7465 19.8076 20.4059 19.6934C21.6799 19.4729 22.8398 18.8579 23.7994 17.894C25.2721 16.415 25.9907 14.2724 25.6879 12.2635C25.3083 9.7447 23.5743 7.6329 21.2744 6.8883L20.9406 6.78031L20.8806 6.46566C20.8476 6.29263 20.7428 5.91468 20.6476 5.62575C19.8375 3.16511 17.7319 1.26864 15.1722 0.694127C14.8137 0.613676 13.5916 0.47616 13.4782 0.503552C13.4644 0.506899 13.245 0.526834 12.9906 0.547885ZM12.6225 9.47885C12.471 9.53845 8.56916 13.4479 8.46616 13.6432C8.42644 13.7186 8.39392 13.8867 8.39392 14.0169C8.39392 14.2236 8.41834 14.2783 8.58607 14.4473C8.80485 14.6678 8.96734 14.7245 9.23747 14.6747C9.39961 14.6448 9.61708 14.448 10.7976 13.2627L12.1694 11.8855V17.9358C12.1694 24.5822 12.1493 24.1557 12.474 24.3887C12.5833 24.4671 12.7025 24.5 12.8775 24.5C13.1638 24.5 13.3377 24.4043 13.4804 24.1685C13.5762 24.0102 13.5786 23.8635 13.5787 17.9451L13.5789 11.8837L14.9255 13.2379C15.6661 13.9827 16.3359 14.616 16.4138 14.6452C16.4917 14.6744 16.6132 14.6983 16.6838 14.6983C16.8642 14.6983 17.1718 14.5123 17.2708 14.3433C17.3735 14.1681 17.3791 13.827 17.2822 13.6432C17.1707 13.4317 13.2703 9.53597 13.11 9.47591C12.9387 9.41179 12.7905 9.41265 12.6225 9.47885Z"
                                            fill="#C22133"
                                          />
                                        </svg>
                                      </div>

                                      <div className="flex flex-col gap-1">
                                        <p className="text-sm">{list.label}</p>
                                        <p className="text-xs text-[#1E417C]">
                                          Please Choose File
                                        </p>
                                        <p className="text-xs text-[#1E417C]">
                                          Maximum Size: 5 MB
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <input
                                        type="file"
                                        id={"inputFile" + index}
                                        accept=".pdf"
                                        className="hidden relative"
                                        onChange={(e) =>
                                          handleUploadChange(e, index)
                                        }
                                      />
                                      <div
                                        className="upload-btn flex cursor-pointer justify-center items-center rounded-lg"
                                        role="presentation"
                                        onClick={() => chooseFile(index)}
                                      >
                                        <p className="choose-btn">
                                          Choose File
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div
                                  className={`flex justify-between space-x-10 items-center`}
                                >
                                  <div className="flex justify-center items-center  space-x-2">
                                    <div className="flex flex-col">
                                      <p className="text-xs text-ellipsis">
                                        {list.file_name}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <div
                                      className="upload-btn flex cursor-pointer 
                                                                          justify-center items-center rounded-lg"
                                      role="presentation"
                                      onClick={() => deleteFile(index)}
                                    >
                                      <p className="delete-btn">Delete</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                        {inputs.images?.length < 2 && (
                          <div className="flex justify-end">
                            <h1 className="text-[#C41230]" onClick={addMoreDoc}>
                              Add other Document
                            </h1>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex  justify-center  md:justify-end">
                    {!loading ? (
                      <button
                        type="submit"
                        className="w-[300px] text-white p-2  text-xs rounded bg-darkred "
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-[300px] p-2  mt-4 text-xs rounded bg-darkred "
                      >
                        Loading...
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            <div className="pb-4 w-full flex justify-center">
              <div className="add-on-btn  flex md:hidden  my-4 m-auto">
                {step === 1 ? (
                  <>
                    <a
                      className="flex cursor-pointer gap-2"
                      onClick={openNextOrPrev}
                    >
                      Next
                      <svg
                        className="w-1/4"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.43 18.0699L20.5 11.9999L14.43 5.92995"
                          stroke="#C41230"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.50008 12L20.3301 12"
                          stroke="#C41230"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a>
                  </>
                ) : (
                  <a
                    className="flex cursor-pointer gap-2"
                    onClick={openNextOrPrev}
                  >
                    <svg
                      className="w-1/4"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                        stroke="#C41230"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.4999 12H3.66992"
                        stroke="#C41230"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Previous
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalServices;
