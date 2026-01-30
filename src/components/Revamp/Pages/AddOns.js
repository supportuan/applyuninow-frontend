import React, { useState, useEffect } from 'react'
import TopStrip from '../Common/TopStrip';
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { environment } from "../../../environments/environment";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import Validator from "validatorjs";
import { toast } from "react-toastify";
import Image from 'next/image';
import uploadIcon from '../../../Images/rev/upload_icon.svg';
import { TextareaAutosize } from '@mui/material';
import { usePageContext } from '../context/PageContext';

const servicesList = [
    {
        name: "Pre-Departure",
        checked: false,
    },
    {
        name: "Forex Exchange",
        checked: false,
    },
    {
        name: "Destination - Arrival pickup",
        checked: false,
    },
    {
        name: "Internship (in-line to Subject area)",
        checked: false,
    },
    {
        name: "On - Arrival registrations",
        checked: false,
    },
    {
        name: "Part-time jobs (in-line to academics / work experience)",
        checked: false,
    },
    {
        name: "Accommodation",
        checked: false,
    },
    {
        name: "Resume / CV marketing for Professional jobs",
        checked: false,
    },
];
const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    dob: null,
    gender: "",
    passport_no: "",
    present_status: "",
    selected_service: "",
    country_id: "",
    notes: "",
    images: [
        {
            label: "Upload CV",
            url: "",
            file: "",
        },
    ],
};

