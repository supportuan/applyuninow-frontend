import React from "react";
import "../styles/connectform.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { environment } from "../environments/environment";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Validator from "validatorjs";
import { toast } from "react-toastify";
const useStyles = makeStyles({
  option: {
    "&:hover": {
      backgroundColor: "#fff !important",
    },
  },
  customTextField: {
    "& input::placeholder": {
      color: "#fff !important",
    },
  },
});

const inputStyles = () => {
  return {
    input: {
      "&::placeholder": {
        fontFamily: "audiowide",
        color: "#fff",
        opacity: 1,
      },
    },
    "& .MuiInputBase-root:before": {
      "border-bottom": "1px solid #fff !important",
    },
    "& .MuiInputBase-input": {
      color: "white !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#404050",
    },
    backgroundColor: "transparent",
    "& .MuiFormLabel-root": {
      color: "white !important",
      fontFamily: "audiowide !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff !important",
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
        color: "#fff",
        opacity: 1,
      },
    },
    width: "100%",
    "& .MuiAutocomplete-inputRoot:before": {
      "border-bottom": "1px solid #fff !important",
    },
    "& .MuiFormLabel-root": {
      color: "white !important",
      fontFamily: "audiowide !important",
    },
    "& .MuiInputBase-input": {
      color: "white  !important",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
    backgroundColor: "transparent",
  };
};

