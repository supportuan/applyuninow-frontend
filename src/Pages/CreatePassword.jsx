import login_star from "../Images/login_star.svg";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const CreatePassword = () => {
  const [newPassword, setnewPassword] = useState();
  const [confrimPassword, setConfirmPassword] = useState();

  const { BASE_URL } = useContext(AppContext);
  const navigate = useNavigate();

  const queryparameters = window.location.search;
  console.log(queryparameters);
  const urlParams = new URLSearchParams(queryparameters);

  const email = urlParams.get("email");
  const token = urlParams.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      email: email,
      password: confrimPassword,
      token: token,
    };
    axios
      .post(`${BASE_URL}/reset-password`, postData)
      .then((res) => {
        toast.success('Password Updated Successfully!')
        navigate("/login");
      })
      .catch((error) => {
        toast.error('Unable to update password!.')
      });
  };
  return (
    <div className="flex items-center justify-end h-screen bg-cover bg-login">
      <div className="w-full max-w-2xl pl-20 pr-20  lg:pr-24 lg:w-1/2 md:w-11/12 md:pr-1/12 md:pl-1/12 ">
        <img src={login_star} alt="logo" className="m-auto w-36 md:w-52" />
        <h2 className="text-xl font-bold text-center lg:text-left md:text-4xl">
          <span className="text-white audio">Create New</span>
          <span className="text-slider audio"> Password</span>
        </h2>
        <p className="pt-1 text-sm text-center lg:text-left text-white">
          New Password must be different from previous used passwords.
        </p>

        <form name="form" className="mt-6">
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
              placeholder="New Password"
              className="form-control text-center lg:text-left"
              onChange={(e) => {
                setnewPassword(e.target.value);
              }}
            />
            {/* <div className="invalid-feedback">Email is required</div> */}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmpassword"
              required
              placeholder="Confirm New Password"
              className="form-control text-center lg:text-left"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {/* <div className="invalid-feedback">Password is required</div> */}
          </div>
          {/* <p className="text-slider">{message}</p> */}
          <div className="mt-12 mb-3 text-center">
            <button
              type="submit"
              className="h-12 text-white rounded-md w-36 theme-btn"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
