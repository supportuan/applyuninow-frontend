import React, { useState } from 'react'
import TopStrip from './TopStrip';
import { lastSteps } from '../utils/helpers';
import globeIcon from '../../../Images/rev/globe.svg';
import Image from 'next/image';
import Link from 'next/link';
import api from '../../../api';
import { useAppContext } from '../../../context/Appcontext';


const LastSteps = () => {
    const topString = '3,43,000+ graduate courses to choose from 22 study destinations';
    const { BASE_URL } = useAppContext();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contact: '',
        country: '',
      });
      const [errors, setErrors] = useState({});
      const [active, setActive] = useState('Key Information');

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
    
        setErrors({...tempErrors});
        return tempErrors;
      };
    
      const handleChange = (e) => {
    
        const { name, value } = e.target;
        if(value !== ''){
          e.target.classList.add('valid');
          e.target.classList.remove('input-error');
          delete errors[name];
        }
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = await validate();
    
        let errorState = true;
        let objectCount = 0;
        Object.entries(newErrors).forEach(([key, value]) => {
          objectCount = objectCount + 1;
          if(value !== '' && errorState){
            errorState = false;
          } else if(!errorState){
            setErrors(newErrors);
            return false;
          } else if(objectCount === Object.keys(newErrors).length){
            formData.pageLabelName = pageLabelName;
            contectUsSave(formData)
            //console.log("Form submitted:", formData);
            //onClose();
            //setShowModal(true);
          }
        })
      };
      
      const contectUsSave = (formData) => {
            let obj = {email:formData.email, phone:formData.contact, name:formData.fullName, country_id:formData.country, sourceType:formData.pageLabelName}
        api
          .post(`${BASE_URL}/contact-us`, obj)
          .then((res) => {
                  console.log("submitted:");
                  onClose();
                  setShowModal(true);
          })
          .catch((err) => {
                      console.log("submitted:",err);
          });
      };
    return (
        <div className='graduate-courses-section laststeps'>
            <TopStrip topInfoText={topString} />
            <div className='container small-width'>
                <h2 className='page-heading'>Create a free account to unlock full content!</h2>
                <div className='laststeps__inner'>
                    <div className='info'>
                        <ul>
                            {lastSteps.map((item) =>
                                <li key={item?.id}
                                className={active === item?.label ? 'active' : ''}
                                onClick={() => setActive(item?.label)}
                                >{item?.label}</li>
                            )}
                        </ul>
                    </div>
                    <div className='globe'>
                        <Image src={globeIcon} width={300} height={310} alt='Globe' />
                    </div>
                    <div className='enquiry'>
                        <a href='/explore'><span>Explore</span></a>
                        <form onSubmit={handleSubmit}>
                            {['fullName', 'email', 'contact', 'country'].map((field) => (
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
                            <div className="button-group">
                                <button type="submit" className="submit-button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastSteps;
