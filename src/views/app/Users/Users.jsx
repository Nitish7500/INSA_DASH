import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faShield } from "@fortawesome/free-solid-svg-icons";

function Users() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  // console.log(state);

  const [addUser, setaddUser] = useState(false);
  const [editUser, seteditUser] = useState(false);
  const [userEditData, setuserEditData] = useState({});
  const [statusArray, setstatusArray] = useState([]);
  const [legalExecutiveArr, setlegalExecutiveArr] = useState([]);
  const [legalSubExecutiveArr, setlegalSubExecutiveArr] = useState([]);
  const [userBucket, setuserBucket] = useState([]);
  const [legalExecutiveTeam, setlegalExecutiveTeam] = useState([]);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    profile_information: "",
    group: "",
    status: "",
    expert: "",
    expert_policy_type: "",
    expertType: "",
    expertPercentage: "",
    bankName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    panNumber: "",
    legalExpert: false,
    legalExecutive: false,
    legalSubExecutive: "false",
    userOperations: "",
    lead: false,
    agent_case: false,
    policy_cases: false,
    filter_cases: false,
    partner_cases: false,
    third_party: false,
    complaintIgms: false,
    agentIgms: false,
    partnerIgms: false,
    user_bucket: [],
    complain_bucket: [],
    password: "",
    legalSubExecutiveLead: "",
    bank: {
      accountNumber: "",
      bankName: "",
      branch: "",
      ifsc: "",
    },
  });

  const [showPasswordModal, setshowPasswordModal] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  const [newPassword, setnewPassword] = useState("");

  useEffect(() => {
    let arr = state.statusBucket?.statusBuckets?.map((res) => {
      return { value: res[0], label: res[0] };
    });
    let leagalExecutiveArr = state.legalExecutive?.map((res) => {
      return { value: res.user_id, label: res.name };
    });
    let legalSubExecutiveArr = state.legalSubExecutive?.map((res) => {
      return { value: res.user_id, label: res.name };
    });
    setlegalExecutiveArr(leagalExecutiveArr);
    setstatusArray(arr);
    setlegalSubExecutiveArr(legalSubExecutiveArr);
  }, [
    state.statusBucket,
    editUser,
    formData.legalExecutive,
    formData.legalSubExecutive,
  ]);

  useEffect(() => {
    // if (editUser) {
    setformData({
      name: editUser ? userEditData.name : "",
      email: editUser ? userEditData.email : "",
      mobile: editUser ? userEditData.mobile : "",
      gender: editUser ? userEditData.gender : "",
      profile_information: editUser ? userEditData.profile_information : "",
      group: editUser ? userEditData.group : "",
      status: editUser ? userEditData.status : "",
      expert: editUser ? userEditData.expert : "",
      expert_policy_type: editUser ? userEditData.expert_policy_type : "",
      expertType: editUser ? userEditData.expertType : "",
      expertPercentage: editUser ? userEditData.expertPercentage : "",
      bankName: editUser ? userEditData?.bank?.bankName : "",
      accountNumber: editUser ? userEditData?.bank?.accountNumber : "",
      branch: editUser ? userEditData?.bank?.branch : "",
      ifsc: editUser ? userEditData?.bank?.ifsc : "",
      panNumber: editUser ? userEditData.panNumber : "",
      legalExpert: editUser
        ? userEditData.legalExpert === "true" ||
          userEditData.legalExpert === true
          ? true
          : false
        : false,
      legalExecutive: editUser
        ? userEditData.legalExecutive === "true" ||
          userEditData.legalExecutive === true ||
          userEditData.legalExecutive === "True"
          ? "True"
          : "False"
        : "False",
      legalSubExecutive: editUser
        ? userEditData.legalSubExecutive === "true" ||
          userEditData.legalSubExecutive === true ||
          userEditData.legalSubExecutive === "True"
          ? "True"
          : "False"
        : "False",
      userOperations: editUser ? userEditData.userOperations : "",
      lead: editUser
        ? userEditData.lead === "true" || userEditData.lead === true
          ? true
          : false
        : false,
      agent_case: editUser
        ? userEditData.agent_cases === "true" ||
          userEditData.agent_cases === true
          ? true
          : false
        : false,
      policy_cases: editUser
        ? userEditData.policy_cases === "true" ||
          userEditData.policy_cases === true
          ? true
          : false
        : false,
      filter_cases: editUser
        ? userEditData.filter_cases === "true" ||
          userEditData.filter_cases === true
          ? true
          : false
        : false,
      partner_cases: editUser
        ? userEditData.partner_cases === "true" ||
          userEditData.partner_cases === true
          ? true
          : false
        : false,
      third_party: editUser
        ? userEditData.third_party === "true" ||
          userEditData.third_party === true
          ? true
          : false
        : false,
      complaintIgms: editUser
        ? userEditData.complaintIgms === "true" ||
          userEditData.complaintIgms === true
          ? true
          : false
        : false,
      agentIgms: editUser
        ? userEditData.agentIgms === "true" || userEditData.agentIgms === true
          ? true
          : false
        : false,
      partnerIgms: editUser
        ? userEditData.partnerIgms === "true" ||
          userEditData.partnerIgms === true
          ? true
          : false
        : false,
      user_bucket: editUser ? userEditData.user_bucket : [],
      complain_bucket: editUser ? userEditData.complain_bucket : [],
      password: editUser ? userEditData.password : "",
      legalSubExecutiveLead: editUser ? userEditData.legalSubExecutiveLead : "",
    });
    let legalExecutiveTeamArr = editUser
      ? userEditData?.legalExecutiveTeam?.map((res) => {
          return { label: res.name, value: res.user_id };
        })
      : [];
    setlegalExecutiveTeam(legalExecutiveTeamArr);
    let userBucketObj = userEditData.user_bucket?.map((x) => {
      return { label: x, value: x };
    });
    setuserBucket(editUser ? userBucketObj : []);
    // }
  }, [editUser, userEditData]);

  useEffect(() => {
    dispatch({ type: "USERS_GET_LIST", state: { page: 1 } });
    dispatch({ type: "USER_GET_STATUS_BUCKET" });
    dispatch({ type: "USER_GET_ASSIGN_USER" });
    dispatch({ type: "GET_ASSIGN_LEGAL_EXECUTIVE" });
    dispatch({ type: "USER_GET_LEGAL_SUBEXECUTIVE" });
  }, []);

  const {
    name,
    email,
    mobile,
    gender,
    profile_information,
    group,
    status,
    expert,
    expert_policy_type,
    expertType,
    expertPercentage,
    panNumber,
    legalExpert,
    legalExecutive,
    legalSubExecutive,
    userOperations,
    lead,
    agent_case,
    policy_cases,
    filter_cases,
    partner_cases,
    third_party,
    complaintIgms,
    agentIgms,
    partnerIgms,
    user_bucket,
    complain_bucket,
    password,
    legalSubExecutiveLead,
    bankName,
    accountNumber,
    branch,
    ifsc,
  } = formData;
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setformData({ ...formData, [e.target.name]: !e.target.checked });
    } else {
      setformData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (editUser) {
      dispatch({
        type: "USER_UPDATE_USER",
        state: {
          ...userEditData,
          ...formData,
          expertPercentage: +expertPercentage,
          legalExecutiveTeam: legalExecutiveTeam?.map((x) => x.value),
          legalSubExecutive: legalExecutive ? legalSubExecutive : "False",
          legalSubExecutiveLead:
            legalSubExecutive == "True" ? legalSubExecutiveLead : "",
          legalExecutiveTeam:
            legalExecutive == "True" ? legalExecutiveTeam : [],
          user_bucket: userBucket?.map((res) => res.value),
          complain_bucket: userBucket?.map((res) => res.value),
        },
      });
      setaddUser(false);
    } else {
      dispatch({
        type: "USER_ADD_USER",
        state: {
          ...formData,
          expertPercentage: +expertPercentage,
          legalExecutiveTeam: legalExecutiveTeam?.map((x) => x.value),
          legalSubExecutive: legalExecutive ? legalSubExecutive : "False",
          legalSubExecutiveLead:
            legalSubExecutive == "True" ? legalSubExecutiveLead : "",
          user_bucket: userBucket?.map((res) => res.value),
          complain_bucket: userBucket?.map((res) => res.value),
        },
      });
      setaddUser(false);
    }
  };

  return (
    <div>
      <div className="bg-inherit pt-5">
        <div className="w-95 d-flex justify-content-center">
          <div
            className=" text-white b-2 h-20 pl-4 pt-2 d-flex justify-content-between"
            style={{
              background: "linear-gradient(60deg, #2B009F, #100052)",
              borderRadius: "5px",
              width: "97%",
              marginTop: "-25px",
              marginBottom: "-25px",
              paddingBottom: "-17px",
            }}
          >
            <div className="">
              <span className="h5">Users List</span>
              <span className="h6 d-block text-muted">
                List of available Users
              </span>
            </div>
            <div>
              <button
                id="UseraddBtn"
                className="btn btn-success mr-3 py-1 mt-2"
                onClick={() => {
                  setaddUser(true);
                  seteditUser(false);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div
          className="bg-white shadow p-3 mb-5 bg-white"
          style={{ borderRadius: "5px" }}
        >
          <div className="table-responsive mt-5">
            <table className="table">
              <thead>
                <tr key={"tableHead"}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User Id</th>
                  <th>User Type</th>
                  <th>Expert</th>
                  <th>Legal Expert</th>
                  <th>Legal Executive</th>
                  <th>Third Party</th>
                  <th>Company Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  {/* <th>View</th> */}
                  <th>Action</th>
                  <th>Password Change</th>
                </tr>
              </thead>
              <tbody>
                {state.userData?.pageOfItems?.map((res, i) => {
                  return (
                    <tr key={i}>
                      <td>{res.name}</td>
                      <td>{res.email}</td>
                      <td>{res.user_id}</td>
                      <td>{res.group}</td>
                      <td>{res.expert}</td>
                      <td>{res.legalExpert}</td>
                      <td>{res.legalExecutive}</td>
                      <td>{res.third_party}</td>
                      <td>{res.company_name}</td>
                      <td>{res.mobile}</td>
                      <td>{}</td>
                      <td>{res.status ? "Active" : "Non-Active"}</td>
                      {/* <td>{"view"}</td> */}
                      <td
                        id={`userAddEdit${i}`}
                        onClick={() => {
                          setuserEditData(res);
                          seteditUser(true);
                          setaddUser(true);
                        }}
                      >
                        <FontAwesomeIcon
                          id={`userAddEditIcon${i}`}
                          icon={faPencil}
                          size="lg"
                          color="#9c27b0"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td
                        onClick={() => {
                          setshowPasswordModal(true);
                          setcurrentUser(res);
                        }}
                        id={`userAddEditPass${i}`}
                      >
                        <FontAwesomeIcon
                          id={`userAddEditPassIcon${i}`}
                          icon={faShield}
                          size="lg"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* --------------------------------> Add OR Edit User Modal */}
      <Modal
        size="xl"
        isOpen={addUser}
        toggle={() => {
          setaddUser(!addUser);
        }}
      >
        <ModalHeader>{editUser ? "User Detail" : "New User"}</ModalHeader>
        <ModalBody>
          <div className="container mb-3">
            <div className="form-group d-flex flex-wrap">
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className="form-control border-0 font-weight-bold"
                  htmlFor="userFormName"
                >
                  Name
                </label>
                <input
                  disabled={editUser}
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={name}
                  name="name"
                  placeholder="Enter Name"
                  id="userFormAddEditName"
                />
              </div>
              <hr />
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className="form-control border-0 font-weight-bold"
                  htmlFor="userFormEmail"
                >
                  Email
                </label>
                <input
                  disabled={editUser}
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={email}
                  name="email"
                  placeholder="Enter Email"
                  id="userFormAddEditEmail"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormNumber"
                >
                  Mobile Number
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={mobile}
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  id="userFormAddEditNumber"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormGender"
                >
                  Gender
                </label>
                <select
                  onChange={handleChange}
                  id="userFormAddEditGender"
                  className="from-controle border w-100 py-2 border-bold"
                  value={gender}
                  name="gender"
                >
                  <option key={"1"} value={""}>
                    {" "}
                    Select Gender
                  </option>
                  <option key={"male"} value={"Male"}>
                    Male
                  </option>
                  <option key={"female"} value={"Female"}>
                    Female
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormProfileInfo"
                >
                  Profile Information
                </label>
                <textarea
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={profile_information}
                  name="profile_information"
                  placeholder="Profile Information"
                  rows={5}
                  id="userFormAddEditProfileInfo"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormUserType"
                >
                  User Type
                </label>
                <select
                  onChange={handleChange}
                  id="userFormAddEditUserType"
                  className="from-controle border w-100 py-2 border-bold"
                  value={group}
                  name="group"
                >
                  <option key={"select"} value={""}>
                    {" "}
                    Select User Type
                  </option>
                  <option key={"user"} value={"User"}>
                    User
                  </option>
                  <option key={"admin"} value={"Admin"}>
                    Admin
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormUserStatus"
                >
                  User Status
                </label>
                <select
                  onChange={handleChange}
                  id="userFormAddEditUserStatus"
                  className="from-controle border w-100 py-2 border-bold"
                  value={status}
                  name="status"
                >
                  <option key={"user"} value={""}>
                    {" "}
                    Select User Status
                  </option>
                  <option key={"true"} value={"true"}>
                    True
                  </option>
                  <option key={"false"} value={"false"}>
                    False
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormUserInAnyPolicy"
                >
                  Experts In Any Policy Type
                </label>
                <select
                  onChange={handleChange}
                  id="userFormAddEditUserInAnyPolicy"
                  className="from-controle border w-100 py-2 border-bold"
                  value={expert}
                  name="expert"
                >
                  <option key={"expert"} value={""}>
                    {" "}
                    Select Exprt Type
                  </option>
                  <option key={"true"} value={"true"}>
                    True
                  </option>
                  <option key={"false"} value={"false"}>
                    False
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormUserInAnyPolicy"
                >
                  Policy Type
                </label>
                <select
                  onChange={handleChange}
                  id="userFormUserInAnyPolicy"
                  className="from-controle border w-100 py-2 border-bold"
                  value={expert_policy_type}
                  name="expert_policy_type"
                >
                  <option key={"insurance"} value={""}>
                    {" "}
                    Select Insurance Type
                  </option>
                  <option key={"GI"} value="General Insurance">
                    General Insurance
                  </option>
                  <option key={"HI"} value="Health Insurance">
                    Health Insurance
                  </option>
                  <option key={"LI"} value="Life Insurance">
                    Life Insurance
                  </option>
                  <option key={"NA"} value="NA">
                    NA
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormUserExpertType"
                >
                  Expert Type
                </label>
                <select
                  onChange={handleChange}
                  id="userFormUserExpertType"
                  className="from-controle border w-100 py-2 border-bold"
                  value={expertType}
                  name="expertType"
                >
                  <option key={"Option"} value="">
                    Select Option
                  </option>
                  <option key={"CB"} value="Contract Based">
                    Contract Based
                  </option>
                  <option key={"Per"} value="Permanent">
                    Permanent
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormExpertPer"
                >
                  Expert Percentage
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={expertPercentage}
                  name="expertPercentage"
                  type="number"
                  placeholder="Enter Percentage"
                  id="userAddEditFormExpertPer"
                />
              </div>

              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormBankName"
                >
                  Bank Name
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={bankName}
                  name="bankName"
                  placeholder="Enter Bank Name"
                  id="userFormAddEditBankName"
                />
              </div>
              <div className="form-control border-0">
                <label
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormAccountNo"
                >
                  Account Number
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={accountNumber}
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  id="userFormAddEditAccountNo"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormBranch"
                >
                  Branch
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={branch}
                  name="branch"
                  placeholder="Enter Branch Name"
                  id="userFormAdddEditBranch"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className="form-control border-0"
                  htmlFor="userFormIFSC"
                >
                  IFSC Code
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={ifsc}
                  name={"ifsc"}
                  placeholder="Enter IFSC"
                  id="userFormAddEditIFSC"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormPanNo"
                >
                  PAN Number
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={panNumber}
                  name="panNumber"
                  placeholder="Enter PAN Number"
                  id="userFormAddEditPanNo"
                />
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormLegalExpert"
                >
                  Legal Expert
                </label>
                <select
                  onChange={handleChange}
                  id="userFormLegalExpert"
                  className="from-controle border w-100 py-2 border-bold"
                  value={legalExpert}
                  name="legalExpert"
                >
                  <option key={"Legal"} value={""}>
                    {" "}
                    Select Legal Expert
                  </option>
                  <option key={"true"} value={"True"}>
                    True
                  </option>
                  <option key={"false"} value={"False"}>
                    False
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className=" font-weight-bold form-control border-0"
                  htmlFor="userFormLegalExecutive"
                >
                  Legal Executive
                </label>
                <select
                  onChange={handleChange}
                  id="userFormLegalExecutive"
                  className="from-controle border w-100 py-2 border-bold"
                  value={legalExecutive?.toString()}
                  name="legalExecutive"
                >
                  <option key={"legalExe"} value={""}>
                    {" "}
                    Select Legal Executive
                  </option>
                  <option key={"true"} value={"True"}>
                    True
                  </option>
                  <option key={"false"} value={"False"}>
                    False
                  </option>
                </select>
              </div>
              {legalExecutive == "True" || legalExecutive == true ? (
                <div className="form-control border-0">
                  <label
                    style={{ fontSize: "1rem" }}
                    className="font-weight-bold"
                  >
                    Select Legal Executive
                  </label>
                  <Select
                    id="userAddEditLegalExecutive"
                    value={legalExecutiveTeam}
                    isMulti
                    name="legalExecutiveTeam"
                    options={legalExecutiveArr}
                    className="basic-multi-select border-bold"
                    classNamePrefix="select"
                    onChange={(value) => {
                      setlegalExecutiveTeam(value);
                    }}
                  ></Select>
                </div>
              ) : null}
              {legalExecutive == "False" || legalExecutive === false ? (
                <div className="form-control border-0">
                  <label
                    style={{ fontSize: "1rem" }}
                    className="form-control border-0 font-weight-bold"
                    htmlFor="userFormLegalSubExecutive"
                  >
                    Legal Sub-Executive
                  </label>
                  <select
                    onChange={handleChange}
                    id="userFormLegalSubExecutive"
                    className="from-controle border w-100 py-2 border-bold"
                    value={legalSubExecutive?.toString()}
                    name="legalSubExecutive"
                  >
                    <option key={"sib-exe"} value={""}>
                      {" "}
                      Select Legal Sub-Executive
                    </option>
                    <option key={"true"} value={"True"}>
                      True
                    </option>
                    <option key={"fasle"} value={"False"}>
                      False
                    </option>
                  </select>
                </div>
              ) : null}

              {(legalExecutive === "false" ||
                legalExecutive === "False" ||
                legalExecutive === false) &&
              (legalSubExecutive === "True" || legalSubExecutive === true) ? (
                <div className="form-control border-0">
                  <label
                    style={{ fontSize: "1rem" }}
                    className="font-weight-bold"
                  >
                    Select Legal Sub-Executive
                  </label>
                  <select
                    className="form-control border border-bold"
                    id="userAddEditLegalExecutive"
                    name="legalSubExecutiveLead"
                    onChange={handleChange}
                    value={legalSubExecutiveLead}
                  >
                    {legalSubExecutiveArr?.map((res) => {
                      return (
                        <option key={res.value} value={res.value}>
                          {res.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}

              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className="form-control border-0 font-weight-bold"
                  htmlFor="userFormUserTypeSelect"
                >
                  User Type
                </label>
                <select
                  onChange={handleChange}
                  id="userFormUserTypeSelect"
                  className="from-controle border w-100 py-2 border-bold"
                  value={userOperations}
                  name="userOperations"
                >
                  <option key={"userType"} value={""}>
                    {" "}
                    Select User Type
                  </option>
                  <option key={"calling"} value="Calling">
                    Calling
                  </option>
                  <option key={"mailing"} value="Mailing">
                    Mailing
                  </option>
                  <option key={"omb"} value="Ombudsman">
                    Ombudsman
                  </option>
                  <option key={"legal"} value="Legal">
                    Legal
                  </option>
                  <option key={"TP"} value="ThirdParty">
                    Third Party
                  </option>
                  <option key={"II"} value="IGMS Intern">
                    IGMS Intern
                  </option>
                </select>
              </div>
              <div className="form-control border-0">
                <label
                  style={{ fontSize: "1rem" }}
                  className="form-control border-0 font-weight-bold"
                  htmlFor="userFormUserTypeSelect"
                >
                  User Handle Case Type
                </label>
                <div className="d-flex">
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Lead
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={lead}
                      name="lead"
                      id="userAddEditLead"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Agent Type
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={agent_case}
                      name="agent_case"
                      id="userAddEditAgentType"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Policy Cases
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={policy_cases}
                      name="policy_cases"
                      id="userAddEditPolicyType"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Filter Cases
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={filter_cases}
                      name="filter_cases"
                      id="userEditAddFilterCase"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Partner Cases
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={partner_cases}
                      name="partner_cases"
                      id="userAddEdit"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Third Party
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={third_party}
                      name="third_party"
                      id="userAddEditThirdParty"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control border-0">
                <label
                  className="form-control border-0 font-weight-bold"
                  htmlFor="userFormUserTypeSelect"
                >
                  User Handle IGMS Case Type
                </label>
                <div className="d-flex">
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Complaint
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={complaintIgms}
                      name="complaintIgms"
                      id="userAddEditIGMSComplaint"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Agent Cases
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={agentIgms}
                      name="agentIgms"
                      id="userAddEditIGMSAgent"
                    />
                  </div>
                  <div className="form-control border-0">
                    <label
                      className="font-weight-bold"
                      htmlFor="userFormLeadSelect"
                    >
                      {" "}
                      Partner Cases{" "}
                    </label>
                    <input
                      onChange={() => {
                        null;
                      }}
                      onClick={handleChange}
                      type={"checkbox"}
                      className="form-control border"
                      checked={partnerIgms}
                      name="partnerIgms"
                      id="userAddEditIGMSPartner"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control border-0">
                <label
                  className="form-control border-0 font-weight-bold "
                  style={{ fontSize: "1rem" }}
                >
                  User Handle Bucket Type
                </label>
                <div className="form-control border">
                  <Select
                    id="userAddEditUserBucket"
                    value={userBucket}
                    // defaultInputValue={userBucket}
                    isMulti
                    name="statusBucket"
                    options={statusArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(value) => {
                      setuserBucket(value);
                    }}
                  ></Select>
                </div>
              </div>
              <div className="form-control border-0">
                <label
                  className="form-control border-0 font-weight-bold display-5"
                  style={{ fontSize: "1rem" }}
                  htmlFor="userFormPassword"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  className="from-control border w-100 py-2 border-bold"
                  value={password}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  id="userAddEditPassword"
                />
              </div>

              <div className="form-control border-0 d-flex justify-content-end">
                <button
                  className="btn btn-danger mr-2 rounded "
                  id="userAddEditClose"
                  onClick={() => {
                    seteditUser(false);
                    setaddUser(false);
                  }}
                >
                  CLOSE
                </button>
                <button
                  className="btn btn-primary rounded"
                  id="userAddEditAdd"
                  onClick={handleSubmit}
                >
                  {editUser ? "Update" : "ADD"}
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* -------------------------------------> Change Password ! */}

      <Modal
        isOpen={showPasswordModal}
        toggle={() => {
          setshowPasswordModal(!showPasswordModal);
        }}
      >
        <ModalHeader>Update Password</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-group">
              <div className="form-control border-0">
                <input
                  id="cahngePassInp"
                  className="form-control border"
                  disabled
                  value={currentUser?.user_id}
                />
              </div>
              <div className="form-control border-0">
                <input
                  id="changePassName"
                  className="form-control border"
                  disabled
                  value={currentUser.name}
                />
              </div>
              <div className="form-control border-0">
                <input
                  id="changePassPass"
                  className="form-control border"
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  id="changePassClose"
                  className="btn btn-danger rounded mr-2"
                  onClick={() => {
                    setshowPasswordModal(false);
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary rounded"
                  id="changePassUpdate"
                  onClick={() => {
                    dispatch({
                      type: "USER_UPDATE_PASSWORD",
                      state: {
                        password: newPassword,
                        user_id: currentUser.user_id,
                      },
                    });
                    setshowPasswordModal(false);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Users;
