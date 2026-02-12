import React, { useState, useEffect } from 'react';
import { usePageContext } from '../context/PageContext';
import SuccessModal from './SuccessModal';
import api from "../../../api/index";
import { useAppContext } from "../../../context/Appcontext";
import useRazorpay from '../Hooks/useRazorpay';
import { HighlightOff, Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';


const EnquiryModal = ({ isOpen, onClose, planTitle, planPrice }) => {

  const { pageLabelName, prerequisiteData } = usePageContext();
  const { BASE_URL } = useAppContext();
  const { loading: paymentLoading, paymentStatus, error: paymentError, initiatePayment, resetPayment } = useRazorpay();

  const initialForm = {
    fullName: '',
    email: '',
    contact: '',
  }
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    resetPayment();
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
        if (planPrice) {
          startPayment();
        } else {
          setFormData(initialForm);
          onClose();
        }
      }
    })
  };

  const startPayment = async () => {
    const metadata = {
      product_id: planTitle,
      user_email: formData.email,
      user_name: formData.fullName,
      user_phone: formData.contact,
      description: `${planTitle} - Study Abroad Package`,
    };

    const result = await initiatePayment(planPrice, metadata);
    setSubmitting(false);

    if (result === 'captured') {
      setFormData(initialForm);
      onClose();
      setShowModal(true);
    }
  };

  const handleRetry = () => {
    resetPayment();
    startPayment();
  };

  useEffect(() => {
    if (!isOpen) {
      resetPayment();
    }
  }, [isOpen]);


  //if (!isOpen) return null;

  return (
    <>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal-container">
            <AnimatePresence mode="wait">
              {(paymentLoading || paymentStatus === 'processing') && !paymentError ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="payment-status-container"
                >
                  <div className="payment-processing">
                    <div className="spinner-container">
                      <div className="premium-spinner"></div>
                      <div className="premium-spinner-inner"></div>
                    </div>
                    <h2>Processing Payment</h2>
                    <p>Please complete the payment in the Razorpay window. Do not close this page.</p>
                  </div>
                </motion.div>
              ) : paymentStatus === 'failed' || paymentError ? (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="payment-failed-card"
                >
                  <div className="payment-failed-header">
                    <div className="payment-failed-header-left">
                      <HighlightOff style={{ fontSize: 32, color: '#c22032' }} />
                      <p>Payment Failed</p>
                    </div>
                    <button type="button" onClick={handleClose} className="payment-failed-close-btn" aria-label="Close">
                      <Close style={{ fontSize: 20, color: '#999' }} />
                    </button>
                  </div>
                  <div className="payment-failed-divider" />
                  <div className="payment-failed-body">
                    <p className="payment-failed-message">We couldn’t complete your payment because it was cancelled.
                      No amount was charged. Your order is safe.
                      Please try again</p>
                    <div className="payment-failed-reason">
                      <span className="payment-failed-reason-icon">⚠</span>
                      <span><strong>Reason:</strong> {paymentError || 'Network issue'}</span>
                    </div>
                    <button type="button" onClick={handleRetry} className="payment-failed-retry-btn">
                      Retry Now
                    </button>
                  </div>
                  <div className="payment-failed-divider" />
                  <p className="payment-failed-footer">Your payment is safe.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className='hide'>Enter Your Details</h2>
                  {planTitle && (
                    <p className="plan-label">
                      Plan: <strong>{planTitle}</strong> — {planPrice}
                    </p>
                  )}
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

                    <div className='content_msg'>
                      I agree to receive Communications from ApplyUniNow. Any data collected with be processed in accordance with our <a href='/terms-conditions'>Terms! & Conditions</a> + <a href='/terms-conditions'>Privacy Policy</a>
                    </div>
                    <div className="button-group">
                      <button type="button" onClick={handleClose} className="cancel-button">
                        <Close style={{ fontSize: 20 }} />
                      </button>
                      <button type="submit" className="submit-button" disabled={submitting || paymentLoading}>
                        {submitting || paymentLoading ? 'Processing...' : (planPrice ? `Pay ${planPrice}` : 'Submit')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        showModal && <SuccessModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default EnquiryModal;
