import login_star from "../Images/login_star.svg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { environment } from "../environments/environment";
import { toast } from "react-toastify";
import Validator from "validatorjs";
const intialValues = {
  email: "",
  password: ""
};

 const StudentLogin = () => {

  let navigate = useNavigate();
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;

  function handleChange(e) {
    setMessage("");
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setFormErrors({});
  }

  function handleSubmit(e) {

    e.preventDefault();
    setSubmitted(true);
    let validation = new Validator(inputs, {
      email: 'required|max:150|email',
      password: 'required|min:8|max:15',
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

    setLoading(true);
      axios
        .post(`${environment.API_BASE_URL}/login`, {
          email: email,
          password: password,
          type:'student'
        })
        .then((response) => {
          setLoading(false);
          let user = response.data.data;

          if (user.first_time) {
            navigate("/update-password");
            localStorage.setItem("updated_token", user.token.token);
            toast.info("Please Update new password!")
            if(user.show_policy_model) localStorage.setItem("show_policy_model", 'true');
            return
          }
          localStorage.setItem("applyNow", JSON.stringify(user));
          localStorage.setItem("token", user.token.token);

          if (user.role_slug === "admin") {
            navigate("/leads/explore");
          } else if (user.role_slug === "student") {
            navigate("/applicant/profile/view");
          } else {
            navigate("/leads/explore")
          }
        })
        .catch((error) => {
          setLoading(false);
          const { errors } = error.response.data;
          const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
          setMessage(erroMsg);
        });
  }

  return (
    <div className="flex items-center justify-center lg:justify-end h-screen bg-cover bg-login">
      <div className="relative lg:mr-32 ">
        <img src={login_star} alt="logo" className="m-auto w-36 md:w-52" />
        <h2 className="text-xl font-bold text-center md:text-4xl lg:text-left">
          <span className="text-white audio">Apply Uni now</span>
          <span className="text-slider audio"> Student Login</span>
        </h2>
        <p className="pt-1 text-sm text-center text-white lg:text-left">
          Please login to your Student Panel.
        </p>

        <form name="form" className="mt-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className={
                "form-control text-center lg:text-left" +
                (submitted && formErrors.email ? " is-invalid" : "")
              }
            />
           {submitted &&  (
              <p className="text-slider text-sm">{formErrors.email}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className={
                "form-control text-center lg:text-left" +
                (submitted && formErrors.password ? " is-invalid" : "")
              }
            />
            {submitted &&  (
              <p className="text-slider text-sm">{formErrors.password}</p>
            )}
          </div>
          <p className="text-slider">{message}</p>
          <div className="mt-12 mb-3 text-center">
            {!loading ? (
              <button
                type="submit"
                className="h-12 text-white rounded-md w-36 theme-btn"
                onClick={handleSubmit}
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                className="h-12 text-white rounded-md w-36 theme-btn"
                onClick={handleSubmit}
              >
                Loading...
              </button>
            )}
          </div>
          <div className="flex justify-center">
            <div className="text-sm text-white opacity-90">
              <u>
                <Link to="/forget-password">Forget Password ?</Link>
              </u>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
