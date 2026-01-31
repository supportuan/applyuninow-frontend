import api from "../../api/index";
import { useState, useContext, useEffect, useMemo } from "react";
import Validator from "validatorjs";
import { AppContext } from "../../context/Appcontext";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalize } from '../../utils/helpers';
import { uuid } from "../../common/utils/helpers";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const EditUser = () => {
  const intialValues = {
    name: "",
    phone: "",
    email: "",
    role: "",
  };
  const { BASE_URL } = useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const query = useQuery();

  const [params, setParams] = useState(intialValues);
  const [formErrors, setFormErrors] = useState(intialValues);
  const [rolelist, setRoleList] = useState([]);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllRoles();
    getSingleUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...params };
    newParams[name] = value;
    setParams(newParams);
    setFormErrors(intialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = new Validator(params, {
      name: "required|max:100",
      phone: "required|max:11",
      email: "required",
      role: "required",
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
    update();
    return true;
  };

  const getAllRoles = () => {
    api
      .get(`${BASE_URL}/admin/users/roles?user_type=${query.get("type")}`)
      .then((res) => {
        // console.log(res.data.data);
        setRoleList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSelect = (e) => {
    setParams({ ...params, role: parseInt(e.target.value) });
    setFormErrors(intialValues);
  };

  const getSingleUser = () => {
    api
      .get(`${BASE_URL}/admin/users/${id}`)
      .then((res) => {
        //console.log(res);
        const userData = res.data.data;
        setParams({
          ...params,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          role: userData.role_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = () => {
    const postdata = {
      email: params.email,
      name: params.name,
      phone: params.phone,
      role_id: params.role,
    };
    console.log(postdata);
    setLoading(true);
    api
      .put(`${BASE_URL}/admin/users/${id}`, postdata)
      .then((res) => {
        setLoading(false);
        toast("User Updated Successfully");
        navigate(`/users/${query.get("type")}`)
      })
      .catch((error) => {
        setLoading(false);
        const { errors } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || error.statusText;
        setMessage(erroMsg);
      });
  };
  return (
    <div className="mx-5 my-6 text-white">
      <p>
        <Link to={`/users/${query.get("type")}`}
          className=" cursor-pointer">
          {capitalize(query.get("type"))} Users
        </Link>{" "}
        {">"} Edit User
      </p>
      <p className="text-2xl font-semibold mb-9">Edit User</p>

      <div className="bg-light p-3 pt-7 rounded-xl">
        <p className="bg-tab py-2 pl-4 rounded-lg ">Basic Info</p>
        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className=" grid grid-flow-row  gap-3 lg:mb-3 lg:grid-cols-2">
              <div className="floating-input mb-2 relative">
                <input
                  type="text"
                  name="name"
                  placeholder="User Name"
                  value={params.name}
                  onChange={handleChange}
                  error={formErrors.name}
                  id="name"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                />
                <label
                  for="name"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  User Name
                </label>
                <p className="text-slider text-sm">{formErrors.name}</p>
              </div>

              <div className="floating-input mb-2 relative">
                <input
                  type="text"
                  name="phone"
                  placeholder="User Phone No"
                  value={params.phone}
                  onChange={handleChange}
                  error={formErrors.phone}
                  id="phone"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                />
                <label
                  for="phone"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  User Phone No
                </label>
                <p className="text-slider text-sm">{formErrors.phone}</p>
              </div>

              <div className="floating-input mb-2 relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={params.email}
                  onChange={handleChange}
                  readOnly
                  error={formErrors.email}
                  id="email"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                />
                <label
                  for="email"
                  class="absolute top-0 left-0 px-3 py-4 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Email address
                </label>
                <p className="text-slider text-sm">{formErrors.email}</p>
              </div>

              <div className="floating-input mb-2 relative">
                <select
                  id="role"
                  class="border focus:outline-none rounded-md focus:border-gray-500 focus:shadow-sm w-full p-3 h-16"
                  type="text"
                  name="role"
                  placeholder="User Role hello"
                  value={params.role}
                  onChange={handleChangeSelect}
                  error={formErrors.role}
                >
                  <option value="" disabled className="text-light">
                    Select Role
                  </option>
                  {rolelist.map((e) => {
                    return (
                      <option key={uuid()} value={e.id}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                <label
                  for="role"
                  class="absolute top-0 left-0 px-3 pt-1 text-xs h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Role
                </label>
                <p className="text-slider text-sm">{formErrors.role}</p>
              </div>

              <p className="text-slider">{message}</p>

              <div className="justify-self-end w-[160px] md:w-[200px] relative bottom-5 lg:w-3/4 lg:bottom-0">
                {loading ? (
                  <button
                    disabled
                    className="text-light font-semibold submit w-full py-3 rounded-lg"
                  >
                    Loading ...
                  </button>
                ) : (
                  <button className="text-light font-semibold submit w-full py-3 rounded-lg">
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
