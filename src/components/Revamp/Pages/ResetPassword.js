
import React, { useState, useContext } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Validator from "validatorjs";
import { AppContext } from "../../../context/Appcontext";
import TopStrip from "../Common/TopStrip";

const ResetPassword = () => {
  const [email, setEmail] = useState();
  //let navigate = useNavigate();
  const router = useRouter();

  const { token, BASE_URL } = useContext(AppContext);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: ''
  });
  const topString = 'Reset Password';

  const navigate = (url) => {
   router.push(url)
  }
  
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
    <div className='country-detail-section'>
        <TopStrip topInfoText={topString} />
        <div className="container small-width">
          <div className="module-head">
              <h2 className="module-title">Reset Your Password</h2>
              <p className="module-subtitle">Enter your Valid Email Address and We will share a link to create New
              password.</p>
          </div>

          <form name="form" className="login-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                required
                className={
                  "form-control " +
                  (formErrors.email ? " input-error" : "")
                }
                onChange={(e) => {
                  handleInput(e)
                }}
              />
              <label>Email Address</label>
              <small>{formErrors.email}</small>
              <small className="text-slider">{message}</small>
            </div>
            

            <div className="mt-12 mb-3">
              {
                loading ? <button disabled
                  className="btn"
                >
                  Loading...
                </button> :
                  <button
                    className="btn"
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
