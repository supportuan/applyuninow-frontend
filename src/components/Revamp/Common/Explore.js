
import Particles from "react-tsparticles";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";
import forwardArrow from "../../../assets/allstudents/forwardArrow.svg";
import backwardArrow from "../../../Images/rev/back-btn.svg";
import logo from "../../../assets/background/logo.svg";

import { CustomCheckbox } from "../../Checkbox";
import { SelectInput } from "../../Select";
import { Input } from "../../Input";
// import { grade } from "../utils/helpers";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Validator from "validatorjs";
import industry from "../../../utils/Industry";
import SubIndustry from "../../../utils/SubIndustry";
import { environment } from "../../../environments/environment";
import SearchBar from "../../SearchBar/SearchBar";
import { findCountryByApiName, sortStudyDestinations } from "../../../country";
import { useRouter } from "next/router";
import { capitalize, resolveDisplayName, uuid, grade } from "../../../utils/helpers";
import TopStrip from "./TopStrip";
import { usePageContext } from "../context/PageContext";

const COMMONSVGELE = `<svg width="46" height="64" viewBox="0 0 46 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.894 44.7703C24.317 44.7703 23.0342 46.0532 23.0342 47.6301C23.0342 49.207 24.3171 50.4899 25.894 50.4899C27.4708 50.4899 28.7537 49.207 28.7537 47.6301C28.7537 46.0532 27.4708 44.7703 25.894 44.7703ZM25.894 48.6302C25.3426 48.6302 24.894 48.1816 24.894 47.6302C24.894 47.0789 25.3426 46.6303 25.894 46.6303C26.4453 46.6303 26.8939 47.0789 26.8939 47.6302C26.8939 48.1816 26.4453 48.6302 25.894 48.6302Z" fill="url(#paint0_linear_2708_1996)"/>
<path d="M26.3834 18.8563C26.3834 16.7934 24.7052 15.1152 22.6423 15.1152C20.5795 15.1152 18.9014 16.7934 18.9014 18.8563C18.9014 20.9191 20.5795 22.5972 22.6423 22.5972C24.7052 22.5972 26.3834 20.9191 26.3834 18.8563ZM20.7612 18.8563C20.7612 17.819 21.605 16.975 22.6423 16.975C23.6796 16.975 24.5236 17.819 24.5236 18.8563C24.5236 19.8936 23.6796 20.7374 22.6423 20.7374C21.605 20.7374 20.7612 19.8936 20.7612 18.8563Z" fill="url(#paint1_linear_2708_1996)"/>
<path d="M44.7822 61.9012H43.3828V59.2363C43.3828 57.1467 41.6826 55.4464 39.5929 55.4464H32.2776V47.2704C32.2776 46.3311 32.0721 45.4394 31.706 44.6354H41.8544C43.1957 44.6354 44.2871 43.5441 44.2871 42.2027V38.0803C44.2871 36.739 43.1957 35.6477 41.8544 35.6477H19.5127C18.1714 35.6477 17.0801 36.739 17.0801 38.0803V42.2027C17.0801 42.8638 17.346 43.4634 17.7754 43.9023C13.0776 42.7234 9.58851 38.4654 9.58851 33.4072C9.58851 31.5209 10.0847 29.6616 11.0235 28.03C11.2796 27.5849 11.1264 27.0164 10.6812 26.7603C10.2362 26.5045 9.66761 26.6572 9.41145 27.1026C8.31057 29.0158 7.72869 31.1959 7.72869 33.4074C7.72869 40.1363 12.9978 45.6567 19.6265 46.0619C19.5512 46.4535 19.5102 46.8572 19.5102 47.2704V51.6438C9.85768 51.174 2.14925 43.1741 2.14925 33.4072C2.14925 25.0069 7.91715 17.75 15.8774 15.7162C15.4323 16.6714 15.182 17.7349 15.182 18.8564C15.182 19.8357 15.3735 20.7705 15.718 21.628C14.4363 22.1391 13.251 22.8556 12.1838 23.7673C11.7934 24.1007 11.7473 24.6878 12.0808 25.0782C12.2647 25.2936 12.5257 25.4042 12.7883 25.4042C13.0019 25.4042 13.2165 25.3309 13.3917 25.1813C14.3651 24.3498 15.4535 23.7103 16.6325 23.2703C17.8251 24.8898 19.6553 26.0106 21.7498 26.2617V27.0939C21.7498 28.4762 22.7281 29.6339 24.0285 29.9124L25.3046 32.4318C25.3095 32.4417 25.3148 32.4517 25.3202 32.4615C25.6897 33.1301 26.3939 33.5455 27.1581 33.5455H30.626C31.3901 33.5455 32.0944 33.13 32.4639 32.4615C32.4692 32.4517 32.4745 32.4417 32.4795 32.4318L33.7556 29.9124C35.0559 29.634 36.0342 28.4762 36.0342 27.0939V18.4502H38.2334C38.2599 19.6398 39.2338 20.5997 40.4296 20.5997H41.7003C42.9127 20.5997 43.899 19.6134 43.899 18.401V12.8314C43.899 11.619 42.9127 10.6327 41.7003 10.6327H40.4296C39.2338 10.6327 38.2599 11.5926 38.2334 12.7821H36.0342V10.011C36.0342 8.75651 35.0137 7.73584 33.759 7.73584H32.2773V6.11284H34.1048C35.1686 6.11284 36.0342 5.24741 36.0342 4.18359V2.16818C36.0342 1.10449 35.1688 0.238928 34.1048 0.238928H29.0259C28.5122 0.238928 28.096 0.655154 28.096 1.16884C28.096 1.68252 28.5122 2.09874 29.0259 2.09874H34.1048C34.1431 2.09874 34.1744 2.12986 34.1744 2.16818V4.18372C34.1744 4.22203 34.1431 4.25315 34.1048 4.25315H31.3473H26.4364H23.6788C23.6405 4.25315 23.6094 4.22203 23.6094 4.18372V2.16818C23.6094 2.12986 23.6405 2.09874 23.6788 2.09874H25.063C25.5767 2.09874 25.9929 1.68252 25.9929 1.16884C25.9929 0.655154 25.5767 0.238928 25.063 0.238928H23.6788C22.6151 0.238928 21.7496 1.10436 21.7496 2.16818V4.18372C21.7496 5.24741 22.615 6.11297 23.6788 6.11297H25.5065V7.73609H24.0246C22.7703 7.73609 21.7496 8.75663 21.7496 10.0113V11.4511C20.0878 11.6503 18.5927 12.3972 17.4501 13.5065C12.7733 14.1965 8.47894 16.5251 5.32866 20.089C2.07882 23.7655 0.289062 28.4953 0.289062 33.4074C0.289062 44.1999 8.83156 53.0335 19.5099 53.505V55.4465H12.1946C10.1049 55.4465 8.40467 57.1468 8.40467 59.2365V61.9013H7.36094C6.84726 61.9013 6.43104 62.3176 6.43104 62.8312C6.43104 63.3449 6.84726 63.7611 7.36094 63.7611H9.33458H42.4525H44.7818C45.2955 63.7611 45.7117 63.3449 45.7117 62.8312C45.7117 62.3176 45.2958 61.9012 44.7822 61.9012ZM17.0418 18.8563C17.0418 15.768 19.5543 13.2554 22.6425 13.2554C22.6547 13.2554 22.6667 13.2563 22.679 13.2563H22.6799H22.6801C25.7512 13.2766 28.2434 15.7804 28.2434 18.8562C28.2434 21.9319 25.7512 24.4356 22.6801 24.4559C22.68 24.4559 22.6799 24.4559 22.6799 24.4559C22.6796 24.4559 22.6792 24.4559 22.679 24.4559C22.6668 24.4559 22.6548 24.4568 22.6425 24.4568C19.5543 24.4571 17.0418 21.9446 17.0418 18.8563ZM30.8311 31.5709C30.7875 31.6419 30.71 31.6857 30.6262 31.6857H27.1583C27.0744 31.6857 26.9969 31.6419 26.9535 31.5709L26.1459 29.9766H31.6386L30.8311 31.5709ZM33.152 28.1167H24.6325C24.0685 28.1167 23.6098 27.6579 23.6098 27.0939V26.2522C25.0328 26.067 26.3318 25.4816 27.3871 24.6098H34.1748V27.0939C34.1748 27.6579 33.7159 28.1167 33.152 28.1167ZM40.091 12.8314C40.091 12.6445 40.2431 12.4925 40.4298 12.4925H41.7006C41.8874 12.4925 42.0394 12.6446 42.0394 12.8314V18.401C42.0394 18.5879 41.8873 18.7399 41.7006 18.7399H40.4298C40.243 18.7399 40.091 18.5877 40.091 18.401V17.5203V13.7119V12.8314ZM38.2311 14.6418V16.5904H36.0345V14.6418H38.2311ZM27.3666 6.11284H30.4177V7.73596H27.3666V6.11284ZM24.0249 9.59578H26.4343C26.4351 9.59578 26.4359 9.5959 26.4367 9.5959H31.3476C31.3485 9.5959 31.3492 9.59578 31.35 9.59578H33.7593C33.9883 9.59578 34.1746 9.78213 34.1746 10.0111V13.712V17.5204V22.7501H29.0036C29.7004 21.6159 30.1033 20.2825 30.1033 18.8565C30.1033 15.0706 27.268 11.9365 23.6098 11.4607V10.011C23.6098 9.78213 23.796 9.59578 24.0249 9.59578ZM18.9399 38.0802C18.9399 37.7643 19.1968 37.5074 19.5127 37.5074H41.8544C42.1703 37.5074 42.4272 37.7643 42.4272 38.0802V42.2025C42.4272 42.5185 42.1703 42.7755 41.8544 42.7755H30.422C29.2648 41.6098 27.6624 40.8867 25.894 40.8867C24.1256 40.8867 22.5231 41.6099 21.366 42.7755H19.5127C19.1968 42.7755 18.9399 42.5185 18.9399 42.2025V38.0802ZM21.3701 47.2703C21.3701 44.7759 23.3995 42.7465 25.8939 42.7465C28.3883 42.7465 30.4177 44.7759 30.4177 47.2703V55.4463H21.3699V47.2703H21.3701ZM10.2649 61.9012V59.2363C10.2649 58.172 11.1307 57.3062 12.195 57.3062H20.4402H31.3477H39.5929C40.6572 57.3062 41.523 58.172 41.523 59.2363V61.9012H10.2649Z" fill="url(#paint2_linear_2708_1996)"/>
<defs>
<linearGradient id="paint0_linear_2708_1996" x1="25.894" y1="44.7703" x2="25.894" y2="50.4899" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4B55"/>
<stop offset="1" stop-color="#C41230"/>
</linearGradient>
<linearGradient id="paint1_linear_2708_1996" x1="22.6424" y1="15.1152" x2="22.6424" y2="22.5972" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4B55"/>
<stop offset="1" stop-color="#C41230"/>
</linearGradient>
<linearGradient id="paint2_linear_2708_1996" x1="23.0004" y1="0.238928" x2="23.0004" y2="63.7611" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF4B55"/>
<stop offset="1" stop-color="#C41230"/>
</linearGradient>
</defs>
</svg>
`;
const options = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 700,
            },
        },

        color: {
            value: "#b9cdf0",
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#b9cdf0",
            },
            polygon: {
                nb_sides: 5,
            },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 0.1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#b9cdf0",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
};

