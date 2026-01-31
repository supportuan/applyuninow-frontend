import React from 'react'
import { useState, useContext, useMemo, useEffect } from "react";
import StarRatings from 'react-star-ratings';
import CustomButton from "../../../common/CustomButton";
import api from "../../../api/index";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/Appcontext";

const Feedback = () => {
    const { BASE_URL } = useContext(AppContext);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isGivenFed, setIsGivenFed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusCheck, setStatusCheck] = useState(true);


    const changeRating = (value) => {
        setRating(value)
    }
    const getFeedback = (e) => {
        setFeedback(e.target.value)
    }

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = () => {
        api
            .get(`${BASE_URL}/admin/feedbacks/check-feedback-status`)
            .then((res) => {
                const { status } = res.data
                setIsGivenFed(status === 'disabled' ? true : false)
                setStatusCheck(false)
            })
            .catch((err) => {
                setStatusCheck(false)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const postdata = {
            rating: rating,
            feedback: feedback
        }
        if(!postdata.rating || !postdata.feedback){
            toast.error('Please give rating and review')
        }

        sendFeedback(postdata);
        return true;
    };

    const sendFeedback = (payload) => {
        setLoading(true);
        api
            .post(`${BASE_URL}/admin/feedbacks/update-feedback`, payload)
            .then((res) => {
                console.log(res, 'ssss')
                setLoading(false);
                setIsGivenFed(true)
            })
            .catch((error) => {
                setLoading(false);
                const { errors } = error.response.data;
                const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
                toast.error(erroMsg);
            });
    };

    return (
        <>
            <div className="p-2 md:p-6">
            <p className="text-xl font-audiowide gradient-text mt-1 lg:mt-0">
        <span className="text-xl md:text-2xl font-audiowide gradient-text">
          {" "}
          Rate your experience…
        </span>
      </p>
            
            <p className="text-xs pb-2 text-primary">ApplyUniNow believes in providing the highest quality of upskilling services and to achieve our mission, We continuously innovate, educate and listen to feedbacks to help us improve, learn and serve you better.</p>

        

                {
                    statusCheck &&
                    <div className='bg-light p-4 rounded-lg text-center'>
                        <p className='mb-5 text-lg'>Loading...</p>
                    </div>
                }

                {
                    !statusCheck && !isGivenFed &&
                    <div className='bg-light p-4 rounded-lg mt-4 md:mt-4'>
                       
                        <StarRatings
                            rating={rating}
                            starRatedColor="yellow"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                            starHoverColor='yellow'
                            starEmptyColor='#151929'
                            starDimension='40px'
                        />
                       
                        <textarea
                            value={feedback}
                            onChange={getFeedback}
                            className="h-[200px] md:h-[150px] lg:h-[110px] w-full bg-[#151929] p-4 rounded-lg mt-2"
                            placeholder="Feedback…"
                            type="text"
                        ></textarea>
                        <div className='mt-4 flex justify-end'>
                            {
                                loading ?
                                    <CustomButton
                                        variant="contained"
                                        size="medium"
                                        borderRadius="8px"
                                        width="w-fit"
                                    >
                                        <p className="">Loading..</p>
                                    </CustomButton> :
                                    <CustomButton
                                        variant="contained"
                                        size="medium"
                                        borderRadius="8px"
                                        width="w-fit"
                                        onClick={handleSubmit}
                                    >
                                        <p className="">Submit</p>
                                    </CustomButton>
                            }

                        </div>
                    </div>
                }

            </div>

            {
                !statusCheck && isGivenFed &&
                <div className="p-2 lg:p-6">
                    <div className='bg-light p-4 rounded-lg'>
                        <div className='flex justify-center items-center flex-col py-10'>
                            <p className='mb-5 text-lg text-center max-w-xs'>Thank you for your valuable feedback.</p>

                            <CustomButton
                                variant="contained"
                                size="medium"
                                borderRadius="8px"
                                width="w-fit"
                                onClick={() => setIsGivenFed(false)}
                            >
                                <p className="">Give Feedback Again</p>
                            </CustomButton>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Feedback