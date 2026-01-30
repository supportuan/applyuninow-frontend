import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#262938 !important",
    borderRadius: "1rem",
    paddingY: "30px",
    "&:before": {
      backgroundColor: "transparent",
    },
  },
  details: {
    backgroundColor: "#262938",
    borderRadius: "1rem",
    paddingX: "24px",
  },

  summary: {
    backgroundColor: "#262938 !important",
    borderRadius: "8px !important",
    margin: "0px",
    padding: "10px",
  },
}));
const list = [
  {
    name: "Forex Exchange",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "Airport Pickup",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "Accommodation",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "Internship",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "Part-time Job",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "Internship",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
  {
    name: "CV / Resume Marketing",
    process: (
      <div className="text-xs lg:text-sm">
        <p className="mb-2">Please contact :</p>
        <p>Mr Sandeep Varma - Global Services Expert.</p>
        <p>IN: +91 970 45 66688</p>
        <p>UK: +44 773 45 66688</p>
        <p>sandeep@ApplyUniNow.com</p>
      </div>
    ),
  },
];

const AddOnsListing = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState();

  const handleAccordian = (pannel) => (event, newExpanded) => {
    if (expanded === pannel) {
      setExpanded(-1);
      return;
    }
    setExpanded(newExpanded ? pannel : false);
  };

  return (
    <>
      <div className="p-2 md:p-6">
        <p className="text-xl font-audiowide gradient-text mt-1 lg:mt-0">
          <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
            {" "}
            Add-ON’s…
          </span>
        </p>
        <p className="text-xs pb-2 text-primary">
          ApplyUniNow is not only assistive on admission - visa executions but
          also willing to provide end-to-end assistance on your onward soothing
          journey optionals (subjected to terms) and contact your point of
          contact for more details...
        </p>
        <Link to="/add-ons/pre-departure-support">
          <div className=" w-full bg-light flex justify-between items-center p-3 rounded-lg mt-4 md:mt-4">
            <p className="pl-2 text-xs lg:text-base"> Pre Departure</p>
            <p className="pl-2 text-xs lg:text-base">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.97578 5.99922C6.97578 6.13255 6.95078 6.26155 6.90078 6.38622C6.85078 6.51155 6.78411 6.61589 6.70078 6.69922L2.10078 11.2992C1.91745 11.4826 1.68411 11.5742 1.40078 11.5742C1.11745 11.5742 0.884114 11.4826 0.700781 11.2992C0.517448 11.1159 0.425781 10.8826 0.425781 10.5992C0.425781 10.3159 0.517448 10.0826 0.700781 9.89922L4.60078 5.99922L0.700781 2.09922C0.517448 1.91589 0.425781 1.68255 0.425781 1.39922C0.425781 1.11588 0.517448 0.882553 0.700781 0.69922C0.884114 0.515886 1.11745 0.424218 1.40078 0.424218C1.68411 0.424218 1.91745 0.515886 2.10078 0.69922L6.70078 5.29922C6.80078 5.39922 6.87145 5.50755 6.91278 5.62422C6.95478 5.74089 6.97578 5.86589 6.97578 5.99922Z"
                  fill="white"
                />
              </svg>
            </p>
          </div>
        </Link>

        {/**Accordion */}
        {
          <div className="mt-4">
            {list.map((x, index) => (
              <Accordion
                expanded={expanded === index}
                elevation={0}
                onChange={handleAccordian(index)}
                className={`${classes.root} mb-4`}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary
                  sx={{ borderRadius: "8px", height: "10px" }}
                  style={{ minHeight: "48px" }}
                  expandIcon={
                    <svg
                      className="rotate"
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.99922 0.0281248C6.13255 0.0281248 6.26155 0.0531254 6.38622 0.103126C6.51155 0.153126 6.61589 0.219792 6.69922 0.303125L11.2992 4.90312C11.4826 5.08646 11.5742 5.31979 11.5742 5.60313C11.5742 5.88646 11.4826 6.11979 11.2992 6.30313C11.1159 6.48646 10.8826 6.57812 10.5992 6.57812C10.3159 6.57812 10.0826 6.48646 9.89922 6.30313L5.99922 2.40312L2.09922 6.30313C1.91589 6.48646 1.68255 6.57812 1.39922 6.57812C1.11588 6.57812 0.882553 6.48646 0.69922 6.30313C0.515886 6.11979 0.424218 5.88646 0.424218 5.60313C0.424218 5.31979 0.515886 5.08646 0.69922 4.90312L5.29922 0.303125C5.39922 0.203125 5.50755 0.132459 5.62422 0.0911255C5.74089 0.0491257 5.86589 0.0281248 5.99922 0.0281248Z"
                        fill="white"
                      />
                    </svg>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={classes.summary}
                >
                  <div className=" w-full flex justify-between">
                    <div className="flex gap-2">
                      <p
                        className={`font-nunitoRegular my-2 mx-3 text-xs md:text-base ${
                          expanded == index ? "text-slider" : "text-white"
                        }`}
                      >
                        {x.name}
                      </p>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <div className="w-full p-4 bg-tab rounded-lg">
                    <p className="text-white">{x.process || "NA"}</p>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        }
      </div>
    </>
  );
};
export default AddOnsListing;
