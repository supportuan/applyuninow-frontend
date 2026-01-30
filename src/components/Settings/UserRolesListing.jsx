import { useState, useEffect, useContext, useMemo } from "react";
import arrowdown from "../../assets/allstudents/arrow-down.svg";
import edit from "../../assets/user/edit.png";
import api from "../../api/index";
import { AppContext } from "../../context/Appcontext";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "../Shared/Pagination/Pagination.jsx";
import Delete from "../../assets/application/Delete.svg";
import PopUp from "./PopUp";
import Validator from "validatorjs";
import DeleteModal from "../../common/DeleteModal";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";

let initialValues = {
  name: "",
  role: "Manager",
  id: "",
  is_manager: false,
  list: [],
};

const UserRolesListing = () => {
  const { BASE_URL } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [roleList, setRolesList] = useState("");

  const [modulesList, setModulesList] = useState();
  const [params, setParams] = useState(initialValues);

  const [meta, metaData] = useState({
    current_page: "",
    total: "0",
    per_page: "0",
  });

  const addPermission = (array, list) => {
    array.push({
      module_id: list.id,
      is_read: list.is_read,
      is_write: list.is_write,
      is_update: list.is_update,
      is_delete: list.is_delete,
    });
    return array;
  };

  const submit = () => {
    const rules = {
      name: ["required", "regex:^[A-Za-zs]$", "max:50"],
    };

    const validation = new Validator(params, rules);
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

    let is_checked = params.list.some((x) => x.is_checked);
    if (!is_checked) {
      toast.error("Please Select Atleast One Module");
      return;
    }

    let permissions = [];
    for (let list of params.list) {
      if (list.is_checked) {
        permissions = addPermission(permissions, list);
        let children = list.children.filter((x) => x.is_checked);
        if (children.length) {
          for (let child of children) {
            permissions = addPermission(permissions, child);
          }
        }
      }
    }
    let payload = {
      name: params.name,
      is_manager: params.is_manager,
      permissions: permissions,
    };

    if (params.id) {
      updateRole(payload);
    } else {
      createRole(payload);
    }
    return;
  };

  const createRole = (payload) => {
    api
      .post(`${BASE_URL}/admin/roles`, payload)
      .then((res) => {
        fecthRoles();
        handleClose();
        setParams(initialValues);
      })
      .catch((error) => {
        const { errors, message } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
      });
  };

  const updateRole = (payload) => {
    api
      .put(`${BASE_URL}/admin/roles/${params.id}`, payload)
      .then((res) => {
        fecthRoles();
        setParams(initialValues);
        handleClose();
      })
      .catch((error) => {
        const { errors, message } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
      });
  };
  const handleDeleteOk = () => {
    console.log(selectedId, "selectedId");
    setIsLoading(true);
    api
      .delete(`${BASE_URL}/admin/roles/` + selectedId, {})
      .then((response) => {
        toast.success("Role Deleted Successfully!");
        setOpenDelete(false);
        setIsLoading(false);
        setSelectedId("");
        fecthRoles();
      })
      .catch((error) => {
        setIsLoading(false);
        const { errors, message } = error.response.data;
        const erroMsg = errors[Object.keys(errors)[0]] || message;
        toast.error(erroMsg);
      });
  };

  const handleNestedCheckBoxSel = (list, index, checked, child) => {
    let subIndex = list[index].children.findIndex((x) => x.id === child.id);
    if (subIndex != -1) {
      list[index].children[subIndex].is_checked = checked;
      list[index].children[subIndex]["is_write"] = checked;
      list[index].children[subIndex]["is_update"] = checked;
      list[index].children[subIndex]["is_read"] = checked;
      list[index].children[subIndex]["is_delete"] = checked;
    }
    let is_child_checked = list[index].children.some((x) => x.is_checked);
    list[index].is_checked = is_child_checked;
  };

  const handleChildChange = (e, item, child) => {
    const { name, checked } = e.target;
    let list = [...params.list];
    let index = list.findIndex((x) => x.id == item.id);
    if (index != -1) {
      if (
        checked &&
        ["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        list[index].is_checked = checked;
        let subIndex = list[index].children.findIndex((x) => x.id === child.id);
        if (subIndex != -1) {
          list[index].children[subIndex].is_checked = checked;
          list[index].children[subIndex][name] = checked;
        }
      } else if (checked) {
        handleNestedCheckBoxSel(list, index, checked, child);
      }

      if (
        !checked &&
        ["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        let subIndex = list[index].children.findIndex((x) => x.id === child.id);
        if (subIndex != -1) {
          list[index].children[subIndex][name] = checked;
          let item = list[index].children[subIndex];
          if (
            !item.is_write &&
            !item.is_update &&
            !item.is_read &&
            !item.is_delete
          ) {
            list[index].children[subIndex].is_checked = checked;
          }
          let is_child_checked = list[index].children.some((x) => x.is_checked);
          list[index].is_checked = is_child_checked;
        }
      }

      if (
        !checked &&
        !["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        handleNestedCheckBoxSel(list, index, checked, child);
      }
    }
    setParams({ ...params, list: list });
  };

  const handleCheckBoxSel = (list, index, checked) => {
    list[index].is_checked = checked;
    list[index]["is_write"] = checked;
    list[index]["is_update"] = checked;
    list[index]["is_read"] = checked;
    list[index]["is_delete"] = checked;
    list[index].children = list[index].children.map((x) => {
      x["is_checked"] = checked;
      x["is_write"] = checked;
      x["is_update"] = checked;
      x["is_read"] = checked;
      x["is_delete"] = checked;
      return x;
    });
  };

  const handleRootChange = (e, item) => {
    const { name, checked } = e.target;
    let list = [...params.list];
    let index = list.findIndex((x) => x.id == item.id);
    if (index != -1) {
      if (
        checked &&
        ["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        list[index].is_checked = checked;
        list[index][name] = checked;
      } else if (checked) {
        handleCheckBoxSel(list, index, checked);
      }

      if (
        !checked &&
        ["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        list[index][name] = checked;
        let item = list[index];
        if (
          !item.is_write &&
          !item.is_update &&
          !item.is_read &&
          !item.is_delete
        ) {
          list[index].is_checked = checked;
        }
      }

      if (
        !checked &&
        !["is_write", "is_update", "is_read", "is_delete"].includes(name)
      ) {
        handleCheckBoxSel(list, index, checked);
      }
    }
    setParams({ ...params, list: list });
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setParams(initialValues);
  };

  const addNewRole = () => {
    let options = [...modulesList];
    options = options
      .filter((x) => x.parent_id == null)
      .map((x) => {
        x["is_checked"] = false;
        x["children"] = modulesList
          .filter((y) => y.parent_id === x.id)
          .map((z) => {
            z["is_read"] = false;
            z["is_write"] = false;
            z["is_delete"] = false;
            z["is_update"] = false;
            z["is_checked"] = false;
            return z;
          });
        return x;
      });

    setParams({ ...params, list: options, is_manager: true });
    setOpen(true);
  };

  const fecthRoles = async () => {
    setLoading(true);
    api
      .get(`${BASE_URL}/admin/roles?page=${currentPage}`)
      .then((response) => {
        let data = response.data.data.data;
        let modules = response.data.modules;
        metaData(response.data.data.meta);
        setRolesList(data);
        setModulesList(modules);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error:", error);
        setLoading(false);
      });
  };
  useMemo(() => {
    fecthRoles();
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };
  const handleFormChanges = (e) => {
    setParams({
      ...params,
      is_manager: e.target.value === "Manager" ? true : false,
    });
  };

  const handleDelete = (e, edit) => {
    setSelectedId(edit.id);
    setOpenDelete(true);
  };
  const onRowEdit = (row) => {
    let options = [...modulesList];
    options = options
      .filter((x) => x.parent_id == null)
      .map((x) => {
        let root_ele = row.permissions.find((y) => y.module_id === x.id);
        x["is_checked"] =
          root_ele?.is_read ||
          root_ele?.is_write ||
          root_ele?.is_delete ||
          root_ele?.is_update ||
          false;
        x["is_read"] = root_ele?.is_read || false;
        x["is_write"] = root_ele?.is_write || false;
        x["is_delete"] = root_ele?.is_delete || false;
        x["is_update"] = root_ele?.is_update || false;

        x["children"] = modulesList
          .filter((y) => y.parent_id === x.id)
          .map((z) => {
            let child_ele = row.permissions.find((y) => y.module_id === z.id);
            z["is_checked"] =
              child_ele?.is_read ||
              child_ele?.is_write ||
              child_ele?.is_delete ||
              child_ele?.is_update ||
              false;
            z["is_read"] = child_ele?.is_read || false;
            z["is_write"] = child_ele?.is_write || false;
            z["is_delete"] = child_ele?.is_delete || false;
            z["is_update"] = child_ele?.is_update || false;
            return z;
          });
        return x;
      });

    setParams({
      ...params,
      list: options,
      name: row.name,
      role: row.is_manager ? "Manager" : "Executive",
      id: row.id,
    });
    setOpen(true);
  };

  return (
    <>
    <div className="p-2 lg:p-4 mb-10">
        <div className="flex items-center  justify-between mb-3">
          <h1 className=" audio text-white relative text-[16px] md:text-2xl">
            User roles
          </h1>
          <button
            className="submit py-2 px-5 rounded-lg font-semibold relative  text-[#000000]"
            onClick={(e) => {
              addNewRole();
            }}
          >
            <span className="hidden md:block">
            + Create User Role
            </span>
            <span className="block md:hidden">
            + New Role
            </span>
          </button>
        </div>
        <hr className=" border-t-line border-t" />

        {/* Filtering Desktop view */}

        {/* Search Bar Tablet And Mobile View */}


        <div className="px-2 md:px-6 mt-4 overflow-x-auto lg:block rounded-xl bg-light">
          <table className="w-full lead ">
            <thead>
              <th>
                <p className="text-xs md:text-base">S.No</p>
              </th>
              <th>
                <p className="text-xs md:text-base">User Role</p>
              </th>
              <th>
                <p className="text-xs md:text-base">No of Modules</p>
              </th>
              <th>
                <p className="text-xs md:text-base">Action</p>
              </th>
            </thead>
            <tbody>
              {roleList.length ? (
                roleList.map((item, index) => {
                  return (
                    <tr className="my-4 bg-tab university-list lg:mt-8">
                      <td>
                        <p className="text-xs md:text-base">{index + 1}</p>
                      </td>
                      <td>
                        <p className="text-xs md:text-base">{item?.name}</p>
                      </td>
                      <td>
                        <p className="text-xs md:text-base">
                          {item.permissions.length}
                        </p>
                      </td>

                      <td>
                        <div className=" bg-tab py-5 rounded-r-xl flex space-x-6 items-center justify-center">
                          <div onClick={() => onRowEdit(item)}>
                            <Tooltip title="edit">
                              <img
                                className="mx-auto cursor-pointer "
                                src={edit}
                                alt="action"
                              />
                            </Tooltip>
                          </div>
                          <Tooltip title="delete">
                            <img
                              src={Delete}
                              className="cursor-pointer"
                              onClick={(e) => handleDelete(e, item)}
                              alt=""
                            />
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="pt-4 text-center text-white">
                  {loading ? (
                    <td colSpan="12">Loading...</td>
                  ) : (
                    <td colSpan="12">Not found</td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={meta.total}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <PopUp
          open={open}
          handleClose={handleClose}
          type="create"
          name=""
          params={params}
          setParams={handleFormChanges}
          submit={submit}
          handleRootChange={handleRootChange}
          handleChildChange={handleChildChange}
          handleChange={handleChange}
          formErrors={formErrors}
        />

        {openDelete && (
          <DeleteModal
            open={openDelete}
            handleClose={handleClose}
            type="archeive"
            title=" Are you sure you want to delete the Role?"
            loading={isLoading}
            handleActionButton={handleDeleteOk}
          />
        )}
      </div>
    </>
  );
};
export default UserRolesListing;