const useStyles = makeStyles({
    option: {
        "&:hover": {
            backgroundColor: "#fff !important",
        },
    },
    customTextField: {
        "& input::placeholder": {
            color: "#fff !important",
        },
    },
});

const selectStyles = () => {
    return {
        input: {
            "&::placeholder": {
                fontFamily: "audiowide",
                color: "#1E417C",
                opacity: 1,
            },
        },
        width: "100%",
        "& .MuiAutocomplete-inputRoot:before": {
            borderBottom: "1px solid #1E417C !important",
        },
        "& .MuiFormLabel-root": {
            color: "#1E417C !important",
            fontFamily: "audiowide !important",
        },
        "& .MuiInputBase-input": {
            color: "#1E417C  !important",
        },
        "& .MuiSvgIcon-root": {
            fill: "#1E417C",
        },
        backgroundColor: "transparent",
    };
};

const initialState = {
    email: "",
    phone: "",
    level: "",
    country_id: "",
    industry_id: "",
    study_area_id: "",
    intake_month: "",
    intake_year: "",
    first_name: "",
    last_name: "",
    rec_grade_achived: "",
    rec_level_academic: "",
    pre_study_loc: "",
    attendence_type: "",
    study_duration: "",
    sub_industry_id: "",
    study_budget: "",
    work_experince: "",
    study_mode: "",
    type_of_degree: "",
    enable_email_notification: true,
    agree_1: false,
    agree_2: false,
    study_attendance_type: "",
    accept_terms: false,
    accept_terms_info: false,

    education_details: [
        {
            passing_year: "",
            medium: "",
            grade: "",
            type: "SSC",
            label: "Secondary school Certificate / 10th",
        },
        {
            passing_year: "",
            medium: "",
            grade: "",
            type: "HSC",
            label: "Higher Secondary school Certificate / 12th",
        },
        {
            passing_year: "",
            medium: "'",
            start_year: "",
            end_year: "",
            grade: "",
            type: "UG",
            label: "Under Graduation",
            ug_type: "",
            backlogs: "",
        },
        {
            passing_year: "",
            medium: "english",
            start_year: "",
            end_year: "",
            grade: "",
            type: "PG",
            label: "Post Graduation",
            ug_type: "",
            backlogs: "",
        },
    ],
    asst_exam_sections: [{}],
};

const examMeta = {
    exam_list: [
        {
            name: " Per SAT - Pre Scholastic Assessment Test",
            type: "ug",
            min: 400,
            max: 1600,
            ind_min: -1,
            ind_max: -1,
            options: [
                "overall_score",
                "Reading",
                "Writing",
                "Language",
                "Mathematics",
                "Essay(Optional)",
            ],
        },
        {
            name: "SAT - Scholastic Assessment Test",
            type: "ug",
            min: 400,
            max: 1600,
            ind_min: -1,
            ind_max: -1,
            options: [
                "overall_score",
                "Reading",
                "Writing",
                "Language",
                "Mathematics",
                "Essay(Optional)",
            ],
        },
        {
            name: "ACT - American College Test",
            type: "ug",
            min: 400,
            max: 1600,
            ind_min: -1,
            ind_max: -1,
            options: [
                "overall_score",
                "English",
                "Mathematics",
                "Reading",
                "Science",
                "Writing(optional)",
            ],
        },
        {
            name: "GRE - Graduate Record Examinations",
            type: "pg",
            min: 0,
            max: 340,
            ind_min: -1,
            ind_max: -1,
            options: [
                "overall_score",
                "verbal reasoning",
                "quantitative reasoning",
                "analytical writing skills",
            ],
        },
        {
            name: "GMAT - Graduate Management Admission Test",
            type: "pg",
            min: 200,
            max: 800,
            ind_min: -1,
            ind_max: -1,
            options: [
                "overall_score",
                "Mathematics",
                "Verbal",
                "Integrated Reasoning",
                "Essay",
            ],
        },
        {
            name: "I wish to consider the tests but later!",
            type: "common",
            options: [],
        },
        {
            name: "I do not wish to consider the test for making applications**!",
            type: "common",
            options: [],
        },
    ],
    eng_prof_test_list: [
        {
            min: 1,
            max: 9,
            ind_min: 1,
            ind_max: 9,
            name: "IELTS - International English Language Testing Systems ",
            options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
        },
        {

            min: 0,
            max: 120,
            ind_min: 0,
            ind_max: 30,
            name: "TOEFL - Test of English as a Foreign Language",
            options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
        },
        {

            min: 10,
            max: 90,
            ind_min: 10,
            ind_max: 90,
            name: "PTE - Pearson Test of English",
            options: ['overall_score', 'reading', 'writing', 'speaking', 'listening'],
        },
        {

            min: 10,
            max: 160,
            ind_min: 10,
            ind_max: 160,
            name: "DET - Duolingo English Test",
            options: ['overall_score', 'literacy', 'conversation', 'comprehension', 'production'],
        },
        {
            name: "I wish to consider the tests but later!",
            options: [],
        },
        {
            name: "I do not wish to consider the test for making applications**!",
            options: [],
        },
    ],
};
const eduIntParams = {
    ssc_passing_year: null,
    ssc_medium: "",
    ssc_grade: "",
    hsc_passing_year: null,
    hsc_medium: "",
    hsc_grade: "",
    ug_type: "",
    ug_medium: "",
    ug_start_year: null,
    ug_end_year: null,
    ug_grade: "",
    ug_type: "",
    ug_type: "",
    ug_backlogs: "",
    pg_start_year: null,
    pg_end_year: null,
    pg_grade: "",
    pg_type: "",
    pg_type: "",
    pg_backlogs: "",
    pg_medium: "",
};

const examInitParams = {
    exam_list: [],
    exam_type: "",
    exam_sections: "",
    eng_prof_test: "",
    eng_proficiency_test_list: [],
};

let initialToggleState = {
    ug_toggle: false,
    pg_toggle: false,
};

