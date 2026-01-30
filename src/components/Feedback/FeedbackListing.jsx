import React from "react";
import { useState, useEffect } from "react";
import BasicTable from "./Table";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { initialValues } from "./helpers";
import { cols } from "./helpers";
import api from "../../api";
import { environment } from "../../environments/environment";
import { country } from "../../country";
import Pagination from "../Shared/Pagination/Pagination";
import { useMemo } from "react";
import Accordion from "./Accordion";
import { toast } from "react-toastify";
import CustomButton from "../../common/CustomButton";
import Card from "../../common/Card";
import { DateRangePicker } from "../../common/DateRangePicker";
import Refresh from "../../assets/leads/Refresh.svg";
import { CountItems } from "../../common/utils/helpers";
import { loginUser } from "../../utils";

const FeedbackListing = () => {
  const [inputs, setInputs] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const reset = () => {
    setCurrentPage(1);
    setInputs(initialValues);
    fetchfeedback(initialValues);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    const sDate = new Date(start);
    const eDate = end ? new Date(end) : null;
    setInputs({ ...inputs, created_from: sDate, created_to: eDate });
  };

  const fetchfeedback = (inputs, page) => {
    setFeedback([]);
    setLoading(true);
    api
      .get(
        `${environment.API_BASE_URL}/admin/feedbacks?page=${page}&created_from=${inputs.created_from}&created_to=${inputs.created_to}`
      )
      .then((res) => {
        let response = res?.data?.data;

        response.map((item) => {
          item["isChecked"] = false;
        });

        setFeedback(response);

        console.log(res.data?.meta?.total);
        setTotal(res.data?.meta?.total);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useMemo(() => {
    fetchfeedback(inputs, currentPage);
  }, [currentPage]);

  function filterSearch() {
    setCurrentPage(1);
    fetchfeedback(inputs, 1);
  }

  const handleTruncateFeedback = (index) => {
    let feedbackList = [...feedback];

    feedbackList[index]["isChecked"] = !feedbackList[index]["isChecked"];
    setFeedback(feedbackList);
  };

  return (
    <div className="p-2 lg:p-4 mb-10">
      <div className="flex justify-between items-center">
        <h1 className=" audio text-white relative text-[16px] lg:text-2xl">
          Feedback
        </h1>
      </div>

      <hr className="mt-1" />

      {/* Stats Medium and Large Screens */}

      <></>

      <div className="hidden lg:flex gap-2 mt-2">
        <Card count={total} label="Total Feedbacks" color="text-[#99D592]" />
      </div>

      {/* Carousel for mobile view */}

      <div className="lg:hidden mt-2 w-full flex gap-3 justify-center  items-center">
        <div className="w-[80%] flex justify-center bg-[#262938] rounded-lg">
          <Card count={total} label="Total Feedbacks" color="text-[#99D592]" />
        </div>
      </div>

      {/* for mobile */}

      <hr className="mt-4 md:hidden block" />

      {/*for Desktop */}

      <div className="mt-4"></div>

      <>
        <div className="flex felx-row gap-6 items-center">
          <DateRangePicker
            startDate={inputs.created_from}
            endDate={inputs.created_to}
            onChange={onChange}
            id="2"
          />

          <div className="flex flex-col md:flex-row gap-2">
              <CustomButton
                onClick={filterSearch}
                variant="contained"
                size="large"
                borderRadius="8px"
                width="w-fit"
                disabled={CountItems(inputs) != 2}
              >
                <p className="">Apply</p>
              </CustomButton>
              <CustomButton
                onClick={() => {
                  reset();
                }}
                variant="outlined"
                size="large"
                borderRadius="8px"
                width="w-fit"
                bgcolor="#151929"
              >
                <img src={Refresh} alt="" />
              </CustomButton>
          </div>
        </div>

      </>

      <hr className=" mt-2 mb-2" />

      {loading ? (
        ""
      ) : (
        <p className="text-[10px] lg:text-[12px] mb-2 audio  ml-2">
          Showing{" "}
          <span className="font-[800]">
            {currentPage === Math.ceil(total / 10) ? (
              <>{total}</>
            ) : (
              <>{feedback.length + (currentPage - 1) * 10}</>
            )}
          </span>{" "}
          out of <span className="font-[800]">{total}</span> results
        </p>
      )}

      {loading ? (
        <div className="w-full">
          <p className="text-center audio text-3xl">Loading....</p>
        </div>
      ) : (
        <div className="hidden lg:block">
          {feedback && feedback.length ? (
            <BasicTable
              cols={cols}
              data={feedback}
              handleTruncateFeedback={handleTruncateFeedback}
            />
          ) : (
            <p className="text-center audio text-3xl">No data Found!!!</p>
          )}
        </div>
      )}

      <div className="block lg:hidden ">
        <Accordion data={feedback} loading={loading} />
      </div>

      {feedback.length > 0 ? (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FeedbackListing;
