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
    name: "Here’s advice we’ll give you at pre-departure sessions What to pack?",
    process: `Being organised when you are packing will save you a lot of time and hassle in your new country. That’s why we help you with a ready checklist to refer before leaving India.`,
  },
  {
    name: "Arrival in a new country",
    process: `So you just landed in the new host city, now what? In our
    sessions, we’ll guide you about the immigration checks,
    customs control and how to reach your campus from the
    airport conveniently.`,
  },
  {
    name: "Banking and foreign exchange",
    process: `One of the first things on your to-do list when you arrive
    in your new study country will be setting up a bank
    account. Having a local bank account will ensure that you
    have easy access to your money to pay for your
    accommodation, tuition fees and living expenses. It also
    allows your employer to deposit your remuneration into
    your account if you choose to work during or post studies.
    We’ll help you with the steps you need to take in order to
    get started with your finances in a new city.`,
  },
  {
    name: "Insights into the local culture",
    process: `It helps to have some knowledge of the local culture and
    customs before arriving in your study country. This eases your transition into the community and helps you interact with your new classmates more effectively. Half of the fun of going abroad is learning about the things people from
    other cultures do differently. We’ll tell you all about the
    culture, activities, life as a local, and even some colloquial
    terms that’ll come handy in your new city.`,
  },
  {
    name: "Student life in your new country",
    process: `When you study abroad, you’ll need to adjust to a new
    learning environment along with getting used to new
    cultural norms as a student. Our sessions will brief you
    about different learning styles, classroom environments
    and expectations`,
  },
  {
    name: "Culture shock",
    process: `Culture shock is common when you move to a completely
    different culture than yours. Since it plays an important
    role in adjusting to your study country, we’ll discuss the
    various stages (honeymoon, frustration, adjustment and
    acceptance) in our sessions. We would also guide you with some simple techniques on how to recognise if you are
    undergoing culture shock, the stage you are in and how to deal with it.`,
  },
  {
    name: "Support and well-being in your new country",
    process: `Whether it’s academic support, English language help or
    visa advice, we outline some of the practical support that’s available to international students`,
  },
  {
    name: "Working while you study and advice on internships",
    process: `Part-time jobs can help complement your study and living
    experience. We’ll discuss how to stay within the rules of
    your student visa and help you with some tips on finding a good student job.`,
  },
  {
    name: "Dealing with homesickness",
    process: `We know it’s hard to stay away from family and friends, but we’ll help you with some tips on how to deal with the
    feeling of homesickness when you arrive in your study
    country. `,
  },
  {
    name: "Brush up on legalities",
    process: `We’ll brief you on the dos and don’ts of your study country and what rights you have as an international student. 
    …plus, some practical guidance and a lot of support`,
  },
  {
    name: "A network of advice",
    process: `You will also have the opportunity to ask questions from
    IDP alumni and network with current and future students just like you.`,
  },

];

const PreDepartureSupport = () => {
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
      <div className="p-2 lg:p-4">
        <p className="text-xl font-audiowide gradient-text">
          <span className="text-xl md:text-2xl font-audiowide  gradient-text ">
            {" "}
            Pre-Departure Support
          </span>
        </p>
        <p className="text-xs pb-2 text-primary">
          Our pre-departure sessions will help you navigate personal and
          cultural growth opportunities while you’re abroad.
        </p>

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
                    <p className="text-white text-xs lg:text-base">{x.process || "NA"}</p>
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
export default PreDepartureSupport;