const Explore = () => {
    const navigate = useRouter();
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [inputs, setInputs] = useState(initialState);
    const [eduParams, setEduParams] = useState(eduIntParams);
    const [formErrors, setFormErrors] = useState({});
    const [examParams, setExamParams] = useState(examInitParams);
    const [study_area_list, setStudyArea] = useState([]);
    const [filterdData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [studySearch, setStudySearch] = useState("");
    const [degreeType, setDegreeType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);
    const [study_sub_industry, setStudySubIndutries] = useState(SubIndustry);
    const [industryName, setIndustryName] = useState("");
    const [toogleState, setToggleState] = useState(initialToggleState);
    const topString = '3,43,000+ graduate courses to choose from 9 study destinations';
    const { prerequisiteData, isPrerequisiteLoaded } = usePageContext();

    useEffect(() => {
        if (isPrerequisiteLoaded) {
            getMetaList(prerequisiteData.data);
        }
    }, [isPrerequisiteLoaded, prerequisiteData]);


    const toogleAccordian = (stage) => {
        setToggleState((inputs) => ({
            ...inputs,
            [stage]: !toogleState[stage],
        }));
    }
    const handleSelectionChange = (e) => {
        const { name, value } = e.target;
        setErrorMessage("");
        let obj = { ...inputs }
        obj[name] = String(value)
        setInputs((inputs) => ({ ...inputs, ...obj }));
        if (inputs.level !== "Post Graduation" &&
            inputs.level !== "Under Graduation" && obj.intake_month && obj.intake_year) {
            setStep(4);
        }
    };

    const selectOrDeselect = (item) => {
        degreeType.splice(0);
        item.options.map((opt) => {
            degreeType.push({ name: resolveDisplayName(opt), checked: false });
        });

        const metaData = { ...meta };
        for (let data of metaData.type_of_degree_category) {
            data.checked = false;
            if (item.name === data.name) {
                data.checked = true;
            }
        }
        if (item.name === "Under Graduation") {
            metaData.study_durations = [
                "Undergraduation 3 Years",
                "Under Graduatuion 4 Years",
                "Under Graduation 4+ Years",
                "Diploma",
            ].map((x) => {
                return { name: x, checked: false };
            });
        }
        if (item.name === "Post Graduation") {
            metaData.study_durations = [
                "Diploma",
                "Post Graduation 1 Year",
                "Post Graduation 2 Year",
            ].map((x) => {
                return { name: x, checked: false };
            });
        }
        setInputs((inputs) => ({ ...inputs, level: item.name }));
        setMeta(metaData);
        goToNext(item);
    };

    const goToNext = (item1) => {
        if (
            item1.name === "Pre Masters" ||
            item1.name === "Diploma" ||
            item1.name === "Summer Programs" ||
            item1.name === "Masters" ||
            item1.name === "DBA(Doctorate of Business Administration)" ||
            item1.name === "PhD(Doctor of Philosophy)"
        ) {
            setStep(3);
        }
        const isstudy_level = meta.type_of_degree_category.some(
            (item) => item.checked
        );
        const is_degree = degreeType.some((item) => item.checked);
        if (is_degree && isstudy_level) setStep(3);
    };

    const selectTypeDegree = (item) => {
        item.checked = !item.checked;
        let list = degreeType.slice(0);
        for (let data of list) {
            data.checked = false;
            if (item.name === data.name) {
                data.checked = true;
            }
        }
        let items = JSON.parse(JSON.stringify(degreeType));
        item.degreeType = list;
        setDegreeType(items);
        goToNext(item);
        setInputs((inputs) => ({ ...inputs, type_of_degree: item.name }));
    };

    // const [prerequisite, setPrerequisite] = useState();

    const [meta, setMeta] = useState({
        study_destination: [],
        study_level: [],
        study_industry: [],
        study_intake: [],
        intake_month: [],
        intake_year: [],
        type_of_degree: [],
        study_durations: [],
        study_sub_industry: [],
    });
    const getMetaList = (response) => {
        if (!response) return;

        let {
            study_destination,
            study_level,
            type_of_degree,
            study_durations,
            study_industry,
            intake_month,
            intake_year,
        } = response;
        for (let item of study_destination) {
            item["checked"] = false;
            const flag = findCountryByApiName(item.name);
            if (flag) {
                item["flag"] = flag.img;
                item["short_name"] = flag.name;
            }
        }
        study_industry = study_industry.map((x) => {
            return {
                name: x.name,
                id: x.id,
                checked: false,
                icon: industry.find((y) => x.name === y.name)?.svg || COMMONSVGELE,
            };
        });
        study_level = study_level.map((x) => {
            return { name: resolveDisplayName(x), checked: false };
        });

        type_of_degree = type_of_degree.map((x) => {
            return { name: resolveDisplayName(x), checked: false };
        });

        intake_month = intake_month.map((x) => {
            return { name: resolveDisplayName(x) };
        });

        intake_year = intake_year.map((x) => {
            return { name: resolveDisplayName(x), checked: false };
        });

        study_durations = study_durations.map((x) => {
            return { name: resolveDisplayName(x), checked: false };
        });

        if (response.type_of_degree_category) {
            response.type_of_degree_category = response.type_of_degree_category.map((cat) => ({
                ...cat,
                name: resolveDisplayName(cat.name),
                options: (cat.options || []).map((opt) => resolveDisplayName(opt)),
            }));
        }

        response.study_durations = study_durations;
        response.type_of_degree = type_of_degree;
        response.study_level = study_level;
        response.study_industry = study_industry;
        response.intake_month = intake_month;
        response.intake_year = intake_year;

        response.study_destination = sortStudyDestinations(
            study_destination.filter((x) => x.flag)
        );
        setMeta(response);
        setFilteredData(response);
    };

    const onSelectDuration = (item) => {
        let list = meta?.study_durations.slice(0);
        for (let data of list) {
            data.checked = false;
            if (item.name === data.name) {
                data.checked = true;
            }
        }
        let items = JSON.parse(JSON.stringify(meta));
        items.study_durations = list;
        setMeta(items);
        setInputs((inputs) => ({ ...inputs, study_duration: item.name }));
        if (inputs.intake_month && inputs.intake_year) {
            setStep(4);
        }
    };

    function onIndustrySelect(item) {
        let arr = [...meta.study_industry];

        for (let data of arr) {
            data.checked = false;
            if (item.id === data.id) {
                data.checked = true;
            }
            //   let firstItem;
            //   const filteredItems = arr.filter((area) => {
            //     if (area.id === item.id) {
            //       firstItem = [area];
            //       return false;
            //     }

            //     return true;
            //   });

            //  setMeta([...firstItem,...arr])
        }

        let items = JSON.parse(JSON.stringify(meta));
        items.study_industry = arr;
        setMeta(item);
        getStudySubIndustry(item.id);
        //getStudyArea(item?.id);
    }


    const getStudyArea = (industry_id, id) => {
        setInputs((inputs) => ({
            ...inputs,
            industry_id: industry_id,
            // sub_industry_id: id,
        }));
        axios
            .get(
                `${environment.API_BASE_URL}/study-areas?industry_id=${industry_id}&search_key=${studySearch}`
            )
            .then((res) => {
                res.data.data = res.data.data.map((x) => {
                    x["checked"] = false;
                    return x;
                });
                setStudyArea(res.data.data);
            })
            .catch((err) => { });
    };

    const getStudySubIndustry = (id) => {
        setInputs((inputs) => ({ ...inputs, industry_id: id }));
        axios
            .get(`${environment.API_BASE_URL}/study-areas/?industry_id=${id}`)
            .then((res) => {
                if (!res.data.data.length) {
                    setStep(7);
                    return;
                }
                res.data.data = res.data.data.map((x) => {
                    x["checked"] = false;
                    x.icon =
                        SubIndustry.find((y) => x.name == y.name)?.svg || COMMONSVGELE;
                    return x;
                });
                setStudySubIndutries(res.data.data);
                setStudyArea(res.data.data);
                let items = JSON.parse(JSON.stringify(meta));
                items.study_sub_industry = res.data.data;
                setStep(5);
                setMeta(items);

            })
            .catch((err) => { });
    };

    const getStudyAreaOnInputChange = (industry_id, str) => {
        axios
            .get(
                `${environment.API_BASE_URL}/study-areas?industry_id=${industry_id}&search_key=${str}`
            )
            .then((res) => {
                res.data.data = res.data.data.map((x) => {
                    x["checked"] = false;
                    return x;
                });
                setStudyArea(res.data.data);
            })
            .catch((err) => { });
    };

    const studyNext = () => {
        if (
            inputs.level == "Post Graduation" ||
            inputs.level == "Under Graduation"
        ) {
            let isSelected =
                meta.type_of_degree_category.some((x) => x.checked) &&
                degreeType.some((x) => x.checked);
            if (isSelected) {
                setStep(3);
            } else {
                toast.error("Please Choose Degree Type!");
            }
        } else {
            let isSelected = meta.type_of_degree_category.some((x) => x.checked);
            if (isSelected) {
                setStep(3);
            } else {
                toast.error("Please Choose Study Level!");
            }
        }
    };

    const onIntakeSelect = (item) => {
        let isSelected = meta.study_durations.some((x) => x.checked);

        if (
            inputs.level == "Post Graduation" ||
            inputs.level == "Under Graduation"
        ) {
            if (isSelected && inputs.intake_year && inputs.intake_month) {
                setStep(4);
            }
            if (!isSelected || !inputs.intake_year || !inputs.intake_month) {
                toast.error("Please Select Above All Sections");
                return;
            }
        } else {
            if (inputs.intake_year && inputs.intake_month) {
                setStep(4);
            } else {
                toast.error("Please choose study duration");
                return;
            }
        }
    };

    const industryNext = () => {
        if (inputs.industry_id) {
            setStep(5);
            return;
        }
        toast.error(`Please select study industry!`);
    };

    const onLevelSelect = () => {
        let isSelected = study_area_list.some((x) => x.checked);
        if (isSelected) {
            setStep(7);
        } else {
            toast.error("Please choose subject area");
        }
    };

    const handleSubIndustrySelect = () => {
        let isSelected = study_sub_industry.some((x) => x.checked);
        if (isSelected) {
            setStep(6);
        } else {
            toast.error("Please choose study area");
        }
    };

    function onExtraDetailsStep() {
        if (
            inputs.study_mode &&
            inputs.study_attendance_type &&
            inputs.study_budget &&
            inputs.work_experince
        ) {
            setStep(7);
        } else {
            toast.error("Please select all above  sections.");
        }
    }

    function onEducationDetails() {
        const currentYear = new Date().getFullYear();

        for (let item of ["ssc_passing_year", "ssc_medium", "ssc_grade"]) {
            if (!eduParams[item]) {
                toast.error("Please Enter Full SSC details!");
                return;
            }
        }

        for (let item of ["hsc_passing_year", "hsc_medium", "hsc_grade"]) {
            if (!eduParams[item]) {
                toast.error("Please Enter Full HSC details!");
                return;
            }
        }

        let ug_list = [
            "ug_type",
            "ug_medium",
            "ug_start_year",
            "ug_end_year",
            "ug_grade",
            "ug_backlogs",
        ];
        let isUgExists = false;
        for (let item of ug_list) {
            if (eduParams[item]) {
                isUgExists = true;
                break;
            }
        }
        if (isUgExists) {
            for (let item of ug_list) {
                if (!eduParams[item]) {
                    toast.error("Please Enter Full UG details!");
                    return;
                }
            }
        }

        let pg_list = [
            "pg_start_year",
            "pg_end_year",
            "pg_grade",
            "pg_type",
            "pg_backlogs",
            "pg_medium",
        ];
        let isPgExists = false;
        for (let item of pg_list) {
            if (eduParams[item]) {
                isPgExists = true;
                break;
            }
        }

        if (isPgExists) {
            for (let item of pg_list) {
                if (!eduParams[item]) {
                    toast.error("Please Enter  Full PG details!");
                    return;
                }
            }
        }

        if (eduParams.ssc_passing_year) {
            if (
                Number(eduParams.ssc_passing_year) > currentYear ||
                eduParams.ssc_passing_year.length < 4
            ) {
                toast.error("Please Enter valid SSC Passing Year!.");
                return;
            }
        }
        if (eduParams.hsc_passing_year) {
            if (
                Number(eduParams.hsc_passing_year) > currentYear ||
                eduParams.hsc_passing_year.length < 4
            ) {
                toast.error("Please Enter valid HSC Passing Year!.");
                return;
            }
        }

        if (
            eduParams.ssc_passing_year &&
            eduParams.hsc_passing_year &&
            Number(eduParams.hsc_passing_year) <= Number(eduParams.ssc_passing_year)
        ) {
            toast.error(
                "HSC passing year should not be less then SSC passing year!."
            );
            return;
        }

        if (eduParams.ug_start_year) {
            if (
                Number(eduParams.ug_start_year) > currentYear ||
                eduParams.ug_start_year.length < 4
            ) {
                toast.error("Please Enter valid UG Start Year!.");
                return;
            }
        }
        if (eduParams.ug_end_year) {
            if (
                Number(eduParams.ug_end_year) > currentYear ||
                eduParams.ug_end_year.length < 4
            ) {
                toast.error("Please Enter valid UG End Year!.");
                return;
            }
        }

        if (
            eduParams.ug_start_year &&
            Number(eduParams.ug_start_year) < Number(eduParams.hsc_passing_year)
        ) {
            toast.error(
                "UG starting year should not be less then HSC passing year!."
            );
            return;
        }

        if (
            eduParams.ug_start_year &&
            eduParams.ug_end_year &&
            Number(eduParams.ug_end_year) < Number(eduParams.ug_start_year)
        ) {
            toast.error("UG end year should not be less then UG Start year!.");
            return;
        }

        if (eduParams.pg_start_year) {
            if (
                Number(eduParams.pg_start_year) > currentYear + 3 ||
                eduParams.pg_start_year.length < 4
            ) {
                toast.error("Please Enter valid PG Start Year!.");
                return;
            }
        }
        if (eduParams.pg_end_year) {
            if (
                Number(eduParams.pg_end_year) > currentYear + 3 ||
                eduParams.pg_end_year.length < 4
            ) {
                toast.error("Please Enter valid PG End Year!.");
                return;
            }
        }

        if (
            eduParams.pg_start_year &&
            Number(eduParams.pg_start_year) < Number(eduParams.ug_end_year)
        ) {
            toast.error("PG starting year should not be less then UG End year!.");
            return;
        }

        if (
            eduParams.pg_start_year &&
            eduParams.pg_end_year &&
            Number(eduParams.pg_end_year) < Number(eduParams.pg_start_year)
        ) {
            toast.error("PG end year should not be less then PG Start year!.");
            return;
        }

        let levelList = [
            'Post Graduation',
            'Pre Masters',
            'DBA(Doctorate of Business Administration)',
            'PhD(Doctor of Philosophy)']
        if (levelList.includes(inputs.level) && !eduParams.ug_type) {
            toast.error("Please Enter UG Details.");
            return;
        }

        let list =
            inputs.level === "Under Graduation"
                ? examMeta.exam_list.filter((x) => x.type === "ug" || x.type === 'common')
                : inputs.level === "Post Graduation"
                    ? examMeta.exam_list.filter((x) => x.type === "pg" || x.type === 'common')
                    : examMeta.exam_list;
        setExamParams((examParams) => ({ ...examParams, exam_list: list }));
        setStep(8);
    }

    const onTest = () => {

        if (examParams.exam_type) {
            let list = examMeta.exam_list.find(x => x.name === examParams.exam_type)
            if (list && list.options.length) {
                let filled = examParams.exam_sections.every(x => x.value)
                if (!filled) {
                    toast.error(`Please Enter ${list.name} Details.`);
                    return
                }

                if (list.name != 'GRE - Graduate Record Examinations') {
                    const total = Number(examParams.exam_sections.find(x => x.key === 'Overall Score')?.value || 0)
                    if (total < list.min || total > list.max) {
                        toast.error(`Overall Score should be in the range b/w  ${list.min} to ${list.max}`);
                        return
                    }

                } else {
                    const total = Number(examParams.exam_sections.find(x => x.key === 'Overall Score')?.value || 0)

                    if ((total < list.min || total > list.max)) {
                        toast.error(`GRE - Overall Score should be in the range b/w  ${list.min} to ${list.max}`);
                        return
                    }

                    let verbal_reasoning = Number(examParams.exam_sections.find(x => x.key === 'verbal reasoning')?.value || 0)
                    let quantitative_reasoning = Number(examParams.exam_sections.find(x => x.key === 'quantitative reasoning')?.value || 0)
                    let analytical_writing_skills = Number(examParams.exam_sections.find(x => x.key === 'analytical writing skills')?.value || 0)

                    if (verbal_reasoning < 10 || verbal_reasoning > 170) {
                        toast.error(`GRE - Verbal Reasoning b/w 10 to 170`);
                        return
                    }
                    if (quantitative_reasoning < 10 || quantitative_reasoning > 170) {
                        toast.error(`GRE - Quantitative Reasoning b/w 10 to 170`);
                        return
                    }
                    if (analytical_writing_skills < 1 || analytical_writing_skills > 5) {
                        toast.error(`GRE - Analytical Writing Skills b/w 1.0 to 5.0`);
                        return
                    }
                }
            }
        }

        if (examParams.eng_prof_test) {
            let list = examMeta.eng_prof_test_list.find(x => x.name === examParams.eng_prof_test)
            if (list && list.options.length) {
                let filled = examParams.eng_proficiency_test_list.every(x => x.value)
                if (!filled) {
                    toast.error(`Please Enter ${list.name} Details.`);
                    return
                }

                const total = Number(examParams.eng_proficiency_test_list.find(x => x.key === 'Overall Score')?.value || 0)
                if (total < list.min || total > list.max) {
                    toast.error(`${list.name} Overall Score should be in the range b/w  ${list.min} to ${list.max}`);
                    return
                }

                for (let test of examParams.eng_proficiency_test_list) {
                    if (Number(test.value) < list.ind_min || Number(test.value) < list.ind_min) {
                        toast.error(`${test.key}  should be in the range b/w  ${list.min} to ${list.max}`);
                        return
                    }
                }

            }
        }
        setStep(9);
    };

    const onStudyDestination = (item) => {
        let { study_destination } = meta;
        for (let data of study_destination) {
            data.checked = false;
            if (item.id === data.id) {
                data.checked = true;
            }
        }
        let items = JSON.parse(JSON.stringify(meta));
        items.study_destination = study_destination;
        setMeta(items);
        setStep(2);
        setInputs((inputs) => ({ ...inputs, country_id: item.id }));
    };

    function onstudyAreaSelect(item, id) {
        let list = study_area_list;
        for (let data of list) {
            data.checked = false;
            if (item.id === data.id) {
                data.checked = true;
            }
            let firstItem;
            const filteredItems = study_area_list.filter((area) => {
                if (area.id === item.id) {
                    firstItem = [area];
                    return false;
                }

                return true;
            });
            setStudyArea([...firstItem, ...filteredItems]);
            // setStudyArea(list);
            setStep(6);
        }
        setInputs((inputs) => ({ ...inputs, study_area_id: item.id }));
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const re = /^[0-9\b]+$/;
            if (value && !re.test(value)) {
                return;
            }
        }

        var ranges = [
            "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
        ];
        if (e.target.value && e.target.value.match(ranges.join("|"))) {
            e.preventDefault();
            return false;
        }
        handleChange(value, name);
    };
    const onPaste = (e) => {
        var ranges = [
            "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
        ];

        if (e.clipboardData.getData("text/plain").match(ranges.join("|"))) {
            e.preventDefault();
            return false;
        }
    };

    const handleChange = (value, name) => {
        setFormErrors(initialState);
        if (name === "rec_grade_achived") {
            const re = /\b(0|[1-9][0-9]?|100)\b/;
            if (value && !re.test(value)) {
                return;
            }
        }
        if (name === "first_name" || name === "last_name") {
            value = value.charAt(0).toUpperCase() + value.slice(1);
            setInputs((inputs) => ({ ...inputs, [name]: value }));
            return;
        }
        if (name === "email") {
            const reg = /^\S*$/;
            if (value && !reg.test(value)) {
                return;
            }
        }

        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };


    const handleHelpUsChange = (value, name) => {
        setFormErrors(initialState);

        let obj = { ...inputs }
        obj[name] = value
        setInputs((inputs) => ({ ...inputs, ...obj }));
        if (obj.study_mode && obj.study_attendance_type && obj.study_budget && obj.work_experince) {
            setStep(7);
        }

    }
    const handleEduChange = (e) => {
        const { name, value } = e.target;
        let list = [
            "ssc_passing_year",
            "hsc_passing_year",
            "ug_start_year",
            "ug_end_year",
            "pg_start_year",
            "pg_end_year",
            "pg_backlogs",
            "ug_backlogs",
        ];
        if (list.includes(name)) {
            const re = /^[0-9\b]+$/;
            if (value && !re.test(value)) {
                e.preventDefault();
                return;
            }
            if (value.length > 4) {
                return;
            }
        }

        if (name === "ssc_grade" ||
            name === "hsc_grade" ||
            name === "ug_grade" ||
            name === "pg_grade") {
            const re = /^\d{1,}(\.\d{0,3})?$/
            if (value && !re.test(value) || Number(value) > 100) {
                return;
            }
        }
        if (

            name === "ug_backlogs" ||
            name === "pg_backlogs"
        ) {
            const re = /\b(0|[1-9][0-9]?|100)\b/;
            if (value && !re.test(value)) {
                return;
            }
        }

        setEduParams((eduParams) => ({ ...eduParams, [name]: value }));
    };


    const handleEngProfChange = (e, i) => {
        const { value } = e.target;
        const eng_proficiency_test_list = [...examParams.eng_proficiency_test_list];
        const re = /^\d{1,}(\.\d{0,3})?$/
        if (value && !re.test(value)) {
            return;
        }
        eng_proficiency_test_list[i].value = value;
        setExamParams((examParams) => ({
            ...examParams,
            eng_proficiency_test_list: eng_proficiency_test_list,
        }));
    };

    const handleExamTestChange = (e, i, x) => {
        const { value } = e.target;
        const exam_sections = [...examParams.exam_sections];
        const re = /^\d{1,}(\.\d{0,3})?$/
        if (value && !re.test(value)) {
            return;
        }
        exam_sections[i].value = value;
        setExamParams((examParams) => ({
            ...examParams,
            exam_sections: exam_sections,
        }));
    };


    const handleExamChange = (e) => {
        const { name, value } = e.target;
        const re = /^\d{1,}(\.\d{0,3})?$/
        if (
            value &&
            !re.test(value) &&
            name !== "eng_prof_test" &&
            name !== "test_score" &&
            name != "exam_type"
        ) {
            return;
        }

        const object = { ...examParams }
        object[name] = value;

        if (e.target.name === "eng_prof_test") {
            let list = examMeta.eng_prof_test_list.find(x => x.name == value)
            if (list) {
                object['eng_proficiency_test_list'] = list.options.map((x) => {
                    return {
                        key:
                            x != "overall_score"
                                ? x.trim().toLowerCase().replace("(optional)", "")
                                : "Overall Score",
                        value: "",
                    };
                });
            }
        }

        if (name === "exam_type") {
            let list = examMeta.exam_list.find((x) => x.name == value)?.options || [];
            object['exam_sections'] = list.map((x) => {
                return {
                    key:
                        x != "overall_score"
                            ? x.trim().toLowerCase().replace("(optional)", "")
                            : "Overall Score",
                    value: "",
                };
            });
        }
        setExamParams((examParams) => ({
            ...examParams,
            ...object,
        }));

        if (name === 'eng_prof_test' || name === 'exam_type') {
            let arr = ['I wish to consider the tests but later!', 'I do not wish to consider the test for making applications**!']
            if (arr.includes(object.eng_prof_test) && arr.includes(object.exam_type)) {
                setStep(9);
            }
        }
    };

    const handleSubmit = () => {
        setOnSubmit(true);
        if (!inputs.accept_terms && !inputs.accept_terms_info) {
            toast.error("Please agree all terms & conditions.");
            return;
        }

        const rules = {
            email: "required|max:50|email",
            first_name: "required|max:30",
            last_name: "required|max:30",
            phone: "required|max:10|min:10",
        };
        const validation = new Validator(inputs, rules, {
            "required.phone": "Please enter phone number",
            "min.phone": "Phone number should be 10 digits",
            "max.phone": "Phone number should not be  greather then 10 digits",
        });

        if (validation.fails()) {
            const fieldErrors = {};
            Object.keys(validation.errors.errors).forEach((key) => {
                fieldErrors[key] = validation.errors.errors[key][0];
            });

            const err = Object.keys(fieldErrors);
            if (err.length) {
                const input = document.querySelector(`input[name=${err[0]}]`);
                if (input) {
                    input.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "start",
                    });
                }
            }
            setFormErrors(fieldErrors);
            return false;
        }
        let list = ["email", "phone", "first_name", "last_name"];
        for (let item of list) {
            if (!inputs[item]) {
                toast.error("Please Enter " + item);
                break;
            }
        }

        let obj = { ...inputs };
        obj["education_details"] = [
            {
                passing_year: eduParams.ssc_passing_year
                    ? moment(eduParams.ssc_passing_year).format("YYYY")
                    : "",
                medium: eduParams.ssc_medium,
                grade: eduParams.ssc_grade,
                type: "SSC",
                label: "Secondary school Certificate / 10th",
            },
            {
                passing_year: eduParams.hsc_passing_year
                    ? moment(eduParams.hsc_passing_year).format("YYYY")
                    : "",
                medium: eduParams.hsc_medium,
                grade: eduParams.hsc_grade,
                type: "HSC",
                label: "Higher Secondary school Certificate / 12th",
            },
            {
                medium: eduParams.ug_medium,
                start_year: eduParams.ug_start_year
                    ? moment(eduParams.ug_start_year).format("YYYY")
                    : "",
                end_year: eduParams.ug_end_year
                    ? moment(eduParams.ug_end_year).format("YYYY")
                    : "",
                grade: eduParams.ug_grade,
                type: eduParams.ug_type,
                label: "Under Graduation",
                ug_type: "",
                backlogs: eduParams.ug_backlogs,
            },
            {
                medium: eduParams.pg_medium,
                start_year: eduParams.pg_start_year
                    ? moment(eduParams.pg_start_year).format("YYYY")
                    : "",
                end_year: eduParams.pg_end_year
                    ? moment(eduParams.pg_end_year).format("YYYY")
                    : "",
                grade: eduParams.pg_grade,
                type: eduParams.pg_type,
                label: "Post Graduation",
                ug_type: eduParams.pg_type,
                backlogs: eduParams.pg_backlogs,
            },
        ];

        var object;
        if (examParams?.exam_sections.length > 0) {
            object = examParams?.exam_sections?.reduce(
                (obj, item) => Object.assign(obj, { [item.key.toLowerCase().replace(/ /g, "_")]: item.value }),
                {}
            );
        }

        var test_obj;
        if (examParams?.eng_proficiency_test_list.length > 0) {
            test_obj = examParams?.eng_proficiency_test_list?.reduce(
                (obj, item) => Object.assign(obj, { [item.key.toLowerCase().replace(/ /g, "_")]: item.value }),
                {}
            );
        }

        obj["asst_exam_sections"] = [
            {
                type: "exam",
                label: examParams.exam_type,
                ...object,
            },
            {
                type: "english_prof_test",
                label: examParams.eng_prof_test,
                ...test_obj
            },
        ];

        setLoading(true);
        axios
            .post(`${environment.API_BASE_URL}/contact-request`, obj)
            .then((res) => {
                setStep(10);
                setLoading(false);
                setInputs(initialState);
                setEduParams(eduIntParams);
                setExamParams(examInitParams);
            })
            .catch((err) => {
                setLoading(false);
                const { errors, message } = err.response.data;
                const erroMsg = errors[Object.keys(errors)[0]] || message;
                toast.error(erroMsg);
            });
    };

    const handleCheck = (e, key) => {
        let isChecked = e.target.checked;
        let obj = { ...inputs };
        if (obj) {
            obj[key] = isChecked;
        }
        obj["accept_terms"] =
            obj.agree_1 ? true : false;

        obj["accept_terms_info"] =
            obj.agree_2 ? true : false;

        setInputs({ ...inputs, ...obj });
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        let res = filterdData.study_industry.filter((item) => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        let items = JSON.parse(JSON.stringify(meta));
        items.study_industry = res;
        setMeta(items);
    };

    const handleSubIndustrySearch = (event) => {
        let res = meta.study_sub_industry.filter((item) => {
            return item.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setStudySubIndutries(res);
    };

    const handleStudySearch = (e) => {
        setStudySearch(e.target.value);
        getStudyAreaOnInputChange(inputs.industry_id, e.target.value);
    };
    function onSubIndustrySelect(item) {
        let arr = [...study_sub_industry];
        for (let data of arr) {
            data.checked = false;
            if (item.id === data.id) {
                data.checked = true;
            }
        }
        setStudySubIndutries(arr);
        getStudyArea(item.industry_id, item.id);
        setStep(6);
    }

    const backScience = () => {
        if (industryName.includes("Science")) {
            setStep(4);
        } else {
            setStep(6);
        }
    };

    return (
        <>
            <div className="App">
                {/* <Particles params={options} /> */}
                <div className='graduate-courses-section'>
                    <TopStrip topInfoText={topString} goBackStatus={true} />
                    <div className='hero_section'>
                        {/* <span className='hero_section__bg'></span> */}
                        <div className='hero_section__inner'>
                            <div className='container small-width'>

                                <section className="additional-services explore-service">

                                    <div className="vertical-tab ">
                                        <div className="vertical-tab-firstsection">
                                            {step === 10 ? (
                                                <></>
                                            ) : (
                                                <ul>
                                                    <li
                                                        className={`${step > 0 ? "left-menu-active" : ""} ${step == 1 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 1 ? "left-menu-active" : ""} ${step == 2 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 2 ? "left-menu-active" : ""} ${step == 3 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 3 ? "left-menu-active" : ""} ${step == 4 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 4 ? "left-menu-active" : ""} ${step == 5 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 5 ? "left-menu-active" : ""} ${step == 6 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 6 ? "left-menu-active" : ""} ${step == 7 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 7 ? "left-menu-active" : ""} ${step == 8 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 8 ? "left-menu-active" : ""} ${step == 9 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 9 ? "left-menu-active" : ""} ${step == 10 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                    <li
                                                        className={`${step > 10 ? "left-menu-active" : ""}${step == 11 ? "current" : ""
                                                            }`}
                                                    ></li>
                                                </ul>
                                            )}
                                        </div>
                                        {step == 1 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="w-full">
                                                                <h4 className="text-center">
                                                                    Where do you want to study?
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="country-sec">
                                                        <div
                                                            className="country-sec__inner"
                                                            id="StudyIndustry"
                                                        >
                                                            {meta.study_destination.map((x, i) => (
                                                                <div
                                                                    onClick={() => onStudyDestination(x)}
                                                                    key={uuid()}
                                                                    className={`student-contry-list study_destination ${x.checked ? "bg-lightRed" : ""
                                                                        }`}
                                                                >

                                                                    <div>
                                                                        <img
                                                                            src={x?.flag?.src}
                                                                            className="flag-img"
                                                                            alt={x.name}
                                                                            name="country_id"
                                                                        />

                                                                        <p className={`relative top-2 ${x.checked ? 'text-white' : 'text-[#1E417C]'} `}>{x.short_name}</p>
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 2 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="">
                                                                <div className="explore-step-header w-full">
                                                                    <button type="button" aria-label="Back" className="goback_btn controls-fb" onClick={() => setStep(1)}></button>
                                                                    <h4>Select study level</h4>
                                                                    <button type="button" aria-label="Next" className="goback_btn next_btn controls-fb" onClick={() => studyNext()}></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="vertical-tab-content-section w-full">
                                                        <div className="card-view ">
                                                            <div className="study-level">
                                                                <ul className="">
                                                                    {meta.type_of_degree_category.map((x) => (

                                                                            <li
                                                                                onClick={(e) => selectOrDeselect(x)}
                                                                                key={uuid()}
                                                                                className={`exploreList cursor-pointer ${x.checked ? "study-option-active" : ""
                                                                                    }`}
                                                                            >
                                                                                <a name="level">
                                                                                    {
                                                                                        x.name != 'DBA(Doctorate of Business Administration)' &&
                                                                                        x.name != 'PhD(Doctor of Philosophy)' &&
                                                                                        x.name
                                                                                    }
                                                                                    {x.name == 'DBA(Doctorate of Business Administration)' &&
                                                                                        <p>DBA <span className="text-xs md:text-sm">(Doctorate of Business Administration)</span> </p>
                                                                                    }
                                                                                    {x.name == 'PhD(Doctor of Philosophy)' &&
                                                                                        <p>PhD <span className="text-xs md:text-sm">(Doctor of Philosophy)</span> </p>
                                                                                    }
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                                <p className="text-center my-4 text-red">
                                                                    {errorMessage}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-tab-header">
                                                        {degreeType && degreeType.length > 0 ? (
                                                            <div className="vertical-tab-header-content">
                                                                {inputs.level === "Pre Masters" ||
                                                                    inputs.level === "Diploma" ||
                                                                    inputs.level === "Summer Programs" ||
                                                                    inputs.level ===
                                                                    "DBA(Doctorate of Business Administration)" ||
                                                                    inputs.level === "PhD(Doctor of Philosophy)" ? (
                                                                    ""
                                                                ) : (
                                                                    <div className="w-full">
                                                                        <h4 className="text-center">
                                                                            Select degree type
                                                                        </h4>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="vertical-tab-content-section">
                                                        <div className="card-view">
                                                            <div className="study-level">
                                                                <ul
                                                                    className={`${inputs.level == "Post Graduation"
                                                                        ? "custom-scroll-list"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    {degreeType &&
                                                                        degreeType?.map((x) => (
                                                                            <li
                                                                                onClick={(e) => selectTypeDegree(x)}
                                                                                key={uuid()}
                                                                                className={` exploreList cursor-pointer ${x.checked ? "study-option-active" : ""
                                                                                    }`}
                                                                            >
                                                                                <a name="type_of_degree">{x.name}</a>
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                                <p className="text-center my-4 text-red">
                                                                    {errorMessage}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm-view flex justify-between fixed-bottom px-4">
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 3 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(2)}></button>
                                                                    <h4>
                                                                        Select intake &amp; year
                                                                    </h4>

                                                                    {/* <img src={forwardArrow} alt="" className="block cursor-pointer" onClick={() => onIntakeSelect()} /> */}
                                                                    <button className="goback_btn next_btn controls-fb" onClick={() => {
                                                                        onIntakeSelect();
                                                                    }}>
                                                                        {/* <span className="reset_btn"></span>
                                                                            <span className="reset_txt">Reset</span> */}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="vertical-tab-content-section w-full">
                                                        <div className="card-view">
                                                            <div className="study-level">
                                                                <div className="study_intakes">
                                                                    <div className="w-full ">
                                                                        <SelectInput
                                                                            options={meta.intake_month}
                                                                            handleChange={handleSelectionChange}
                                                                            value={inputs.intake_month}
                                                                            label="Intake"
                                                                            name="intake_month"
                                                                            bgcolor="transparent"
                                                                            className="select_intake"
                                                                        />
                                                                    </div>
                                                                    <div className="w-full ">
                                                                        <SelectInput
                                                                            options={meta.intake_year}
                                                                            handleChange={handleSelectionChange}
                                                                            value={inputs.intake_year}
                                                                            label="Intake Year"
                                                                            name="intake_year"
                                                                            bgcolor="transparent"
                                                                            className="select_intake"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <p className="text-center my-4 text-red">
                                                                    {errorMessage}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {meta.study_durations &&
                                                        meta.study_durations.length &&
                                                        (inputs.level === "Post Graduation" ||
                                                            inputs.level === "Under Graduation") && (
                                                            <>
                                                                <div className="vertical-tab-header">
                                                                    <div className="vertical-tab-header-content">
                                                                        <div className="w-full">
                                                                            <h4>
                                                                                Study duration
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="vertical-tab-content-section w-full">
                                                                    <div className="card-view">
                                                                        <div className="study-level mt-2">
                                                                            <ul className="justify-center md:justify-start py-4 md:py-0">
                                                                                {meta.study_durations.map((x) => (
                                                                                    <li
                                                                                        onClick={(e) => onSelectDuration(x)}
                                                                                        key={uuid()}
                                                                                        className={`exploreList cursor-pointer ${x.checked ? "study-option-active" : ""
                                                                                            }`}
                                                                                    >
                                                                                        <a name="study_duration">{x.name}</a>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                            <p className="text-center my-4 text-red">
                                                                                {errorMessage}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 4 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(3)}></button>
                                                                    <h4>
                                                                        Select industry
                                                                    </h4>
                                                                    <button className="goback_btn next_btn controls-fb" onClick={industryNext}>
                                                                        {/* <span className="reset_btn"></span>
                                                                            <span className="reset_txt">Reset</span> */}
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="search-bar">
                                                        <SearchBar
                                                            placeholder="Search"
                                                            handleChange={handleSearch}
                                                            value={undefined}
                                                            name="search_key"
                                                        />
                                                    </div>

                                                    <div className="vertical-tab-content-section study_industry-sec">
                                                        <div className="card-view">
                                                            {meta?.study_industry?.map((x) => (
                                                                <div
                                                                    key={uuid()}
                                                                    onClick={() => onIndustrySelect(x)}
                                                                    className={`student-contry-list study-industry-list study-industry ${x.checked ? "bg-lightRed active" : "bg-boxbg"
                                                                        }`}
                                                                >
                                                                    <div
                                                                        className="text-sm inner-sec"
                                                                        dangerouslySetInnerHTML={{ __html: x.icon }}
                                                                    />
                                                                    <p> {x.name}</p>
                                                                </div>
                                                            ))}
                                                            {meta.study_industry && !meta.study_industry.length && (
                                                                <div className="no-matches">
                                                                    <p>No Match Results Found!</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        {/* {step == 5 ? (
                                                <>
                                                    <div className="vertical-tab-sec-col">
                                                        <div className="vertical-tab-header">
                                                            <div className="vertical-tab-header-content">
                                                                <div className="flex  w-full items-center justify-center">
                                                                    <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(4)}></button>
                                                                        <h4>
                                                                            Discover more...
                                                                        </h4>
                                                                        <img src={forwardArrow} alt="" className="block cursor-pointer" onClick={handleSubIndustrySelect} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-full p-2 md:pl-16 md:pr-7">
                                                            <SearchBar
                                                                placeholder="Search"
                                                                handleChange={handleSubIndustrySearch}
                                                                value={undefined}
                                                                name="search_key"
                                                            />
                                                        </div>

                                                        <div className="vertical-tab-content-section study_industry-sec">
                                                            {study_sub_industry.length && (
                                                                <div className="card-view grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap:0 space-x-2 md:space-x-0 justify-center md:ml-16 ">
                                                                    {study_sub_industry.map((x, i) => (
                                                                        <div
                                                                            key={uuid()}
                                                                            onClick={() => onSubIndustrySelect(x)}
                                                                            className={`student-contry-list study-industry-list cursor-pointer relative study-industry space-y-2 ${x.checked ? "bg-lightRed active" : "bg-boxbg"
                                                                                }`}
                                                                        >
                                                                            <div
                                                                                className="text-sm "
                                                                                dangerouslySetInnerHTML={{ __html: x.icon }}
                                                                            />

                                                                            <p
                                                                                className={`mt-0 md:mt-12 p-2 md:p-4 break ${x.checked ? "text-white" : "text-[#1e417c]"
                                                                                    }`}
                                                                            >
                                                                                {x.name}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            {!study_sub_industry.length > 0 && (
                                                                <div className="card-view grid grid-cols-1 justify-center md:ml-16 ">
                                                                    {<p>No Study Sub Industry Found!</p>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )} */}
                                        {step == 5 ? (
                                            <>
                                                <div className="vertical-tab-sec-col ">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(4)}></button>
                                                                    <h4>
                                                                        Select study area
                                                                    </h4>
                                                                    <button className="goback_btn next_btn controls-fb" onClick={onLevelSelect}>
                                                                        {/* <span className="reset_btn"></span>
                                                                            <span className="reset_txt">Reset</span> */}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-tab-content-section">
                                                        <div className="card-view">
                                                            <div className="choose-study-area">
                                                                <div className="search-bar">
                                                                    <SearchBar
                                                                        placeholder="Search"
                                                                        handleChange={handleSubIndustrySearch}
                                                                        name="search_key"
                                                                        value={undefined}
                                                                        label="hello"
                                                                    />
                                                                </div>

                                                                <div className="study-level study-level-sec">
                                                                    <ul>
                                                                        {study_area_list.map((x) => (
                                                                            <li
                                                                                onClick={(e) => onstudyAreaSelect(x)}
                                                                                key={uuid()}
                                                                                className={`  exploreList cursor-pointer w-full items-baseline study-area-list ${x.checked ? "study-option-active" : ""
                                                                                    }`}
                                                                            >
                                                                                <a name="study_area_id break">{x.name}</a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 6 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(5)}></button>
                                                                    <h4>
                                                                        A few more details
                                                                    </h4>
                                                                    <button className="goback_btn next_btn controls-fb" onClick={onExtraDetailsStep}>
                                                                        {/* <span className="reset_btn"></span>
                                                                            <span className="reset_txt">Reset</span> */}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="vertical-tab-content-section">
                                                        <div className="card-view">
                                                            <div className="help-us mx-5">
                                                                <h5>Study format</h5>
                                                                <ul className="">
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange("Full Time", "study_mode")
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_mode === "Full Time"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Full Time</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange("Part Time", "study_mode")
                                                                        }
                                                                        className={` cursor-pointer exploreList ${inputs.study_mode === "Part Time"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Part Time</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="help-us">
                                                                <h5>Attendance type</h5>
                                                                <ul className=" ">
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "On Campus",
                                                                                "study_attendance_type"
                                                                            )
                                                                        }
                                                                        className={` cursor-pointer exploreList ${inputs.study_attendance_type === "On Campus"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>On Campus</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Online Learning",
                                                                                "study_attendance_type"
                                                                            )
                                                                        }
                                                                        className={` cursor-pointer exploreList ${inputs.study_attendance_type ===
                                                                            "Online Learning"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Online Learning</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Blended Learning",
                                                                                "study_attendance_type"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_attendance_type ===
                                                                            "Blended Learning"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Blended Learning</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Executive Programs",
                                                                                "study_attendance_type"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_attendance_type ===
                                                                            "Executive Programs"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Executive Programs</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Joint Programs",
                                                                                "study_attendance_type"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_attendance_type ===
                                                                            "Joint Programs"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Joint Programs</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="help-us p-0 md:px-5">
                                                                <h5>Study budget</h5>
                                                                <ul className="py-2 md:py-3">
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "£ 15,000 - £ 20,000",
                                                                                "study_budget"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_budget === "£ 15,000 - £ 20,000"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>£ 15,000 - £ 20,000</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "£ 20,000 - £ 25,000",
                                                                                "study_budget"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer  exploreList ${inputs.study_budget === "£ 20,000 - £ 25,000"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>£ 20,000 - £ 25,000</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange("£ 25,000+", "study_budget")
                                                                        }
                                                                        className={` cursor-pointer exploreList ${inputs.study_budget === "£ 25,000+"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>£ 25,000+</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="help-us p-0 md:px-5">
                                                                <h5>Work experience</h5>
                                                                <ul className=" py-2 md:py-3">
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Less than 3 Years",
                                                                                "work_experince"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer exploreList ${inputs.work_experince === "Less than 3 Years"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Less than 3 Years</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange(
                                                                                "Less than 5 Years",
                                                                                "work_experince"
                                                                            )
                                                                        }
                                                                        className={`cursor-pointer exploreList ${inputs.work_experince === "Less than 5 Years"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>Less than 5 Years</a>
                                                                    </li>
                                                                    <li
                                                                        onClick={() =>
                                                                            handleHelpUsChange("5+ Years", "work_experince")
                                                                        }
                                                                        className={` cursor-pointer exploreList ${inputs.work_experince === "5+ Years"
                                                                            ? "help-us-active"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <a>5+ Years</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 7 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(6)}></button>
                                                                    <h4>
                                                                        Academic details
                                                                    </h4>
                                                                    <button className="goback_btn next_btn controls-fb" onClick={onEducationDetails}>
                                                                        {/* <span className="reset_btn"></span>
                                                                            <span className="reset_txt">Reset</span> */}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="vertical-tab-content-section">
                                                        <h5>10th / Secondary school</h5>

                                                        <div className="flex-parent">
                                                            <div className="flex-parent__item year-input-field">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ssc_passing_year"
                                                                    label="Year"
                                                                    value={eduParams.ssc_passing_year}
                                                                    handleChange={handleEduChange}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                    type="tel"
                                                                    inputMode="numeric"
                                                                    maxLength={4}
                                                                />
                                                            </div>
                                                            <div className="flex-parent__item">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ssc_grade"
                                                                    label="Enter the Achieved Grade"
                                                                    value={eduParams.ssc_grade}
                                                                    handleChange={handleEduChange}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>

                                                            <div className="flex-parent__item">
                                                                <SelectInput
                                                                    options={grade}
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.ssc_medium}
                                                                    label="Medium"
                                                                    name="ssc_medium"
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="vertical-tab-content-section">
                                                        <h5>12th / Higher secondary</h5>

                                                        <div className="flex-parent">
                                                            <div className="flex-parent__item year-input-field">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="hsc_passing_year"
                                                                    label="Year"
                                                                    value={eduParams.hsc_passing_year}
                                                                    handleChange={handleEduChange}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                    type="tel"
                                                                    inputMode="numeric"
                                                                    maxLength={4}
                                                                />
                                                            </div>
                                                            <div className="flex-parent__item">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="hsc_grade"
                                                                    label="Enter the Achieved Grade"
                                                                    value={eduParams.hsc_grade}
                                                                    handleChange={handleEduChange}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>


                                                            <div className="flex-parent__item">
                                                                <SelectInput
                                                                    options={grade}
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.hsc_medium}
                                                                    label="Medium"
                                                                    name="hsc_medium"
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="vertical-tab-content-section">
                                                        <div>
                                                            <h5 onClick={() => toogleAccordian("ug_toggle")} className={`w-full edu-accordion  accordian-toogle relative text-center mb-2 lg:text-left text-[#C41230] text-sm md:text-[16px] ${toogleState.ug_toggle ? 'open' : ''}`}>
                                                                <p>
                                                                    Under Graduation
                                                                </p>

                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.71 15.54L18.36 9.88C18.4537 9.78703 18.5281 9.67643 18.5789 9.55457C18.6296 9.43271 18.6558 9.30201 18.6558 9.17C18.6558 9.03799 18.6296 8.90728 18.5789 8.78542C18.5281 8.66356 18.4537 8.55296 18.36 8.46C18.1726 8.27375 17.9191 8.1692 17.655 8.1692C17.3908 8.1692 17.1373 8.27375 16.95 8.46L11.95 13.41L6.99996 8.46C6.8126 8.27375 6.55915 8.1692 6.29496 8.1692C6.03078 8.1692 5.77733 8.27375 5.58996 8.46C5.49548 8.55261 5.42031 8.66306 5.36881 8.78493C5.31731 8.90681 5.29051 9.03769 5.28996 9.17C5.29051 9.3023 5.31731 9.43319 5.36881 9.55506C5.42031 9.67694 5.49548 9.78738 5.58996 9.88L11.24 15.54C11.3336 15.6415 11.4473 15.7225 11.5738 15.7779C11.7003 15.8333 11.8369 15.8619 11.975 15.8619C12.1131 15.8619 12.2497 15.8333 12.3762 15.7779C12.5027 15.7225 12.6163 15.6415 12.71 15.54V15.54Z" fill="#C41230" />
                                                                </svg>
                                                            </h5>
                                                        </div>

                                                        <div className={`flex-parent  ${toogleState.ug_toggle ? 'block' : 'hide'}`}>


                                                            <SelectInput
                                                                options={[
                                                                    {
                                                                        name: "BE/B.Tech- Bachelor of Technology",
                                                                    },
                                                                    {
                                                                        name: "B.Arch- Bachelor of Architecture",
                                                                    },
                                                                    {
                                                                        name: "BBA - Bachelor of Business Administration"
                                                                    },
                                                                    {
                                                                        name: "BCom - Bachelor of Commerce"
                                                                    },
                                                                    {
                                                                        name: "BCA- Bachelor of Computer Applications",
                                                                    },
                                                                    {
                                                                        name: "B.Sc.- Information Technology",
                                                                    },
                                                                    {
                                                                        name: "BPharma- Bachelor of Pharmacy",
                                                                    },
                                                                    {
                                                                        name: "B.Sc- Interior Design",
                                                                    },
                                                                    {
                                                                        name: "BDS- Bachelor of Dental Surgery",
                                                                    },
                                                                    {
                                                                        name: "B.Sc. Mathematics",
                                                                    },
                                                                    {
                                                                        name: "B.Sc. Chemistry",
                                                                    },
                                                                    {
                                                                        name: "Others",
                                                                    },
                                                                ]}
                                                                handleChange={handleEduChange}
                                                                value={eduParams.ug_type}
                                                                label="Choose the Type of Degree"
                                                                name="ug_type"
                                                                width="w-full"
                                                            />


                                                            <SelectInput
                                                                options={grade}
                                                                handleChange={handleEduChange}
                                                                value={eduParams.ug_medium}
                                                                label="Medium"
                                                                name="ug_medium"
                                                                width="w-full"
                                                            />



                                                            <div className="year-input-field">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ug_start_year"
                                                                    label="Start"
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.ug_start_year}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                    type="tel"
                                                                    inputMode="numeric"
                                                                    maxLength={4}
                                                                />
                                                            </div>
                                                            <div className="year-input-field">
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ug_end_year"
                                                                    label="End"
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.ug_end_year}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                    type="tel"
                                                                    inputMode="numeric"
                                                                    maxLength={4}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ug_grade"
                                                                    label="Enter Achieved Grade"
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.ug_grade}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Input
                                                                    disabled={false}
                                                                    readOnly={false}
                                                                    name="ug_backlogs"
                                                                    label="Enter total Backlogs"
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.ug_backlogs}
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="vertical-tab-content-section">
                                                        <h5 onClick={() => toogleAccordian("pg_toggle")} className={`w-full edu-accordion accordian-toogle relative text-center mb-2 lg:text-left text-[#C41230] text-sm md:text-[16px] ${toogleState.pg_toggle ? 'open' : ''}`}>
                                                            <p> Post Graduation</p>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.71 15.54L18.36 9.88C18.4537 9.78703 18.5281 9.67643 18.5789 9.55457C18.6296 9.43271 18.6558 9.30201 18.6558 9.17C18.6558 9.03799 18.6296 8.90728 18.5789 8.78542C18.5281 8.66356 18.4537 8.55296 18.36 8.46C18.1726 8.27375 17.9191 8.1692 17.655 8.1692C17.3908 8.1692 17.1373 8.27375 16.95 8.46L11.95 13.41L6.99996 8.46C6.8126 8.27375 6.55915 8.1692 6.29496 8.1692C6.03078 8.1692 5.77733 8.27375 5.58996 8.46C5.49548 8.55261 5.42031 8.66306 5.36881 8.78493C5.31731 8.90681 5.29051 9.03769 5.28996 9.17C5.29051 9.3023 5.31731 9.43319 5.36881 9.55506C5.42031 9.67694 5.49548 9.78738 5.58996 9.88L11.24 15.54C11.3336 15.6415 11.4473 15.7225 11.5738 15.7779C11.7003 15.8333 11.8369 15.8619 11.975 15.8619C12.1131 15.8619 12.2497 15.8333 12.3762 15.7779C12.5027 15.7225 12.6163 15.6415 12.71 15.54V15.54Z" fill="#C41230" />
                                                            </svg>
                                                        </h5>
                                                        <div className={`${toogleState.pg_toggle ? 'block' : 'hide'}`}>
                                                            <div className="flex-parent">

                                                                <SelectInput
                                                                    options={[
                                                                        {
                                                                            name: "M.Tech",
                                                                        },
                                                                        {
                                                                            name: "MBA",
                                                                        },
                                                                        {
                                                                            name: "MCA",
                                                                        },
                                                                        {
                                                                            name: "MS",
                                                                        },
                                                                        {
                                                                            name: "BRS",
                                                                        },
                                                                        {
                                                                            name: "Others",
                                                                        },
                                                                    ]}
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.pg_type}
                                                                    label="Choose the Type of Degree"
                                                                    name="pg_type"
                                                                    bgcolor="#fff"
                                                                    width="w-full"
                                                                />

                                                                <SelectInput
                                                                    options={grade}
                                                                    handleChange={handleEduChange}
                                                                    value={eduParams.pg_medium}
                                                                    label="Medium"
                                                                    name="pg_medium"
                                                                    width="w-full"
                                                                    bgcolor="#fff"
                                                                />

                                                                <div className="year-input-field">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="pg_start_year"
                                                                        handleChange={handleEduChange}
                                                                        value={eduParams.pg_start_year}
                                                                        label="Start"
                                                                        width="w-full"
                                                                        type="tel"
                                                                        inputMode="numeric"
                                                                        maxLength={4}
                                                                        bgcolor="#fff"
                                                                    />
                                                                </div>
                                                                <div className="year-input-field">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="pg_end_year"
                                                                        handleChange={handleEduChange}
                                                                        value={eduParams.pg_end_year}
                                                                        label="End"
                                                                        width="w-full"
                                                                        type="tel"
                                                                        inputMode="numeric"
                                                                        maxLength={4}
                                                                        bgcolor="#fff"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="pg_grade"
                                                                        handleChange={handleEduChange}
                                                                        value={eduParams.pg_grade}
                                                                        label="Enter Achieved Grade"
                                                                        width="w-full"
                                                                        type="text"
                                                                        bgcolor="#fff"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="pg_backlogs"
                                                                        label="Enter total Backlogs"
                                                                        handleChange={handleEduChange}
                                                                        value={eduParams.pg_backlogs}
                                                                        bgcolor="#fff"
                                                                        width="w-full"
                                                                        type="text"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 8 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="flex  w-full items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button className="goback_btn controls-fb" onClick={() => setStep(7)}></button>
                                                                    <h4>
                                                                        Test scores (optional)
                                                                    </h4>
                                                                    <button className="goback_btn next_btn controls-fb" onClick={onTest}></button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="marginT40">

                                                            <SelectInput
                                                                options={examParams.exam_list}
                                                                handleChange={handleExamChange}
                                                                value={examParams.exam_type}
                                                                // label={`${inputs.level === "Under Graduation"
                                                                //     ? "Choose Pre SAT/SAT/ACT"
                                                                //     : "Choose GRE/GMAT"
                                                                //     } `}
                                                                label={'Choose Adaptive Test'}
                                                                name="exam_type"
                                                                bgcolor="transparent"
                                                                width="w-full"
                                                            />


                                                            {examParams.exam_type && (

                                                                <div className="flex-parent">
                                                                    {examParams.exam_sections &&
                                                                        examParams.exam_sections.map((x, index) => (

                                                                            <Input
                                                                                disabled={false}
                                                                                readOnly={false}
                                                                                name="test_reading"
                                                                                label={capitalize(x.key)}
                                                                                value={x.value}
                                                                                handleChange={(e) =>
                                                                                    handleExamTestChange(e, index, x)
                                                                                }
                                                                                bgcolor="#fff"
                                                                                width="w-full"
                                                                            />

                                                                        ))}
                                                                </div>

                                                            )}

                                                            <div
                                                                className={`marginT30 ${!examParams.eng_prof_test ||
                                                                    !examParams.eng_proficiency_test_list?.length
                                                                    ? "mb-6"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                <SelectInput
                                                                    options={examMeta.eng_prof_test_list}
                                                                    handleChange={handleExamChange}
                                                                    value={examParams.eng_prof_test}
                                                                    label="Choose English Language Test"
                                                                    name="eng_prof_test"
                                                                    width="w-full"
                                                                />
                                                            </div>

                                                            {examParams.eng_prof_test && (

                                                                <div className="flex-parent">
                                                                    {examParams.eng_proficiency_test_list &&
                                                                        examParams.eng_proficiency_test_list.map((x, index) => (
                                                                            <div >
                                                                                <Input
                                                                                    disabled={false}
                                                                                    readOnly={false}
                                                                                    name="test_reading"
                                                                                    label={capitalize(x.key)}
                                                                                    value={x.value}
                                                                                    handleChange={(e) =>
                                                                                        handleEngProfChange(e, index)
                                                                                    }
                                                                                    bgcolor="#fff"
                                                                                    width="w-full"
                                                                                />
                                                                            </div>
                                                                        ))}

                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 9 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content">
                                                            <div className="items-center justify-center">
                                                                <div className="explore-step-header w-full">
                                                                    <button type="button" aria-label="Back" className="goback_btn controls-fb" onClick={() => setStep(8)}></button>
                                                                    <h4>Your contact details</h4>
                                                                    <span className="explore-nav-spacer" aria-hidden="true" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="subText">We&apos;ll reach out with programmes matched to your preferences.</p>
                                                    </div>
                                                    <div className="vertical-tab-content-section marginT40">
                                                        <div className="card-view">
                                                            <div className="flex-parent card-view__inner">
                                                                <div className="flex-parent__item50">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="first_name"
                                                                        label="First Name"
                                                                        value={inputs.first_name}
                                                                        handleChange={handleInputChange}
                                                                        bgcolor="#fff"
                                                                        width="w-full"
                                                                        error={formErrors.first_name}
                                                                    />
                                                                    {formErrors.first_name ? (
                                                                        <p className="text-xs text-red">
                                                                            {formErrors.first_name}
                                                                        </p>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                                <div className="flex-parent__item50">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="last_name"
                                                                        label="Last Name"
                                                                        value={inputs.last_name}
                                                                        handleChange={handleInputChange}
                                                                        bgcolor="#fff"
                                                                        width="w-full"
                                                                        error={formErrors.last_name}
                                                                    />
                                                                    {formErrors.last_name ? (
                                                                        <p className="text-xs text-red">
                                                                            {formErrors.last_name}
                                                                        </p>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                                <div className="flex-parent__item50">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="phone"
                                                                        label="Phone Number"
                                                                        value={inputs.phone}
                                                                        handleChange={handleInputChange}
                                                                        bgcolor="#fff"
                                                                        width="w-full"
                                                                        error={formErrors.phone}
                                                                    />
                                                                    {formErrors.phone ? (
                                                                        <p className="text-xs text-red">
                                                                            {formErrors.phone}
                                                                        </p>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                                <div className="flex-parent__item50">
                                                                    <Input
                                                                        disabled={false}
                                                                        readOnly={false}
                                                                        name="email"
                                                                        label="Email"
                                                                        value={inputs.email}
                                                                        handleChange={handleInputChange}
                                                                        bgcolor="#fff"
                                                                        width="w-full"
                                                                        error={formErrors.email}
                                                                    />
                                                                    {formErrors.email ? (
                                                                        <p className="text-xs text-red">
                                                                            {formErrors.email}
                                                                        </p>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col justify-between mt-5 w-full">

                                                                <div className="flex-parent flex-start">
                                                                    <CustomCheckbox
                                                                        handleCheck={(e) => handleCheck(e, "agree_2")}
                                                                        ischecked={inputs.agree_2}
                                                                        name="agree_2"
                                                                        label={undefined}
                                                                    />
                                                                    <p className="subText length95">
                                                                        Receive monthly emails right to your inbox with programmes that match your individual profile as well as useful information to plan your study abroad journey.
                                                                    </p>
                                                                </div>
                                                                <div className="flex-parent flex-start">
                                                                    <CustomCheckbox
                                                                        handleCheck={(e) => handleCheck(e, "agree_1")}
                                                                        ischecked={inputs.agree_1}
                                                                        name="agree_1"
                                                                        label={undefined}
                                                                    />
                                                                    <p className="subText length95">
                                                                        By registering, you agree to our <a href="/privacy-policy">Privacy Statement</a> and <a href="/terms-conditions">Terms and Conditions.</a>
                                                                    </p>
                                                                </div>

                                                                <div>

                                                                </div>
                                                                {onSubmit && !inputs.accept_terms && !inputs.accept_terms_info ? (
                                                                    <p className="text-red ml-12">
                                                                        Please select above term and conditions
                                                                    </p>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                            <div className="btn-controls">
                                                                {loading ? (
                                                                    <button disabled className="submit-btn">
                                                                        Loading...
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={handleSubmit}
                                                                        className="submit-btn btn"
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}

                                        {step == 10 ? (
                                            <>
                                                <div className="vertical-tab-sec-col">
                                                    <div className="vertical-tab-header">
                                                        <div className="vertical-tab-header-content final-head">
                                                            <div className="m-auto pt-2">
                                                                <h4 className="text-lg success-head"> Thankyou..! </h4>
                                                            </div>
                                                        </div>
                                                        <div className="submit-form marginT20 text-center">
                                                            <p className="subText">
                                                                Thank you for letting us know your interest and Your expert / study abroad partner will connect you at the earliest possible.
                                                            </p>

                                                            <p className="subText marginT20">
                                                                We are FULLY DIGITAL and focusing for truest global student recruitment.
                                                            </p>
                                                            <p className="text-center marginT30 backBtn" onClick={() => navigate.push("/")}>Back to Home</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </section>
                            </div>
                        </div></div></div>
            </div>
            <div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Explore;