const initialState = {
  email: "",
  phone: "",
  level: "",
  country_id: "",
  industry: "",
  intake_month: "",
  intake_year: "",
  first_name: "",
  last_name: "",
};
export const ConnectForm = () => {
  const styles = useStyles();
  useEffect(() => {
    getDetails();
  }, []);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    study_destination: [],
    study_level: [],
    study_industry: [],
    study_intake: [],
    intake_month: [],
    intake_year: [],
    study_area: [],
  });
  const [inputs, setInputs] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { email, phone, level, country_id, industry } = inputs;

  const onPaste = (e) => {
    var ranges = [
      "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
    ];

    if (e.clipboardData.getData("text/plain").match(ranges.join("|"))) {
      e.preventDefault();
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if (value && !re.test(value)) {
        return;
      }
    }

    var ranges = [
      "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
    ];
    if (e.target.value && e.target.value.match(ranges.join("|"))) {
      e.preventDefault();
      return false;
    }
    handleChange(e);
  };

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
  function handleChange(e) {
    setMessage("");
    setErrorMessage("");
    setFormErrors(initialState)
    const { name, value } = e.target;
    if (name == "phone") {
      const re = /^[0-9\b]+$/;
      if (e.target.value && !re.test(e.target.value)) {
        return;
      }
    }
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  const handleSelectionChange = (value, name) => {
    if (value) {
      setMessage("");
      setErrorMessage("");
      setInputs((inputs) => ({ ...inputs, [name]: String(value.label) }));
    } else {
      setInputs((inputs) => ({ ...inputs, [name]: "" }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const rules = {
      first_name: "required|max:30",
      last_name: "required|max:30",
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

    setErrorMessage("");
    let valid = Object.keys(inputs).every((x) => inputs[x]);

    if (valid) {
      let country = data.study_destination.find(
        (x) => x.name === inputs.country_id
      );
      let industry = data.study_industry.find(
        (x) => x.name === inputs.industry
      );

      let payload = JSON.parse(JSON.stringify(inputs));
      payload["country_id"] = country.id;
      payload["industry_id"] = industry.id;

      setLoading(true);
      axios
        .post(`${environment.API_BASE_URL}/contact-request/home`, payload)
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
      setErrorMessage("Please Fill Required Fields");
    }
  }

  return (
    <div className={`relative mt-8 connect_form`}>
      <div className="block w-full m-auto bg-white lg:max-w-6xl bg-red-rect white_div sm:flex sm:flex-row-reverse sm:relative md:top-44 top-48">
        <div className="block w-full md:shadow-3xl contact-form from-darkblue to-lightblue sm:absolute md:left-12 md:bottom-12 sm:left-8 sm:bottom-8 md:w-5/12 lg:w-6/12 sm:w-5/12">
          <form
            name="form "
            onSubmit={handleSubmit}
            className="flex flex-col px-12 py-12 text-xs text-white lg:px-20 xl:px-32 form md:text-base"
          >
            <p className="pb-2 text-xl text-center">Connect with us</p>

            <Autocomplete
              disablePortal
              inputValue={country_id}
              clearOnBlur={true}
              defaultvalue={country_id}
              classes={{
                option: styles.option,
              }}
              hiddenLabel="true"
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    style={{ backgroundColor: "#fff", fontFamily: "audiowide" }}
                  >
                    {option.label}
                  </span>
                );
              }}
              sx={selectStyles()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onPaste={onPaste}
                  error={submitted && !country_id}
                  classes={{ root: styles.customTextField }}
                  style={{ backgroundColor: "#fff !important" }}
                  placeholder="Study Destination"
                  variant="standard"
                />
              )}
            />

            <Autocomplete
              disablePortal
              inputValue={level}
              className="mt-4"
              classes={{
                option: styles.option,
              }}
              hiddenLabel="true"
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              onChange={(e, value) => handleSelectionChange(value, "level")}
              name="level"
              id="level"
              options={data.study_level.map((x) => {
                let y = { label: x };
                return y;
              })}
              renderOption={(props, option) => {
                return (
                  <span
                    {...props}
                    style={{ backgroundColor: "#fff", fontFamily: "audiowide" }}
                  >
                    {option.label}
                  </span>
                );
              }}
              sx={selectStyles()}
              renderInput={(params) => (
                <TextField
                  onPaste={onPaste}
                  {...params}
                  error={submitted && !level}
                  style={{ backgroundColor: "#fff !important" }}
                  placeholder="Level of Study"
                  variant="standard"
                />
              )}
            />

            <Autocomplete
              disablePortal
              className="mt-4"
              inputValue={industry}
              classes={{
                option: styles.option,
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => handleSelectionChange(value, "industry")}
              name="industry"
              id="industry"
              hiddenLabel="true"
              options={data.study_industry.map((x) => {
                let y = { label: x.name };
                return y;
              })}
              renderOption={(props, option) => {
                return (
                  <span
                    {...props}
                    style={{ backgroundColor: "#fff", fontFamily: "audiowide" }}
                  >
                    {option.label}
                  </span>
                );
              }}
              sx={selectStyles()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onPaste={onPaste}
                  error={submitted && !inputs.industry}
                  onKeyDown={(e) => { e.preventDefault() }}
                  style={{ backgroundColor: "#fff !important" }}
                  placeholder="Study Industry"
                  variant="standard"
                />
              )}
            />
            <div className="flex space-x-2">
              <Autocomplete
                disablePortal
                inputValue={inputs.intake_month}
                classes={{
                  option: styles.option,
                }}
                className="mt-4"
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                onChange={(e, value) =>
                  handleSelectionChange(value, "intake_month")
                }
                name="intake_month"
                id="intake_month"
                hiddenLabel="true"
                options={data.intake_month.map((x) => {
                  let y = { label: x };
                  return y;
                })}
                renderOption={(props, option) => {
                  return (
                    <span
                      {...props}
                      style={{
                        backgroundColor: "#fff",
                        fontFamily: "audiowide",
                        fontSize: '10px'
                      }}
                    >
                      {option.label}
                    </span>
                  );
                }}
                sx={selectStyles()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onPaste={onPaste}
                    error={submitted && !inputs.intake_month}
                    style={{ backgroundColor: "#fff !important" }}
                    placeholder="Intake Month"
                    variant="standard"
                  />
                )}
              />

              <Autocomplete
                disablePortal
                inputValue={inputs.intake_year}
                classes={{
                  option: styles.option,
                }}
                className="mt-4"
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                onChange={(e, value) =>
                  handleSelectionChange(value, "intake_year")
                }
                name="intake_year"
                id="intake_year"
                hiddenLabel="true"
                options={data.intake_year.map((x) => {
                  let y = { label: String(x) };
                  return y;
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
                  <TextField
                    {...params}
                    onPaste={onPaste}
                    error={submitted && !inputs.intake_year}
                    style={{ backgroundColor: "#fff !important" }}
                    placeholder="Intake Year"
                    variant="standard"
                  />
                )}
              />
            </div>

            <div className="flex space-x-2 mt-4">
              <div>
                <TextField
                  autoComplete="off"
                  type="text"
                  error={submitted && !inputs.first_name}
                  className={
                    "mb-6 " +
                    (submitted && !inputs.first_name ? " is-invalid" : "")
                  }
                  fullWidth
                  maxLength={10}
                  value={inputs.first_name}
                  name="first_name"
                  onPaste={onPaste}
                  onChange={handleInputChange}
                  sx={inputStyles()}
                  variant="standard"
                  hiddenLabel="true"
                  placeholder="First Name"
                />
                {formErrors?.first_name ? <p className="text-xs text-red">{formErrors?.first_name}</p> : ''}
              </div>
              <div>
                <TextField
                  autoComplete="off"
                  type="text"
                  value={inputs.last_name}
                  error={submitted && !inputs.last_name}
                  name="last_name"
                  className={
                    "mb-6" + (submitted && !inputs.last_name ? " is-invalid" : "")
                  }
                  fullWidth
                  onPaste={onPaste}
                  onChange={handleInputChange}
                  sx={inputStyles()}
                  variant="standard"
                  placeholder="Last Name"
                  hiddenLabel="true"
                />
                {formErrors?.last_name ? <p className="text-xs text-red">{formErrors?.last_name}</p> : ''}
              </div>
            </div>

            <TextField
              autoComplete="off"
              type="text"
              error={submitted && !inputs.phone}
              className={
                "custom-input-field" +
                (submitted && !phone ? " is-invalid" : "")
              }
              fullWidth
              maxLength={10}
              value={phone}
              name="phone"
              onPaste={onPaste}
              onChange={handleInputChange}
              sx={inputStyles()}
              variant="standard"
              placeholder="Phone"
              hiddenLabel="true"
            />

            <TextField
              autoComplete="off"
              type="email"
              value={email}
              name="email"
              error={submitted && !inputs.email}
              className={
                "custom-input-field" +
                (submitted && !email ? " is-invalid" : "")
              }
              fullWidth
              onChange={handleInputChange}
              onPaste={onPaste}
              sx={inputStyles()}
              variant="standard"
              placeholder="Email"
              hiddenLabel="true"
            />

            <p className="text-sm text-slider pt-4">{errorMessage}</p>
            <p className="text-sm text-green pt-4 ">{message}</p>
            {!loading ? (
              <button
                type="submit"
                className="w-[calc(100%-52px)] p-2 m-auto mt-6 text-xs rounded bg-darkred "
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="w-[calc(100%-52px)] p-2 m-auto mt-4 text-xs rounded bg-darkred "
              >
                Loading...
              </button>
            )}
          </form>
        </div>

        <div className=" contact_info_div flex flex-col items-center justify-center px-4 py-12  lg:w-5/12 text-darkblue md:px-26 sm:text-xs md:text-base ">
          <div className="leading-loose ">
            <h4 className="mb-4 text-xl text-center  text-darkblue">
              We&apos;re here to help..
            </h4>
            <div className="flex space-x-2 justify-center">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.44118 0.711795C5.34779 -0.196646 6.90685 -0.294141 7.82169 0.761443L11.6794 5.21445C12.5056 6.16824 12.3376 7.54576 11.5128 8.37461L11.5112 8.3762L10.2638 9.62451C11.5371 11.7011 13.282 13.4486 15.3567 14.7249L16.6067 13.4731C16.6068 13.4729 16.6066 13.4732 16.6067 13.4731C17.432 12.6462 18.8063 12.4767 19.7591 13.2946C19.7591 13.2946 19.7591 13.2946 19.7591 13.2946L24.229 17.1317C25.2933 18.046 25.1972 19.6124 24.2879 20.5217L21.0866 23.7287C19.8428 24.9741 17.9438 25.378 16.3618 24.61C16.3615 24.6099 16.3621 24.6101 16.3618 24.61C9.38802 21.2298 3.7599 15.5938 0.389431 8.61523C0.389732 8.61585 0.390032 8.61647 0.390334 8.61709L1.37636 8.13857L0.389431 8.61523C-0.377439 7.03292 0.0259106 5.13444 1.26888 3.88979L4.44118 0.711795C4.44112 0.711848 4.44123 0.711742 4.44118 0.711795ZM1.26888 3.88979C1.26896 3.88971 1.26881 3.88987 1.26888 3.88979V3.88979ZM15.0343 15.0481C15.0373 15.045 15.0403 15.042 15.0433 15.0389L15.0343 15.0481ZM9.94216 9.94594L9.9516 9.93671C9.94849 9.93982 9.94535 9.9429 9.94216 9.94594ZM6.13595 2.19212C6.10127 2.19225 6.04601 2.20684 5.99272 2.26024L2.82027 5.4384C2.17558 6.08386 2.03813 6.99188 2.36239 7.66004L2.3633 7.6619C5.51899 14.1958 10.7885 19.4726 17.3179 22.6375C17.9844 22.9613 18.8912 22.8249 19.5355 22.1799L22.7372 18.9724C22.7909 18.9187 22.8066 18.8617 22.8067 18.8258C22.8067 18.8082 22.8032 18.7987 22.8022 18.7962C22.8019 18.7957 22.8022 18.7964 22.8022 18.7962C22.8021 18.7961 22.8016 18.7953 22.8013 18.795M22.8013 18.795L18.3313 14.9579C18.331 14.9576 18.3301 14.9568 18.3267 14.9557C18.3221 14.9542 18.3111 14.9519 18.2937 14.9531C18.258 14.9557 18.2066 14.9731 18.1586 15.0212L16.6092 16.5729C16.3653 16.8235 16.0468 16.9887 15.7012 17.0437C15.3503 17.0996 14.9907 17.0387 14.6778 16.8705C14.6684 16.8654 14.659 16.8602 14.6498 16.8549C11.9396 15.2942 9.69139 13.0431 8.13424 10.3308C8.12915 10.322 8.12419 10.3131 8.11935 10.3041C7.95109 9.99101 7.89016 9.63141 7.94591 9.28042C8.00082 8.93477 8.16589 8.61625 8.41633 8.37218L9.95901 6.82837C9.95917 6.82821 9.95885 6.82853 9.95901 6.82837C10.0081 6.77886 10.026 6.72578 10.0285 6.6896C10.0297 6.67187 10.0273 6.66068 10.0257 6.6558C10.0245 6.65189 10.0236 6.65077 10.0227 6.64975C10.0226 6.64973 10.0227 6.64977 10.0227 6.64975L6.1652 2.19707C6.16304 2.19613 6.15303 2.19206 6.13595 2.19212"
                  fill="#C12032"
                />
              </svg>
              <span> & </span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.2279 14.9813C17.916 14.8261 16.3868 14.0781 16.1021 13.974C15.8174 13.8709 15.6102 13.8198 15.4019 14.1302C15.1946 14.4386 14.5991 15.1365 14.418 15.3427C14.2359 15.55 14.0548 15.575 13.7439 15.4209C13.4331 15.2646 12.4304 14.9386 11.2424 13.8844C10.3182 13.0636 9.6933 12.05 9.51222 11.7396C9.33115 11.4302 9.49234 11.2625 9.64829 11.1084C9.78855 10.9698 9.95915 10.7469 10.1151 10.5667C10.2711 10.3854 10.3224 10.2563 10.426 10.049C10.5306 9.84274 10.4783 9.66253 10.3998 9.50732C10.3224 9.35211 9.70063 7.82815 9.44105 7.20836C9.1888 6.60524 8.93236 6.68753 8.74187 6.67711C8.55975 6.66878 8.3525 6.6667 8.14526 6.6667C7.93802 6.6667 7.60099 6.74378 7.31629 7.0542C7.03055 7.36357 6.22774 8.11253 6.22774 9.63649C6.22774 11.1594 7.34141 12.6313 7.49737 12.8386C7.65332 13.0448 9.69016 16.1719 12.8103 17.5125C13.5535 17.8313 14.1323 18.0219 14.5834 18.1636C15.3286 18.4 16.0069 18.3667 16.5428 18.2865C17.1394 18.1979 18.3828 17.5375 18.6424 16.8146C18.9009 16.0917 18.9009 15.4719 18.8235 15.3427C18.746 15.2136 18.5388 15.1365 18.2269 14.9813L18.2279 14.9813ZM12.5528 22.6927L12.5486 22.6927C10.6954 22.6931 8.87623 22.1973 7.28175 21.2573L6.90494 21.0344L2.98827 22.0573L4.0339 18.2573L3.78793 17.8677C2.75186 16.2264 2.20357 14.3269 2.2064 12.3886C2.20849 6.71149 6.84947 2.09275 12.557 2.09275C15.3202 2.09275 17.9181 3.16566 19.8712 5.11149C20.8346 6.06626 21.5981 7.20166 22.1177 8.45201C22.6372 9.70235 22.9025 11.0428 22.8982 12.3959C22.8961 18.0729 18.2551 22.6927 12.5528 22.6927V22.6927ZM21.3575 3.63337C20.2043 2.47808 18.8321 1.56206 17.3205 0.938375C15.809 0.314692 14.1881 -0.00424614 12.5518 4.26386e-05C5.69184 4.26639e-05 0.106761 5.55733 0.104668 12.3875C0.101489 14.5612 0.674454 16.6973 1.76575 18.5802L1.26855e-07 25L6.59827 23.2771C8.42354 24.2668 10.469 24.7854 12.5476 24.7854L12.5528 24.7854C19.4128 24.7854 24.9978 19.2281 24.9999 12.3969C25.005 10.7691 24.6857 9.15638 24.0605 7.65215C23.4353 6.14791 22.5165 4.78198 21.3575 3.63337"
                  fill="#C41230"
                />
              </svg>
            </div>
            <div className="flex flex-row  justify-center  max-w-xs pt-2 m-auto  md:max-w-full md:pl-0">
              <div className="text-base font-normal">
                <a href="tel:+91 970 45 66688" className="block ">
                  {" "}
                  +91 970 45 66688
                </a>
              </div>
            </div>

            <div className="flex flex-row  justify-center  max-w-xs pt-2 m-auto  md:max-w-full md:pl-0">
              <div className="text-base font-normal">
                <a href="tel:+44 7734 566688" className="block ">
                  {" "}
                  +44 773 45 66688
                </a>
              </div>
            </div>

            <div className="flex flex-row  justify-center max-w-xs pt-2 m-auto  md:max-w-full md:pl-0">
              <div className="text-base font-normal">
                <a href="tel:+44 7436 995559" className="block">
                  {" "}
                  +44 743 69 95559
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center max-w-xs pt-4 m-auto justify-center md:max-w-full md:pl-0">
              <div className="pb-3">
                <svg
                  width="30"
                  height="25"
                  viewBox="0 0 30 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 7.595V20C0 21.3261 0.526784 22.5979 1.46447 23.5355C2.40215 24.4732 3.67392 25 5 25H25C26.3261 25 27.5979 24.4732 28.5355 23.5355C29.4732 22.5979 30 21.3261 30 20V5C30 3.67392 29.4732 2.40215 28.5355 1.46447C27.5979 0.526784 26.3261 0 25 0H5C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5V7.595ZM5 2.5H25C25.663 2.5 26.2989 2.76339 26.7678 3.23223C27.2366 3.70107 27.5 4.33696 27.5 5V6.85L15 13.58L2.5 6.85V5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5ZM2.5 9.69L14.4075 16.1C14.5896 16.198 14.7932 16.2493 15 16.2493C15.2068 16.2493 15.4104 16.198 15.5925 16.1L27.5 9.69V20C27.5 20.663 27.2366 21.2989 26.7678 21.7678C26.2989 22.2366 25.663 22.5 25 22.5H5C4.33696 22.5 3.70107 22.2366 3.23223 21.7678C2.76339 21.2989 2.5 20.663 2.5 20V9.69Z"
                    fill="#C12032"
                  />
                </svg>
              </div>
              <div className="text-base font-normal">
                <a href="mailto:support@applyuninow.com">
                  support@applyuninow.com
                </a>
              </div>
            </div>

            <div className="flex  flex-col md:flex-row justify-center text-lightRed space-y-4 md:space-y-0  py-4  space-x-0 md:space-x-6">
              <div className="text-base text-center  font-audiowide pages">
                <Link to="/about-us">
                  <a className="block link underline md:no-underline	 ">
                    About Us
                  </a>
                </Link>
              </div>
              <div className="text-base text-center font-audiowide pages">
                <Link to="/additional-services">
                  <a className="block link underline md:no-underline	">
                    Add-ON&apos;s
                  </a>
                </Link>
              </div>
              <div className="text-base text-center font-audiowide pages">
                <Link to="/terms-conditions">
                  <a className="block link underline md:no-underline	">
                    T&C-Privacy
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex   justify-center  py-2  space-x-6 md:space-x-12">
              <a href="https://www.instagram.com/applyuninow/" target="_blank">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="24" height="24" rx="7" fill="white" />
                  <path
                    d="M12 2.16216C15.2041 2.16216 15.5837 2.17439 16.8491 2.23209C18.1566 2.29177 19.5042 2.59017 20.457 3.54286C21.4188 4.50464 21.708 5.83908 21.7679 7.15092C21.8256 8.41631 21.8378 8.79581 21.8378 12C21.8378 15.2041 21.8256 15.5836 21.7679 16.849C21.7085 18.1499 21.4042 19.5098 20.4571 20.4569C19.4948 21.4192 18.162 21.7079 16.849 21.7679C15.5838 21.8256 15.2043 21.8378 12 21.8378C8.79558 21.8378 8.41613 21.8256 7.15088 21.7679C5.86008 21.7089 4.48233 21.3964 3.543 20.4571C2.58628 19.5004 2.29158 18.1535 2.23205 16.849C2.1743 15.5836 2.16211 15.2041 2.16211 12C2.16211 8.79581 2.17434 8.41627 2.23205 7.15088C2.2912 5.85469 2.59941 4.48645 3.54281 3.543C4.50277 2.583 5.84156 2.29181 7.15088 2.23205C8.41631 2.17439 8.79586 2.16216 12 2.16216ZM12 0C8.74102 0 8.33236 0.0137812 7.05239 0.0721875C5.1967 0.156891 3.35541 0.672797 2.01408 2.01403C0.667734 3.36037 0.156797 5.19811 0.0721875 7.05244C0.0137812 8.33236 0 8.74097 0 12C0 15.259 0.0137812 15.6676 0.0721875 16.9476C0.15675 18.8003 0.675469 20.6473 2.01403 21.9859C3.35873 23.3306 5.20022 23.8433 7.05239 23.9278C8.33236 23.9862 8.74102 24 12 24C15.259 24 15.6676 23.9862 16.9476 23.9278C18.8013 23.8432 20.6461 23.3257 21.9859 21.986C23.3328 20.6392 23.8432 18.8023 23.9278 16.9476C23.9862 15.6676 24 15.259 24 12C24 8.74102 23.9862 8.33236 23.9278 7.05239C23.8432 5.19773 23.3263 3.35447 21.986 2.01412C20.6432 0.671297 18.7965 0.156562 16.9476 0.0721875C15.6676 0.0137812 15.259 0 12 0Z"
                    fill="url(#paint0_linear_2858_1505)"
                  />
                  <path
                    d="M12.002 5.83765C8.59877 5.83765 5.83984 8.59652 5.83984 11.9998C5.83984 15.4031 8.59877 18.162 12.002 18.162C15.4053 18.162 18.1642 15.4031 18.1642 11.9998C18.1642 8.59657 15.4053 5.83765 12.002 5.83765ZM12.002 15.9998C9.79291 15.9998 8.00205 14.209 8.00205 11.9998C8.00205 9.79071 9.79291 7.99985 12.002 7.99985C14.2112 7.99985 16.002 9.79071 16.002 11.9998C16.002 14.209 14.2112 15.9998 12.002 15.9998Z"
                    fill="url(#paint1_linear_2858_1505)"
                  />
                  <path
                    d="M18.4048 7.03454C19.2001 7.03454 19.8448 6.38983 19.8448 5.59454C19.8448 4.79925 19.2001 4.15454 18.4048 4.15454C17.6096 4.15454 16.9648 4.79925 16.9648 5.59454C16.9648 6.38983 17.6096 7.03454 18.4048 7.03454Z"
                    fill="url(#paint2_linear_2858_1505)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2858_1505"
                      x1="-10.437"
                      y1="-3.37826"
                      x2="11.9144"
                      y2="53.5348"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_2858_1505"
                      x1="0.480257"
                      y1="4.10286"
                      x2="11.958"
                      y2="33.3285"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_2858_1505"
                      x1="15.7124"
                      y1="3.74915"
                      x2="18.3946"
                      y2="10.5787"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>

              <Link to="/about-us">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.1463 12.0731C24.1463 18.0984 19.7254 23.0936 13.9546 24V15.5858H16.7603L17.2941 12.1051H13.9546V9.84647C13.9546 8.89399 14.4212 7.96598 15.9169 7.96598H17.4352V5.00272C17.4352 5.00272 16.0571 4.76755 14.7396 4.76755C11.9894 4.76755 10.1917 6.43449 10.1917 9.45231V12.1051H7.13439V15.5858H10.1917V24C4.42183 23.0927 0 18.098 0 12.0731C0 5.40535 5.40535 0 12.0731 0C18.7409 0 24.1463 5.40535 24.1463 12.0731Z"
                    fill="url(#paint0_linear_2858_1511)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2858_1511"
                      x1="-10.5007"
                      y1="-3.37826"
                      x2="11.7513"
                      y2="53.6268"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>

              <Link to="/about-us">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5956 20.4496H17.0396V14.8805C17.0396 13.5525 17.0159 11.8429 15.1901 11.8429C13.338 11.8429 13.0546 13.2899 13.0546 14.7838V20.4492H9.4986V8.99689H12.9124V10.562H12.9602C13.6563 9.37177 14.9506 8.66088 16.3285 8.71199C19.9327 8.71199 20.5972 11.0828 20.5972 14.167L20.5956 20.4496ZM5.48611 7.43143C4.3464 7.43165 3.42233 6.50783 3.42211 5.36813C3.42189 4.22837 4.34568 3.30427 5.48534 3.30405C6.62505 3.30383 7.54912 4.22765 7.54934 5.36735C7.54956 6.50711 6.62583 7.43126 5.48611 7.43143ZM7.26412 20.4497H3.70439V8.99689H7.26412V20.4497ZM22.3685 0.00165212H1.91745C0.950921 -0.00926921 0.158292 0.764981 0.146484 1.73155V22.2681C0.157849 23.2351 0.950422 24.0102 1.91745 23.9999H22.3685C23.3374 24.012 24.1331 23.237 24.1465 22.2681V1.7301C24.1327 0.761599 23.3369 -0.0125955 22.3685 0.000155266"
                    fill="url(#paint0_linear_2858_1513)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2858_1513"
                      x1="-10.2906"
                      y1="-3.37826"
                      x2="12.0609"
                      y2="53.5348"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>

              <Link to="/about-us">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.6899 5.9744C21.7043 6.23435 21.7043 6.49545 21.7043 6.7577C21.7043 14.7656 16.7507 24 7.69403 24V23.9953C5.0184 23.9997 2.39832 23.0563 0.146484 21.278C0.535501 21.3352 0.926861 21.3644 1.31864 21.3654C3.5363 21.3682 5.69021 20.4527 7.43387 18.7662C5.32721 18.7175 3.4786 17.0264 2.83355 14.5578C3.57141 14.7327 4.33201 14.6971 5.05693 14.4538C2.7594 13.8827 1.10714 11.3981 1.10653 8.51346C1.10653 8.48744 1.10653 8.46148 1.10653 8.43667C1.79128 8.90643 2.55779 9.16661 3.34144 9.19516C1.1775 7.41679 0.509954 3.87453 1.81688 1.10559C4.3172 4.89141 8.00594 7.19279 11.9651 7.4371C11.5682 5.33261 12.1107 3.12712 13.3895 1.64705C15.3725 -0.647978 18.4916 -0.53012 20.3564 1.91023C21.4591 1.64261 22.5165 1.14516 23.4831 0.439282C23.1156 1.84256 22.3462 3.03378 21.3183 3.79111C22.2945 3.64914 23.2478 3.32776 24.1465 2.83769C23.4855 4.0544 22.6536 5.11657 21.6899 5.9744Z"
                    fill="url(#paint0_linear_2858_1515)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2858_1515"
                      x1="-10.2906"
                      y1="-3.37826"
                      x2="12.0609"
                      y2="53.5348"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.191097" stop-color="#1E417C" />
                      <stop offset="1" stop-color="white" />
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:h-60 sm:block ">
        <div className="relative max-w-6xl m-auto">
          <div className="absolute hidden w-28 h-28 bg-darkred lg:right-12 xl:-right-12 right-12 md:block top-28"></div>
        </div>
      </div>
    </div>
  );
};
