import login_star from "../Images/login_star.svg";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { TermsAndCondition } from "../components/TermsaAndCondition/TermsAndCondition";
import axios from "axios";
import Validator from "validatorjs";


const UpdatePassword = () => {
 
  const intialValues = {
    password: "",
    password_confirmation: ""
  };

  const [showtac, setshowtac] = useState(false);

  const { BASE_URL } = useContext(AppContext);
  const token = localStorage.getItem("updated_token");


  const navigate = useNavigate();
  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
 
  useEffect(()=>{
    const token = localStorage.getItem("updated_token");
    const termstoken = localStorage.getItem("terms_token");
    if(!token && !termstoken){
      navigate('/')
    }
  
     
    if(!token && termstoken){
      setshowtac(true)
    }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      password: 'required|confirmed|min:8|max:14',
      password_confirmation: 'required'
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

    updatePassword();
    return true;
  };

  const updatePassword= ()=>{
    setLoading(true);
    axios
    .post(
      `${BASE_URL}/update-password`,
      { password: params.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setLoading(false);
      let user = response.data.data;
      if(user.role_slug !== "student") {
        localStorage.setItem("applyNow", JSON.stringify(user));
        localStorage.setItem("token", user.token.token);
        navigate('/students')
      } else {
        setshowtac(true);
        localStorage.removeItem('updated_token')
        localStorage.setItem('loginId',user.id)
        localStorage.setItem("terms_token",user.token.token);
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
      <div>
        {showtac ? (
          <div>
            <TermsAndCondition />
            <div className="custom-upload-model">
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {
        !showtac ? 
          <div className="relative mx-10 lg:mr-32">
          <img src={login_star} alt="logo" className="m-auto w-36 md:w-52" />
          <h2 className="text-xl font-bold text-center lg:text-left md:text-4xl">
            <span className="text-white audio">Create New </span>
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
                value={params.password}
                onChange={handleChange}
                placeholder="New Password"
                className="form-control  text-center lg:text-left"
              />
                  <p className="text-slider text-sm">{formErrors.password}</p>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password_confirmation"
                required
                placeholder="Confirm New Password"
                className="form-control text-center lg:text-left"
                value={params.password_confirmation}
                onChange={handleChange}
              />
                  <p className="text-slider text-sm">{formErrors.password_confirmation}</p>
            </div>
  
            <p className="text-slider">{message}</p>
  
            <div className="mt-12 mb-3 text-center">
              { loading ? <button
                type="submit"
                className="h-12 text-white rounded-md w-36 theme-btn"
                 disabled
              >
                Loading..
              </button> : <button
                type="submit"
                className="h-12 text-white rounded-md w-36 theme-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>}
              
            </div>
          </form>
        </div> : ''
      }
      
    </div>
  );
};

export default UpdatePassword;
