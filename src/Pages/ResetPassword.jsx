import login_star from "../Images/login_star.svg";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Validator from "validatorjs";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  let navigate = useNavigate();

  const { token, BASE_URL } = useContext(AppContext);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: ''
  });

  const handleInput = (e) => {
    setMessage('');
    setEmail(e.target.value);
    setFormErrors({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator({email}, {
      email: 'required|max:150|email',
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
      .post(
        `${BASE_URL}/forgot-password`,
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.data.message);
        setLoading(false);
        setTimeout(() => {
        navigate('/')
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        setMessage(erroMsg);
      });
  };

  return (
    <div className="flex items-center justify-end h-screen bg-cover bg-login">
      <div className="w-full max-w-2xl pl-20 pr-20  lg:pr-24 lg:w-1/2 md:w-11/12 md:pr-1/12 md:pl-1/12 ">
        <img src={login_star} alt="logo" className="m-auto w-36 md:w-52" />
        <h2 className="text-xl font-bold text-center lg:text-left md:text-4xl">
          <span className="text-white audio">Reset Your</span>
          <span className="text-slider audio"> Password</span>
        </h2>
        <p className="pt-1 text-sm text-center lg:text-left text-white">
          Enter your Valid Email Address and We will share a link to create New
          password.
        </p>

        <form name="form" className="mt-6">
          <div className="form-group">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className={
                "form-control text-center lg:text-left" +
                (formErrors.email ? " is-invalid" : "")
              }
              onChange={(e) => {
                handleInput(e)
              }}
            />
          </div>
          <p className="text-slider text-sm">{formErrors.email}</p>
          <p className="text-slider">{message}</p>

          <div className="mt-12 mb-3 text-center">
            {
              loading ? <button disabled
                className="h-12 text-white rounded-md w-36 theme-btn"
              >
                Loading...
              </button> :
                <button
                  className="h-12 text-white rounded-md w-36 theme-btn"
                  onClick={handleSubmit}
                >
                  Send
                </button>
            }

          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
