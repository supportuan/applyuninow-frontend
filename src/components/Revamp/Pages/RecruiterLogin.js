
import React, { useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import axios from "axios";
//import { Link } from "react-router-dom";
import Link from "next/link";
import { toast } from "react-toastify";
import Validator from "validatorjs";
import { environment } from "../../../environments/environment";
import TopStrip from "../Common/TopStrip";

const intialValues = {
  email: "",
  password: ""
};

const RecruiterLogin = () => {
  
  //let navigate = useNavigate();
  const router = useRouter();
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  const topString = 'Recuiter Login';

  function handleChange(e) {
    setMessage("");
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setFormErrors({});
  }
  
  const navigate = (url) => {
   router.push(url)
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
        type: 'admin_users'
      })
      .then((response) => {
        setLoading(false);
        let user = response.data.data;

        if (user.first_time) {
          navigate("/update-password");
          localStorage.setItem("updated_token", user.token.token);
          toast.info("Please Update new password!")
          if (user.show_policy_model) localStorage.setItem("show_policy_model", 'true');
          return
        }

        localStorage.setItem("applyNow", JSON.stringify(user));
        localStorage.setItem("token", user.token.token);

        if (user.role_slug === "admin") {
          navigate("/leads/explore");
        } else if (user.role_slug === "student") {
          navigate("/applicant/profile/view/");
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
    <div className="country-detail-section">
      <TopStrip topInfoText={topString} />
      <div className="container small-width">
          <div className="module-head">
              {/* <h2 className="module-title">ApplyUniNow Admin Panel</h2> */}
              <h2 className="module-title"></h2>
              <p className="module-subtitle">Please sign in to your Recuiter Access</p>
          </div>
          <form name="form" className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={handleChange}
                className={
                  "form-control " +
                  (submitted && formErrors.email ? " input-error" : "")
                }
              />
              <label>Email Address</label>
              {submitted &&  (
                <small>{formErrors.email}</small>
              )}
                  

            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={handleChange}
                className={
                  "form-control " +
                  (submitted && formErrors.password ? " input-error" : "")
                }
              />
              <label>Password</label>
              {submitted &&  (
                <small>{formErrors.password}</small>
              )}
            </div>
            <p className="text-slider">{message}</p>
            <div className="btn-group-control">
              {!loading ? (
                <button
                  type="submit"
                  className="btn"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn"
                  onClick={handleSubmit}
                >
                  Loading...
                </button>
              )}
              <Link className="" href="/forget-password">
                  Forget Password?
                </Link>
            </div>
          </form>
          <div className="module-head">
              <h2 className="module-title"></h2>
              <p className="module-subtitle footer-text">ApplyUniNow will utilize your data for the purpose of concentration of consents of usage. Rest assured that your data is secure with us, and we will never disclose your details to third parties for marketing purposes without your explicit consent. For further information, please refer to our privacy and cookies policies.</p>
          </div>
        </div>
    </div>
  );
};

export default RecruiterLogin;
