import React, { useState, useEffect } from 'react';
import { usePageContext } from '../context/PageContext';
import SuccessModal from './SuccessModal';
import api from "../../../api/index";
import { useAppContext } from "../../../context/Appcontext";


const EnquiryModal = ({ isOpen, onClose }) => {

  const { pageLabelName, prerequisiteData } = usePageContext();
  const { BASE_URL } = useAppContext();
  const initialForm = {
    fullName: '',
    email: '',
    contact: '',
    country: '',
  }
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    study_destination: [],
    study_level: [],
    study_industry: [],
    study_intake: [],
    intake_month: [],
    intake_year: [],
    study_area: [],
  });

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? '' : 'Full Name is required';
    tempErrors.email =
      formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ''
        : 'Valid Email is required';
    tempErrors.contact =
      formData.contact && formData.contact.length === 10
        ? ''
        : 'Contact must be 10 digits';
    tempErrors.country = formData.country ? '' : 'Country is required';

    setErrors({ ...tempErrors });
    return tempErrors;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;
    if (value !== '') {
      e.target.classList.add('valid');
      e.target.classList.remove('input-error');
      delete errors[name];
    } else {
      e.target.classList.remove('valid');
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setFormData(initialForm);
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = await validate();

    let errorState = true;
    let objectCount = 0;
    Object.entries(newErrors).forEach(([key, value]) => {
      objectCount = objectCount + 1;
      if (value !== '' && errorState) {
        errorState = false;
      } else if (!errorState) {
        setErrors(newErrors);
        return false;
      } else if (objectCount === Object.keys(newErrors).length) {
        formData.pageLabelName = pageLabelName;
        contectUsSave(formData)
      }
    })
  };

  const contectUsSave = (formData) => {
    let obj = { email: formData.email, phone: formData.contact, name: formData.fullName, country_id: formData.country, sourceType: formData.pageLabelName }
    api
      .post(`${BASE_URL}/contact-us`, obj)
      .then((res) => {
        setFormData(initialForm);
        console.log("submitted:");
        onClose();
        setShowModal(true);
      })
      .catch((err) => {
        console.log("submitted:", err);
      });
  };



  //if (!isOpen) return null;

  return (
    <>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className='hide'>Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              {['fullName', 'email', 'contact'].map((field) => (
                <div key={field} className="form-group">

                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={errors[field] ? 'input-error' : '' + 'input_txt_box'}
                  />
                  <label>{field.replace(/([A-Z])/g, ' $1')}</label>
                  {errors[field] && <small>{errors[field]}</small>}
                </div>
              ))}
              
              <div key="country" className="form-group">
                  <select
                    name="country"
                    value={formData["country"]}
                    onChange={handleChange}
                    className={errors["country"] ? 'input-error' : '' + 'input_txt_box'}
                  >
                  <option key="" value=""> </option>
                  {prerequisiteData?.data?.study_destination?.map((destination, index) => (
                    <option key={destination?.id} value={destination?.id}>{destination?.name}</option>
                  ))}
                  </select>
                  <label className=''>country</label>
                  {errors["country"] && <small>{errors["country"]}</small>}
              </div>
              <div className='content_msg'>
                I agree to receive Communications from ApplyUniNow. Any data collected with be processed in accordance with our <a href='/terms-conditions'>Terms! & Conditions</a> + <a href='/terms-conditions'>Privacy Policy</a>
              </div>
              <div className="button-group">
                <button type="button" onClick={handleClose} className="cancel-button">
                  X
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        showModal && <SuccessModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default EnquiryModal;