const AddOns = () => {
    const topString = 'Add-ONs';
    const [step, setStep] = useState(1);
    const [services, setServicesList] = useState(servicesList);
    const [formErrors, setFormErrors] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState({
        study_destination: [],
    });
    const { prerequisiteData, isPrerequisiteLoaded } = usePageContext();

    const addMoreDoc = () => {
        const images = [...inputs.images];
        images.push({
            label: "Other Document",
            url: "",
            preview: "",
            file: "",
        });
        setInputs({ ...inputs, images });
    };
    const handleUploadChange = (e, index) => {
        const file = e.target.files[0];

        if (index === 0 && file.type != 'application/pdf') {
            toast.error("Unsupported file selected, Only pdf allowed!.", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }
        if (!['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
            toast.error("Unsupported file selected!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;
        }
        if (file.type === 'image/jfif') {
            alert('JIFF files are not supported.');
            e.target.files = null;
            setInputs(initialState)
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('file size must be less than 5 mb')
        } else {
            const images = [...inputs.images];
            images[index] = {
                label: images[index].label,
                file_name: file.name,
                file: file,
            };
            setInputs({ ...inputs, images });
        }

    };

    function chooseFile(i) {
        let ele = document.getElementById("inputFile" + i);
        if (ele) ele.click();
    }

    function deleteFile(index) {
        const images = [...inputs.images];
        images[index].file_name = "";
        images[index].file = "";
        setInputs({ ...inputs, images });
    }

    function handleChange(e) {
        setFormErrors(initialState)
        setMessage("");
        setErrorMessage("");
        let { name, value } = e.target;
        if (name === "phone" || name === "alternate_phone") {
            const re = /^[0-9\b]+$/;
            if (e.target.value && !re.test(e.target.value)) {
                return;
            }
        }
        if (name === 'passport_no') {
            const re = /[^a-zA-Z0-9]/
            if (e.target.value && re.test(e.target.value)) {
                return;
            }
        }
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleDateChange(e) {
        setMessage("");
        setErrorMessage("");
        setInputs((inputs) => ({ ...inputs, dob: moment(e).format("YYYY-MM-DD") }));
    }

    const handleSelectionChange = (value, name) => {
        setMessage("");
        setErrorMessage("");
        setInputs((inputs) => ({ ...inputs, [name]: value ? String(value.label) : '' }));
    };

    const selectOrDeselect = (item) => {
        let list = services.slice(0);
        let index = list.findIndex((x) => x.name === item.name);
        if (index !== -1) {
            list[index].checked = item.checked ? false : true;
        }
        setServicesList(list);
        setErrorMessage("");
    }

    const openNextOrPrev = () => {
        if (services.some((x) => x.checked)) {
            setStep(2);
        } else {
            setErrorMessage("Please Select Atleast one service!");
        }

        if (step === 2) {
            setStep(1);
            setFormErrors(initialState)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setErrorMessage("");

        const rules = {
            email: "required|max:50|email",
            first_name: "required|max:30",
            last_name: "required|max:30",
            phone: "required|max:10|min:10",
            alternate_phone: "max:10|min:10",
            country_id: 'required',
            passport_no: 'max:12',
            present_status: 'required',
            gender: 'required',
            dob: 'required',
            notes: 'required',

        };
        const validation = new Validator(inputs, rules);

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
                toast("Please Enter all details");
                break;
            }
        }

        let requiredKeys = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "dob",
            "gender",
            "present_status",
            "country_id",
        ];
        let fields = ["alternate_phone", "passport_no", "notes"];
        let valid = requiredKeys.every((x) => inputs[x]);

        if (valid) {
            const formData = new FormData();
            let payloadFields = [...fields, ...requiredKeys];
            for (let item of payloadFields) {
                if (["country_id", "images"].includes(item)) continue;
                formData.append(item, inputs[item]);
            }
            formData.append(
                "selected_service",
                services
                    .filter((x) => x.checked)
                    .map((x) => x.name)
                    .toString()
            );
            const files = inputs.images.filter((x) => x.file);
            if (files.length) {
                const labels = files.map((x) => x.label);
                for (let i = 0; i < files.length; i++) {
                    formData.append("images", files[i].file);
                }

                formData.append("labels", JSON.stringify(labels));
            }
            let study_destination = (data?.study_destination || []).find(
                (x) => x.name === inputs.country_id
            );
            formData.append("country_id", study_destination.id);

            setLoading(true);
            axios
                .post(`${environment.API_BASE_URL}/additional-services`, formData)
                .then((response) => {
                    setLoading(false);
                    setMessage(response.data.data.message);
                    setInputs(initialState);
                    setSubmitted(false);
                })
                .catch((error) => {
                    setLoading(false);
                    const { errors } = error.response.data;
                    const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
                    setErrorMessage(erroMsg);
                });
        } else {
            setErrorMessage("Please fill all required fields");
        }
    }

    useEffect(() => {
        if(isPrerequisiteLoaded && prerequisiteData?.data){
            setData({
                study_destination: prerequisiteData.data.study_destination || [],
            });
        }
    }, [isPrerequisiteLoaded, prerequisiteData]);

    const onPaste = (e) => {
        var ranges = [
            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])', // U+1F680 to U+1F6FF
        ]

        if (e.clipboardData.getData('text/plain').match(ranges.join('|'))) {
            e.preventDefault()
            return false
        }
    }

    const onkeydownEvent = (e) => {
        var ranges = [
            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])', // U+1F680 to U+1F6FF
        ]
        if (e.target.value && e.target.value.match(ranges.join('|'))) {
            e.preventDefault()
            return false
        }
        handleChange(e)
    }

    return (
        <div className='additional-services-section'>
            <TopStrip topInfoText={topString} goBackStatus={true} />
            <div className='hero_section'>
                {/* <span className='hero_section__bg'></span> */}

                <div className='hero_section__inner'>
                    <div className='container small-width'>
                    <p className="text-center error-msg marginT10">
                            {errorMessage}
                        </p>
                        <div className='additional-services-section__heading'>
                            <div className='page_head'>
                                <h2 className='title'>Additional Services</h2>
                                <p className='desc'>Please select the appropriate options available for your onward journey</p>
                            </div>
                            {step === 1 ? (
                                <div className='next move_dir desktop-view' onClick={openNextOrPrev}>Next &#8594;</div>
                            ) : (
                                <div className='previous move_dir desktop-view' onClick={openNextOrPrev}>&#8592; Previous</div>
                            )}
                        </div>
                        <div className='additional-services-section__formContent'>
                            {step === 1 ? (
                                <>

                                    <div className="card-view">

                                        <ul>
                                            {services.map((x, index) => (
                                                <li
                                                    onClick={(e) => selectOrDeselect(x)}
                                                    key={'services_' + index}
                                                    className={` cursor-pointer ${x.checked ? "study-option-active" : ""
                                                        }`}
                                                >
                                                    <a>{x.name}</a>
                                                </li>
                                            ))}
                                        </ul>
                                        

                                    </div>

                                </>
                            ) : (
                                <div className="addons_form_details">
                                    <form
                                        name="form"
                                        onSubmit={handleSubmit}
                                        className="addons_form_details__inner"
                                    >

                                        <div className="col_left">
                                            <div className="form-section">
                                                <div className='form-elmn'>
                                                    <TextField
                                                        autoComplete="off"
                                                        type="text"
                                                        className={
                                                            "mb-6 " +
                                                            (submitted && !inputs.first_name
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        fullWidth
                                                        maxLength={10}
                                                        value={inputs.first_name}
                                                        name="first_name"
                                                        onPaste={onPaste}
                                                        onChange={(e) => onkeydownEvent(e)}
                                                        // sx={inputStyles()}
                                                        variant="standard"
                                                        hiddenLabel="true"
                                                        error={submitted && !inputs.first_name}
                                                        placeholder="First Name"
                                                    />
                                                    {formErrors.first_name ? (
                                                        <p className="text-xs text-red">
                                                            {formErrors.first_name}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                <div className='form-elmn'>
                                                    <TextField
                                                        autoComplete="off"
                                                        type="text"
                                                        value={inputs.last_name}
                                                        name="last_name"
                                                        className={
                                                            "mb-6" +
                                                            (submitted && !inputs.last_name
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                        fullWidth
                                                        onPaste={onPaste}
                                                        onChange={(e) => onkeydownEvent(e)}
                                                        // sx={inputStyles()}
                                                        variant="standard"
                                                        hiddenLabel="true"
                                                        error={submitted && !inputs.last_name}
                                                        placeholder="Last Name"
                                                    />
                                                    {formErrors.last_name ? (
                                                        <p className="text-xs text-red">
                                                            {formErrors.last_name}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>

                                            <div className='form-elmn'>
                                                <TextField
                                                    autoComplete="off"
                                                    type="text"
                                                    className={
                                                        "custom-input-field" +
                                                        (submitted && !inputs.phone ? " is-invalid" : "")
                                                    }
                                                    fullWidth
                                                    maxLength={10}
                                                    value={inputs.phone}
                                                    name="phone"
                                                    onPaste={onPaste}
                                                    onChange={(e) => onkeydownEvent(e)}
                                                    // sx={inputStyles()}
                                                    variant="standard"
                                                    hiddenLabel="true"
                                                    placeholder="Mobile Number*"
                                                    error={submitted && !inputs.phone}
                                                />
                                                {formErrors.phone ? (
                                                    <p className="text-xs text-red">
                                                        {formErrors.phone}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className='form-elmn'>
                                                <TextField
                                                    autoComplete="off"
                                                    type="text"
                                                    className={
                                                        "custom-input-field" +
                                                        (submitted && !inputs.alternate_phone
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                    fullWidth
                                                    maxLength={10}
                                                    value={inputs.alternate_phone}
                                                    name="alternate_phone"
                                                    onPaste={onPaste}
                                                    onChange={(e) => onkeydownEvent(e)}
                                                    // sx={inputStyles()}
                                                    variant="standard"
                                                    hiddenLabel="true"
                                                    placeholder="Alternate Mobile Number"
                                                />
                                                {formErrors.alternate_phone ? (
                                                    <p className="text-xs text-red">
                                                        {formErrors.alternate_phone}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className='form-elmn'>
                                                <TextField
                                                    autoComplete="off"
                                                    type="email"
                                                    value={inputs.email}
                                                    name="email"
                                                    className={
                                                        "custom-input-field" +
                                                        (submitted && !inputs.email ? " is-invalid" : "")
                                                    }
                                                    fullWidth
                                                    onPaste={onPaste}
                                                    onChange={(e) => onkeydownEvent(e)}
                                                    // sx={inputStyles()}
                                                    variant="standard"
                                                    hiddenLabel="true"
                                                    placeholder="Email*"
                                                    error={submitted && !inputs.email}
                                                />
                                                {formErrors.email ? (
                                                    <p className="text-xs text-red">
                                                        {formErrors.email}
                                                    </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>

                                            <div className="form-section">
                                                <div className='form-elmn'>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <DatePicker
                                                            inputFormat="dd-MM-yyyy"
                                                            //sx={dateInputStyles()}
                                                            hiddenLabel="true"
                                                            value={inputs.dob}
                                                            error={submitted && formErrors.dob}
                                                            maxDate={new Date()}
                                                            name="dob"
                                                            onChange={handleDateChange}
                                                            renderInput={(params, inputProps) => (
                                                                <>
                                                                    <TextField
                                                                        inputProps={{ readOnly: true, autoComplete: 'off' }}
                                                                        onKeyDown={(e) => { e.preventDefault() }}
                                                                        error={submitted && formErrors.dob}
                                                                        placeholder="DOB"
                                                                        {...params}
                                                                        // sx={inputStyles()}
                                                                        disableMaskedInput={true}
                                                                        variant="standard"
                                                                    />
                                                                </>
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                    {formErrors.dob ? <p className="text-red text-xs">{formErrors.dob}</p> : ''}

                                                </div>
                                                <div className='form-elmn'>
                                                    <Autocomplete
                                                        className="w-[50%]"
                                                        disablePortal
                                                        // classes={{
                                                        //     option: styles.option,
                                                        // }}
                                                        fontFamily="audiowide"
                                                        id="gender"
                                                        name="gender"
                                                        value={inputs.gender}
                                                        isOptionEqualToValue={(option, value) =>
                                                            option.label === value.label
                                                        }
                                                        onChange={(e, value) =>
                                                            handleSelectionChange(value, "gender")
                                                        }
                                                        options={[{ label: "Male" }, { label: "Female" }]}
                                                        renderOption={(props, option) => {
                                                            return (
                                                                <span
                                                                    {...props}
                                                                    style={{
                                                                        backgroundColor: "#fff",
                                                                        fontFamily: "audiowide",
                                                                    }}
                                                                >
                                                                    {option.label}
                                                                </span>
                                                            );
                                                        }}
                                                        // sx={selectStyles()}
                                                        hiddenLabel="true"
                                                        renderInput={(params) => (
                                                            <>
                                                                <TextField
                                                                    {...params}
                                                                    error={submitted && !inputs.gender}
                                                                    onKeyDown={(e) => { e.preventDefault() }}
                                                                    style={{
                                                                        backgroundColor: "#1E417C !important",
                                                                    }}
                                                                    placeholder="Gender*"
                                                                    variant="standard"
                                                                />
                                                                {formErrors.gender ? <p className="text-red text-xs">{formErrors.gender}</p> : ''}
                                                            </>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-elmn'>
                                                <TextField
                                                    autoComplete="off"
                                                    type="text"
                                                    className={
                                                        "custom-input-field" +
                                                        (submitted && !inputs.passport_no
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                    fullWidth
                                                    maxLength={10}
                                                    value={inputs.passport_no}
                                                    name="passport_no"
                                                    onPaste={onPaste}
                                                    onChange={(e) => onkeydownEvent(e)}
                                                    // sx={inputStyles()}
                                                    variant="standard"
                                                    hiddenLabel="true"
                                                    placeholder="Passport No"
                                                />
                                                {formErrors.passport_no ? <p className="text-red text-xs">{formErrors.passport_no}</p> : ''}
                                            </div>

                                            <div className='form-elmn'>
                                                <Autocomplete
                                                    className="mt-4 w-full"
                                                    disablePortal
                                                    // classes={{
                                                    //     option: styles.option,
                                                    // }}
                                                    fontFamily="audiowide"
                                                    id="present_status"
                                                    name="present_status"
                                                    hiddenLabel="true"
                                                    value={inputs.present_status}
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.label === value.label
                                                    }
                                                    onChange={(e, value) =>
                                                        handleSelectionChange(value, "present_status")
                                                    }
                                                    options={[
                                                        { label: "Student" },
                                                        { label: "Graduated" },
                                                        { label: "Waiting for results" },
                                                    ]}
                                                    renderOption={(props, option) => {
                                                        return (
                                                            <span
                                                                {...props}
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    fontFamily: "audiowide",
                                                                }}
                                                            >
                                                                {option.label}
                                                            </span>
                                                        );
                                                    }}
                                                    // sx={selectStyles()}
                                                    renderInput={(params) => (
                                                        <>
                                                            <TextField
                                                                {...params}
                                                                error={submitted && !inputs.present_status}
                                                                style={{ backgroundColor: "#1E417C !important" }}
                                                                placeholder="Present Status "
                                                                autoComplete="off"
                                                                variant="standard"
                                                            />
                                                            {formErrors.present_status ? <p className="text-red text-xs">{formErrors.present_status}</p> : ''}
                                                        </>
                                                    )}
                                                />
                                            </div>

                                            <div className='form-elmn'>
                                                <Autocomplete
                                                    disablePortal
                                                    inputValue={inputs.country_id}
                                                    clearOnBlur={true}
                                                    defaultvalue={inputs.country_id}
                                                    // classes={{
                                                    //     option: styles.option,
                                                    // }}
                                                    hiddenLabel="true"
                                                    isOptionEqualToValue={(option, value) =>
                                                        option.id === value.id
                                                    }
                                                    onChange={(e, value) =>
                                                        handleSelectionChange(value, "country_id")
                                                    }
                                                    name="country_id"
                                                    id="country_id"
                                                    options={(data?.study_destination || []).map((x) => {
                                                        x["label"] = x.name;
                                                        return x;
                                                    })}
                                                    renderOption={(props, option) => {
                                                        return (
                                                            <span
                                                                {...props}
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    fontFamily: "audiowide",
                                                                }}
                                                            >
                                                                {option.label}
                                                            </span>
                                                        );
                                                    }}
                                                    // sx={selectStyles()}
                                                    renderInput={(params) => (
                                                        <>
                                                            <TextField
                                                                {...params}
                                                                error={submitted && !inputs.country_id}
                                                                // classes={{ root: styles.customTextField }}
                                                                style={{ backgroundColor: "#fff !important" }}
                                                                placeholder="Country"
                                                                variant="standard"
                                                            />
                                                            {formErrors.country_id ? <p className="text-red text-xs">{formErrors.country_id}</p> : ''}
                                                        </>
                                                    )}
                                                />
                                            </div>

                                            <p className="text-sm text-slider pt-2">
                                                {errorMessage}
                                            </p>
                                            <p className="text-sm text-green pt-2">{message}</p>
                                        </div>

                                        <div className="col_right">
                                            <p className="title-uploads">
                                                Upload Supporting Documents
                                            </p>

                                            {inputs.images
                                                .filter((x) => x)
                                                .map((list, index) => (
                                                    <div
                                                        className={`file-upload-box`}
                                                    >
                                                        {!list.file_name ? (
                                                            <>
                                                                <div
                                                                    className={`file-upload-box__inner`}
                                                                >
                                                                    <div className="file-upload-box__left">
                                                                        <Image src={uploadIcon} width={20} height={20} alt='Upload' />

                                                                        <div className="upload_content">
                                                                            <p className="text-sm">{list.label}</p>
                                                                            <p className="text-xs text-[#1E417C]">
                                                                                File Format: Pdf/ Doc
                                                                            </p>
                                                                            <p className="text-xs text-[#1E417C]">
                                                                                Maximum Size: 5Mb
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className='file-upload-box__right'>
                                                                        <input
                                                                            type="file"
                                                                            id={"inputFile" + index}
                                                                            accept=".pdf"
                                                                            className="hidden relative"
                                                                            onChange={(e) =>
                                                                                handleUploadChange(e, index)
                                                                            }
                                                                        />
                                                                        <div
                                                                            className="upload-btn flex cursor-pointer justify-center items-center rounded-lg"
                                                                            role="presentation"
                                                                            onClick={() => chooseFile(index)}
                                                                        >
                                                                            <p className="choose-btn">
                                                                                Choose File
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div
                                                                className={`file-upload-box__inner`}
                                                            >
                                                                <div className="file-upload-box__left">
                                                                    <div className="flex flex-col">
                                                                        <p className="upload_content text-ellipsis">
                                                                            {list.file_name}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className='file-upload-box__right'>
                                                                    <div
                                                                        className=""
                                                                        role="presentation"
                                                                        onClick={() => deleteFile(index)}
                                                                    >
                                                                        <p className="delete-btn">Delete</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                            {inputs.images?.length < 2 && (
                                                <div className="add_another_doc">
                                                    <h3 className="text-[#C41230]" onClick={addMoreDoc}>
                                                        Add Document
                                                    </h3>
                                                </div>
                                            )}
                                            <div className='add-notes'>
                                                <TextareaAutosize
                                                    autoComplete="off"
                                                    type="text"
                                                    className={
                                                        "custom-textarea-field" +
                                                        (submitted && !inputs.notes
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                    fullWidth
                                                    value={inputs.notes}
                                                    name="notes"
                                                    onPaste={onPaste}
                                                    onChange={(e) => onkeydownEvent(e)}
                                                    // sx={inputStyles()}
                                                    variant="standard"
                                                    hiddenLabel="true"
                                                    placeholder="Add Additional Notes*"
                                                />
                                                {formErrors.notes ? <p className="text-red text-xs">{formErrors.notes}</p> : ''}
                                            </div>
                                            <div className="additional_control">
                                                {!loading ? (
                                                    <button
                                                        type="submit"
                                                        className="btn "
                                                    >
                                                        Submit
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="btn "
                                                    >
                                                        Loading...
                                                    </button>
                                                )}
                                            </div>
                                        </div>



                                    </form>
                                </div>
                            )}
                        </div>
                        <div className='bottom_controls'>
                            {step === 1 ? (
                                <div className='next move_dir mobile-view' onClick={openNextOrPrev}>Next &#8594;</div>
                            ) : (
                                <div className='previous move_dir mobile-view' onClick={openNextOrPrev}>&#8592; Previous</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOns
